import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { fetchCats } from "../services/cat-api";

jest.mock("../services/cat-api", () => ({
  fetchCats: jest.fn(),
}));

describe("Home Component", () => {
  const mockCats = [
    { id: "1", url: "https://example.com/cat1.jpg" },
    { id: "2", url: "https://example.com/cat2.jpg" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially and then renders cats after fetch", async () => {
    (fetchCats as jest.Mock).mockResolvedValue(mockCats);

    render(<Home />);

    expect(screen.getByText("Loading cats...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading cats...")).not.toBeInTheDocument();
    });

    const images = screen.getAllByAltText("Cat");
    expect(images).toHaveLength(2);
    expect(fetchCats).toHaveBeenCalledWith(10);
  });

  test('loads more cats when "Load More Cats" button is clicked', async () => {
    const moreCats = [
      { id: "3", url: "https://example.com/cat3.jpg" },
      { id: "4", url: "https://example.com/cat4.jpg" },
    ];

    (fetchCats as jest.Mock)
      .mockResolvedValueOnce(mockCats)
      .mockResolvedValueOnce(moreCats);

    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText("Loading cats...")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Load More Cats"));

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getAllByAltText("Cat")).toHaveLength(4);
    expect(fetchCats).toHaveBeenCalledTimes(2);
  });

  test("displays error message when fetch fails", async () => {
    (fetchCats as jest.Mock).mockRejectedValue(new Error("API error"));

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch cats/i)
      ).toBeInTheDocument();
    });
  });
});
