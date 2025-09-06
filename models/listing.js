const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const categoryEnum = [
  "trending",
  "rooms",
  "iconic_cities",
  "mountain",
  "amazing_pool",
  "camping",
  "farms",
  "arctic",
  "castle",
  "domes",
  "other"
];

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: categoryEnum,
    default: "other",
    index: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Cascade delete reviews if a listing is removed
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
