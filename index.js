import Express from "express";
import "dotenv/config";
import userRouter from "./src/routes/users.js";
import helpers from "./src/helpers/helpers.js";
const app = Express();
const port = process.env.PORT;

// Handle not found
app.use("*", (req, res, next) => {
  next(new Error("Endpoint Not Found"));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  helpers.responseError(res, "Error", 500, err.message, []);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
