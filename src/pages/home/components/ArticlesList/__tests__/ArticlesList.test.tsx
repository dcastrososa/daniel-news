import { fireEvent, render, screen } from "@testing-library/react";
import { Article } from "../../../../../interfaces";
import { ArticlesList } from "../ArticlesList";

const articlesMock: Article[] = [
  {
    author: "Daniel Castro",
    content: "SSR means that your page is rendered on the server",
    description: "SSR means that your page is rendered on the server",
    title: "What is SSR?",
    url: "https://localhost",
    urlToImage: "https://localhost",
    source: {
      name: "News",
    },
  },
];

describe("ArticlesList test", () => {
  it("shows articles", () => {
    render(<ArticlesList articles={articlesMock} onPressArticle={() => {}} />);

    expect(screen.getByText("What is SSR?")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.src).toContain("https://localhost");
  });

  it("onPress event is called", () => {
    const mockOnClick = jest.fn();
    render(
      <ArticlesList articles={articlesMock} onPressArticle={mockOnClick} />
    );

    fireEvent.click(screen.getByText("Read more"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
