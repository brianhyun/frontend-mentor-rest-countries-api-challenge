import express from "express";
import { fetchDataWithRetries } from "../utils/requests.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Fetching data from API...");
  const url = "https://restcountries.com/v3.1/all";

  try {
    const data = await fetchDataWithRetries(url);

    res.render("index", {
      countriesArr: data,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .send("Error fetching data from the API. Please try again later.");
  }
});

export default router;
