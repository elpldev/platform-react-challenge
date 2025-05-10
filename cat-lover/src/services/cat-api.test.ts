import axios from "axios";
import { fetchCats } from "./cat-api";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ data: [] }),
  })),
}));
describe("catApi", () => {
  test("fetchCats calls the correct endpoint with parameters", async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: [] });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    await fetchCats(5);

    expect(mockGet).toHaveBeenCalledWith("/images/search", {
      params: { limit: 5, has_breeds: 1 },
    });
  });
});
