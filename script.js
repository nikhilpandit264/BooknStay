//      Not for use maine already withot category add kr liya tha 


// // scripts/addDefaultCategory.js
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const mongoose = require("mongoose");
// const Listing = require("./models/listing"); // adjust path if needed

// const dbUrl = process.env.ATLASDB_URL  ;

// (async () => {
//   try {
//     await mongoose.connect(dbUrl);
//     console.log("✅ Connected to DB");

//     const result = await Listing.updateMany(
//       { category: { $exists: false } },
//       { $set: { category: "other" } }
//     );

//     console.log(`🔧 Updated ${result.modifiedCount} listings`);
//   } catch (err) {
//     console.error("❌ Migration failed:", err);
//   } finally {
//     await mongoose.connection.close();
//     console.log("🚪 Connection closed");
//     process.exit(0);
//   }
// })();
