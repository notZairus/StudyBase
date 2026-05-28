import app from "./server";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
