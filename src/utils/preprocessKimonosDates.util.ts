import { DateTime } from "luxon";
import { Kimono } from "../types";

export const preprocessKimonosDates = (kimonos: Kimono[]): Kimono[] => {
  return kimonos.map((kimono) => ({
    ...kimono,
    timestamp: kimono.timestamp.map((date) => {
      try {
        // Convert ISO string to dd/MM/yyyy format
        return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
      } catch {
        return date;
      }
    }),
  }));
};
