import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

/**Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

/**HTTP GET requests */

app.get("/", (req, res) => {
  res.status(201).json("Home GET request");
});

/**Start Sever */
app.listen(port, () => {
  console.log(`Server connnected to http://localhost:${port}`);
});
