import React, { useContext, useMemo } from "react";
import { Pagination } from "react-bootstrap";
import { HomeContext, HomeContextType } from "../../Home";
import "./index.css";

export const PaginationComponent = () => {
  const { totalResults, fetchMore, setPage, page, queryParams, defaultParams } =
    useContext<HomeContextType>(HomeContext);

  const paginationItems = useMemo(() => {
    const items = [];
    const numItems = totalResults / defaultParams.pageSize;
    for (let i = 1; i <= numItems; i++) {
      if (i > 2) break;
      items.push(
        <Pagination.Item
          onClick={() => {
            fetchMore({ ...queryParams,  page: i });
            setPage(i);
          }}
          key={i}
          active={i === page}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  }, [
    totalResults,
    page,
    setPage,
    fetchMore,
    queryParams,
    defaultParams.pageSize,
  ]);

  return (
    <div className="pagination-container">
      <Pagination>{paginationItems}</Pagination>
    </div>
  );
};
