import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./Database/conn.js";
import router from "./Router/route.js";

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

/**API routes */

app.use('/api', router)
/**Start Sever only with valid DB connection */

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connnected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Can't connect to server");
    }
  })
  .catch((error) => {
    console.log("Invalid DB connection");
  });
