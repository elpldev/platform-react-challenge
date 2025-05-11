import axios from "axios";

// TODO MOVE TO ENV
const API_KEY =
  "live_bgpf9RUnXkOrMIYrIoTVLK810Jp5Ym6Dt9KX4FIpVuJptDIJoOgonTTKCCWHdabz";
const BASE_URL = "https://api.thecatapi.com/v1";

const catApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

export interface FavoriteCat {
  id: number;
  image_id: string;
  sub_id?: string;
  created_at: string;
  image: CatImage;
}
export interface CatImage {
  id: string;
  url: string;
  breeds: CatBreed[];
  width: number;
  height: number;
}

export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  life_span: string;
  wikipedia_url: string;
}

export const getCats = async (limit: number = 10): Promise<CatImage[]> => {
  console.log("hello");
  const response = await catApi.get<CatImage[]>("/images/search", {
    params: { limit, has_breeds: 1 },
  });
  return response.data;
};

export const getCatById = async (id: string): Promise<CatImage> => {
  const response = await catApi.get<CatImage>(`/images/${id}`);
  return response.data;
};

export const getBreeds = async (): Promise<CatBreed[]> => {
  try {
    const response = await catApi.get<CatBreed[]>("/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
};

export const getImagesByBreed = async (
  breedId: string,
  limit = 10,
): Promise<CatImage[]> => {
  const response = await catApi.get<CatImage[]>("/images/search", {
    params: { breed_ids: breedId, limit },
  });
  return response.data;
};

export const getFavorites = async (): Promise<FavoriteCat[]> => {
  const response = await catApi.get<FavoriteCat[]>("/favourites");
  return response.data;
};

export const removeFavorite = async (
  favoriteId: number,
): Promise<{ message: string }> => {
  const response = await catApi.delete<{ message: string }>(
    `/favourites/${favoriteId}`,
  );
  return response.data;
};

export const addFavorite = async (imageId: string): Promise<{ id: number }> => {
  const response = await catApi.post<{ id: number }>("/favourites", {
    image_id: imageId,
  });
  return response.data;
};

export default catApi;
