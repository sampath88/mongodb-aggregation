const mongoose = require("mongoose");

const getURL = (username, password,dbName) => {
  return `mongodb+srv://${username}:${password}@cluster1.04mh4bj.mongodb.net/${dbName}?retryWrites=true&w=majority`;
};

const connectWithDb = () => {
  const URL = getURL(process.env.DB_USER, process.env.DB_PASS,"aggree");
  return mongoose
    .connect(URL)
    .then(() => {
      console.log("DB Connected successfully!");
    })
    .catch((err) => {
      console.error("DB Connection issue!");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDb;
