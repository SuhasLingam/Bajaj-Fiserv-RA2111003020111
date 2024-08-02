const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input. Data should be an array.",
    });
  }

  const userId = "BajajTesting";
  const email = "BajajTesting@xyz.com";
  const rollNumber = "BajajTesting";
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter(
    (item) => isNaN(item) && typeof item === "string"
  );
  const highestAlphabet = alphabets.length
    ? [alphabets.sort().reverse()[0]]
    : [];

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
