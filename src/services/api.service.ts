
// export const getKimonoList = async () => {
//   try {
//     const data = await fs.readFile("../data.json", "utf8");
//     return JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading Kimono list:", error);
//     return [];
//   }
// };

// api.service.js
import kimonoData from "../data.json";

export const getKimonoList: Kimono[] = kimonoData;