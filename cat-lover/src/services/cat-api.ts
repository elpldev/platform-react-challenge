import axios from "axios";

// TODO MOVE TO ENV
const API_KEY = "your-api-key";
const BASE_URL = "https://api.thecatapi.com/v1";

const catApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

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

export const fetchCats = async (limit: number = 10): Promise<CatImage[]> => {
  console.log("hello");
  const response = await catApi.get<CatImage[]>("/images/search", {
    params: { limit, has_breeds: 1 },
  });
  return response.data;
};
export default catApi;
