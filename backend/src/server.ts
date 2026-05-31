import app from "./app";
import tasks from "./routes/tasks";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
