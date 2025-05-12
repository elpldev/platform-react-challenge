import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breeds from ".";
import { getBreeds, getImagesByBreed } from "../../services/cat-api";

jest.mock("../../services/cat-api");

const mockBreeds = [
  {
    id: "abys",
    name: "Abyssinian",
    origin: "Egypt",
    temperament: "Active, Energetic, Independent, Intelligent, Gentle",
    description:
      "The Abyssinian is easy to care for, and a joy to have in your home.",
    life_span: "14 - 15",
    wikipedia_url: "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
  },
  {
    id: "beng",
    name: "Bengal",
    origin: "United States",
    temperament: "Alert, Agile, Energetic, Demanding, Intelligent",
    description:
      "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone.",
    life_span: "12 - 15",
    wikipedia_url: "https://en.wikipedia.org/wiki/Bengal_(cat)",
  },
];

const mockBreedImages = [
  {
    id: "img1",
    url: "https://test.com/cat1.jpg",
    width: 500,
    height: 400,
  },
  {
    id: "img2",
    url: "https://test.com/cat2.jpg",
    width: 500,
    height: 400,
  },
];

describe("Breeds Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getBreeds as jest.Mock).mockResolvedValue(mockBreeds);
    (getImagesByBreed as jest.Mock).mockResolvedValue(mockBreedImages);
  });

  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading breeds...")).toBeInTheDocument();
  });

  test("renders breeds after loading", async () => {
    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Abyssinian")).toBeInTheDocument();
      expect(screen.getByText("Bengal")).toBeInTheDocument();
    });

    expect(screen.getByText("Egypt")).toBeInTheDocument();
    expect(screen.getByText("United States")).toBeInTheDocument();
  });

  test("opens modal when a breed card is clicked", async () => {
    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Abyssinian")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Abyssinian"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "The Abyssinian is easy to care for, and a joy to have in your home.",
        ),
      ).toBeInTheDocument();
    });
  });

  test("handles error state", async () => {
    (getBreeds as jest.Mock).mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch breeds"),
      ).toBeInTheDocument();
    });
  });
});
