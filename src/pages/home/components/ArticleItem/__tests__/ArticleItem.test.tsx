import { fireEvent, render, screen } from "@testing-library/react";
import { ArticleItem } from "./../ArticleItem";
import { Article } from "../../../../../interfaces";

const articleMock: Article = {
  author: "Daniel Castro",
  content: "SSR means that your page is rendered on the server",
  description: "SSR means that your page is rendered on the server",
  title: "What is SSR?",
  url: "https://localhost",
  urlToImage: "https://localhost",
  source: {
    name: "News",
  },
};

describe("ArticleItem test", () => {
  it("shows info properly", () => {
    render(
      <ArticleItem article={articleMock} onClick={(article: Article) => {}} />
    );

    expect(screen.getByText("What is SSR?")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.src).toContain("https://localhost");
  });

  it("triggers onClick event", async () => {
    const mockOnClick = jest.fn();
    render(<ArticleItem article={articleMock} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText("Read more"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
