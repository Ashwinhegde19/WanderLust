const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().min(5).max(500).required(),
        image: Joi.string().allow(null, ''), // Allow null or empty string
        price: Joi.number()
            .positive()
            .integer()  
            .required(),
        country:  Joi.string().required(),
        location: Joi.string().required(),
    }).required()
})