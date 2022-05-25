import { render } from "@testing-library/react";
import { ArticleImageModal } from "../ArticleImageModal";

describe("ArticleImageModal tests", () => {
  it("shows the image properly", () => {
    const handleClose = jest.fn();
    render(
      <ArticleImageModal
        image={"https://localhost"}
        show={true}
        handleClose={handleClose}
      />
    );
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.src).toContain("https://localhost");
  });
});
