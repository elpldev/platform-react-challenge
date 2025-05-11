import MockAdapter from "axios-mock-adapter";
import catApi, {
  getCats,
  getBreeds,
  getImagesByBreed,
  getFavorites,
  removeFavorite,
  addFavorite,
} from "./cat-api";
import type { CatImage, CatBreed, FavoriteCat } from "./cat-api";

describe("catApi", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(catApi);
  });

  afterEach(() => {
    mock.restore();
  });

  test("getCats calls the correct endpoint with parameters", async () => {
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

    const result = await getCats(5);

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

  test("getFavorites calls the correct endpoint and returns favorite cats", async () => {
    const mockFavorites: FavoriteCat[] = [
      {
        id: 123,
        image_id: "img123",
        created_at: "2023-01-01T12:00:00.000Z",
        image: {
          id: "img123",
          url: "https://test.com/cat.jpg",
          breeds: [],
          width: 500,
          height: 600,
        },
      },
    ];

    mock.onGet("/favourites").reply(200, mockFavorites);

    const result = await getFavorites();

    expect(result).toEqual(mockFavorites);
  });

  test("getFavorites throws error on failure", async () => {
    mock.onGet("/favourites").reply(500);

    await expect(getFavorites()).rejects.toThrow();
  });

  test("removeFavorite calls the correct endpoint with ID", async () => {
    const favoriteId = 123;
    const mockResponse = { message: "SUCCESS" };

    mock.onDelete(`/favourites/${favoriteId}`).reply(200, mockResponse);

    const result = await removeFavorite(favoriteId);

    expect(result).toEqual(mockResponse);
  });

  test("removeFavorite throws error on failure", async () => {
    const favoriteId = 123;

    mock.onDelete(`/favourites/${favoriteId}`).reply(500);

    await expect(removeFavorite(favoriteId)).rejects.toThrow();
  });

  test("addFavorite calls the correct endpoint with imageID", async () => {
    const imageId = "i123";
    const mockResponse = { id: 456 };

    mock.onPost("/favourites", { image_id: imageId }).reply(200, mockResponse);

    const result = await addFavorite(imageId);

    expect(result).toEqual(mockResponse);
  });

  test("addFavorite throws error upon failure", async () => {
    const imageId = "i123";

    mock.onPost("/favourites", { image_id: imageId }).reply(500);

    await expect(addFavorite(imageId)).rejects.toThrow();
  });
});
