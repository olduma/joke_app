const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const FILE_PATH = "./jokes.json";

// Завантаження жартів з файлу
let jokes = [];
if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  jokes = JSON.parse(data);
}

app.use(cors());
app.use(express.json());

app.get("/jokes", (req, res) => {
  res.json(jokes);
});

app.post("/jokes", (req, res) => {
  const { setup, punchline } = req.body;
  jokes.push({ setup, punchline });

  // Запис жартів у файл
  fs.writeFileSync(FILE_PATH, JSON.stringify(jokes, null, 2), "utf8");

  res.json(jokes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
