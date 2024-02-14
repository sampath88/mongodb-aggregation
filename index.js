require("dotenv").config();

const app = require("./app");
const PORT = 4000;

const connectWithDb = require("./config/db");

async function run() {
  try {
    await connectWithDb();
    app.listen(PORT, () => console.log("Server is listening at PORT: ", PORT));
  } catch (err) {
    console.error("[APP] issue while startup");
    console.error(err);
  }
}

run();
