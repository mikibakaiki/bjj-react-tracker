import { Kimono } from "./Kimono";

export interface GetKimonosResponse {
  kimonos: Kimono[];
  hasMore: boolean;
  total: number;
}
