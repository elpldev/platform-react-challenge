import MockAdapter from "axios-mock-adapter";
import catApi, { fetchCats, getBreeds, getImagesByBreed } from "./cat-api";
import type { CatImage, CatBreed } from "./cat-api";

describe("catApi", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(catApi);
  });

  afterEach(() => {
    mock.restore();
  });

  test("fetchCats calls the correct endpoint with parameters", async () => {
    const mockData: CatImage[] = [
      {
        id: "1",
        url: "https://test.com/cat.jpg",
        breeds: [],
        width: 100,
        height: 100,
      },
    ];

    mock
      .onGet("/images/search", { params: { limit: 5, has_breeds: 1 } })
      .reply(200, mockData);

    const result = await fetchCats(5);

    expect(result).toEqual(mockData);
  });

  test("getBreeds calls the correct endpoint and returns breed data", async () => {
    const mockBreeds: CatBreed[] = [
      {
        id: "abys",
        name: "Abyssinian",
        description: "Active and intelligent",
        temperament: "Active, Energetic, Independent",
        origin: "Egypt",
        life_span: "14 - 15",
        wikipedia_url: "https://en.wikipedia.org/wiki/Abyssinian_cat",
      },
    ];

    mock.onGet("/breeds").reply(200, mockBreeds);

    const result = await getBreeds();

    expect(result).toEqual(mockBreeds);
  });

  test("getImagesByBreed calls the correct endpoint with breed parameters", async () => {
    const mockImages: CatImage[] = [
      {
        id: "img123",
        url: "https://test.com/cat2.jpg",
        breeds: [],
        width: 500,
        height: 600,
      },
    ];

    mock
      .onGet("/images/search", { params: { breed_ids: "abys", limit: 5 } })
      .reply(200, mockImages);

    const result = await getImagesByBreed("abys", 5);

    expect(result).toEqual(mockImages);
  });

  test("getBreeds throws error on failure", async () => {
    mock.onGet("/breeds").reply(500);

    await expect(getBreeds()).rejects.toThrow();
  });
});
