import React from "react";
import { Modal } from "react-bootstrap";

interface ArticleImageModalProps {
  image: string;
  show: boolean;
  handleClose: () => void;
  alt?: string;
}

export const ArticleImageModal = ({
  image,
  show,
  handleClose,
  alt,
}: ArticleImageModalProps) => (
  <Modal show={show} onHide={handleClose}>
    <img src={image} alt={alt || "article-image"} />
  </Modal>
);
