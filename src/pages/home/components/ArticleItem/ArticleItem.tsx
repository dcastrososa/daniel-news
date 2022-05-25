import React, { useCallback, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { truncate } from "../../../../utils";
import { Article } from "../../../../interfaces";
import { ArticleImageModal } from "../ArticleImageModal";
import "./index.css";

interface ArticleItemProps {
  article: Article;
  onClick: (article: Article) => void;
}

export const ArticleItem = ({ article, onClick }: ArticleItemProps) => {
  const { urlToImage, title, description } = article;
  const [showModalImage, setShowModalImage] = useState(false);

  const toggleShowModalImage = useCallback(() => {
    setShowModalImage((prev) => !prev);
  }, [setShowModalImage]);

  return (
    <>
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={urlToImage}
          onClick={toggleShowModalImage}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{truncate(description, 40)}</Card.Text>
          <Button variant="primary" onClick={() => onClick(article)}>
            Read more
          </Button>
        </Card.Body>
      </Card>
      <ArticleImageModal
        image={urlToImage}
        show={showModalImage}
        handleClose={toggleShowModalImage}
      />
    </>
  );
};
