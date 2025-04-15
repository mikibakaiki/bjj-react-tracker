import { Kimono } from "./Kimono";

export interface FetchKimonosResponse {
  kimonos: Kimono[];
  nextPage?: number;
}
