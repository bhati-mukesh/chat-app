const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
require("./config/db")(); //DB Connection
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const mockData = require("./data.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// app.get("/api/chat", (req, res) => {
//   return res.status(200).json({ chats: mockData });
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Invalid resource" });
});

// Error Handling middleWares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server up at http:localhost:${PORT}`);
});
