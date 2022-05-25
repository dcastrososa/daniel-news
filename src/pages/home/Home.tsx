import React, { useState, useMemo, useCallback, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch, UseFetchProps } from "../../hooks";
import { Article } from "../../interfaces";
import { ArticlesList } from "./components/ArticlesList";
import { toQueryString } from "../../utils";
import { PaginationComponent, SearchBar } from "./components";
import { Container } from "react-bootstrap";

interface SearchParams {
  q: string;
  page: number;
  pageSize: number;
}

const defaultParams = {
  q: "javascript",
  page: 1,
  pageSize: 40,
};

export interface HomeContextType {
  totalResults: number;
  fetchMore: (params: SearchParams) => void;
  setPage: (page: number) => void;
  page: number;
  queryParams: SearchParams;
  defaultParams: SearchParams;
  search: string;
  setSearch: (search: string) => void;
  onSearch: (search: string) => void;
}

export const HomeContext = createContext<HomeContextType>(
  {} as HomeContextType
);

export const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const initialParams: UseFetchProps = useMemo(
    () => ({
      params: toQueryString(defaultParams),
      path: `everything`,
    }),
    []
  );

  const { data, reFetch, loading, totalResults } =
    useFetch<Article[]>(initialParams);

  const queryParams = useMemo(
    () => ({
      q: search || defaultParams.q,
      page,
      pageSize: defaultParams.pageSize,
    }),
    [search, page]
  );

  const fetchMore = useCallback(
    (params: SearchParams) => {
      reFetch(toQueryString(params));
    },
    [reFetch]
  );

  const onSearch = useCallback(
    (value: string) => {
      fetchMore({ ...queryParams, q: value, page: 1 });
      setPage(1);
      setSearch(value);
    },
    [fetchMore, queryParams, setPage, setSearch]
  );

  const onPressArticle = useCallback((article: Article) => {
    navigate("article-detail", { state: { article } });
  }, [navigate]);

  return (
    <HomeContext.Provider
      value={{
        totalResults,
        fetchMore,
        setPage,
        queryParams,
        page,
        defaultParams,
        search,
        setSearch,
        onSearch,
      }}
    >
      <Container>
        <SearchBar />
        <ArticlesList
          articles={data || []}
          loading={loading}
          onPressArticle={onPressArticle}
        />
        {!loading && data?.length && <PaginationComponent />}
      </Container>
    </HomeContext.Provider>
  );
};
