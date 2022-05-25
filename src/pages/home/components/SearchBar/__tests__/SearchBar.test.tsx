import { render, screen, waitFor } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("SearchBar test", () => {
  it("changes value when user types", async () => {
    render(<SearchBar />);
    await act(async () => {
      userEvent.type(screen.getByRole("inputsearch"), "javascript");
    });
    await waitFor(() => {
      expect(screen.getByRole("inputsearch")).toHaveValue("javascript");
    });
  });

  it("button is disabled/enabled properly", async () => {
    render(<SearchBar />);
    const button = screen.getByText("Search");
    expect(button).toHaveProperty("disabled", true);
    await act(async () => {
      userEvent.type(screen.getByRole("inputsearch"), "javascript");
    });
    await waitFor(() => {
      expect(button).toHaveProperty("disabled", false);
    });
  });
});
