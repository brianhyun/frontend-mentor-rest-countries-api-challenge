import express from "express";
import fs from "fs";
import url from "url";
import path from "path";

const router = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", async (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "../data/response.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return res.status(500).send("Error fetching data from the local file.");
      }

      const countriesArr = JSON.parse(data);
      res.render("index", { countriesArr });
    }
  );
});

export default router;
