const Joi = require('joi');
const review = require('./models/review');

// Categories must enum 
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

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow(null, ''), // allow null or empty string
        country: Joi.string().required(),
        category: Joi.string().valid(...categoryEnum).default("other") //  new for category
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});
