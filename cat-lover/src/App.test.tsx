import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders navigation links", () => {
    render(<App />);

    const homeLink = screen.getByText(/home/i);
    const breedsLink = screen.getByText(/breeds/i);
    const favoritesLink = screen.getByText(/favorites/i);

    expect(homeLink).toBeInTheDocument();
    expect(breedsLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  test("renders app title", () => {
    render(<App />);

    const titleElement = screen.getByText(/cat lover/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders home page by default", () => {
    render(<App />);

    const homePageElement = screen.getByText(/home page - random cats/i);
    expect(homePageElement).toBeInTheDocument();
  });
});
