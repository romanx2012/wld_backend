const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from your Netlify domain
const allowedOrigins = ["https://charming-alpaca-24da49.netlify.app"];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

const votes = {
  wheels: 0,
  doors: 0,
};

app.post("/vote", (req, res) => {
  const choice = req.body.choice;
  if (choice === "wheels" || choice === "doors") {
    votes[choice]++;
    res.json({ message: "Vote counted!", votes });
  } else {
    res.status(400).json({ error: "Invalid choice." });
  }
});

app.get("/results", (req, res) => {
  res.json(votes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
