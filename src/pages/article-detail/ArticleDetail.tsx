import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useLocation, Navigate } from "react-router-dom";
import { Article } from "../../interfaces";
import "./index.css";

export const ArticleDetail = () => {
  const location = useLocation();
  const state = location.state as { article: Article };
  if (!state?.article) return <Navigate to="/" />;

  const { title, description, urlToImage, url } = state.article;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Img variant="top" src={urlToImage} className="article-image" />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button onClick={() => window.open(url, "_blank")}>
            Go to original article
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
