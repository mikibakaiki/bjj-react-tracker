import { DateTime } from "luxon";
import { Kimono } from "../types";

export const preprocessKimonosDates = (kimonos: Kimono[]) => {
    return kimonos.map((kimono) => {
      const formattedDates = kimono.timestamp.map((timestampString) => {
        return DateTime.fromISO(timestampString).toFormat("dd/MM/yyyy");
      });
      return { ...kimono, timestamp: formattedDates };
    });
  };