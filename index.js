const fs = require("fs");
const path = require("path");

const votesFile = path.join("/data", "votes.json");

// Load saved votes
let votes = { wheels: 0, doors: 0 };
if (fs.existsSync(votesFile)) {
  votes = JSON.parse(fs.readFileSync(votesFile));
}

// Save votes to file
function saveVotes() {
  fs.writeFileSync(votesFile, JSON.stringify(votes));
}

app.post("/vote", (req, res) => {
  const choice = req.body.choice;
  if (choice === "wheels" || choice === "doors") {
    votes[choice]++;
    saveVotes();
    res.json({ message: "Vote counted!", votes });
  } else {
    res.status(400).json({ error: "Invalid choice." });
  }
});

app.get("/results", (req, res) => {
  res.json(votes);
});