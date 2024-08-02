const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      success: false,
      message: "Input must be an array.",
    });
  }

  const identifier = "john_doe_17091999";
  const userEmail = "john@xyz.com";
  const userRollNumber = "ABCD123";
  const numericValues = data.filter((item) => !isNaN(item));
  const alphabeticValues = data.filter(
    (item) => isNaN(item) && typeof item === "string"
  );
  const highestAlpha = alphabeticValues.length
    ? [alphabeticValues.sort().reverse()[0]]
    : [];

  res.json({
    success: true,
    user_id: identifier,
    email: userEmail,
    roll_number: userRollNumber,
    numbers: numericValues,
    alphabets: alphabeticValues,
    highest_alphabet: highestAlpha,
  });
});

app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "A server error occurred!" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Application is live on http://localhost:${PORT}`);
  });
}

module.exports = app;
