import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { ArticleItem } from "./../ArticleItem";
import { Article } from "../../../../interfaces";

interface ArticlesListProps {
  articles: Article[];
  loading?: boolean;
  onPressArticle: (article: Article) => void;
}

export const ArticlesList = ({
  articles,
  loading,
  onPressArticle,
}: ArticlesListProps) => {
  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return articles.length ? (
    <Container>
      <Row>
        {articles.map((article, index) => (
          <ArticleItem
            onClick={onPressArticle}
            key={`${article.title}-${index}`}
            article={article}
          />
        ))}
      </Row>
    </Container>
  ) : (
    <div>no results found</div>
  );
};
