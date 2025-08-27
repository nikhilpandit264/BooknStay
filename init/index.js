const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // jo pahale se pada hai usko clear krega 
   initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68ad6b6292ad0ef0a34368e0"  
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();