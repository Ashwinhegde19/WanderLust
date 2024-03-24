    const express = require("express")
    const router = express.Router({mergeParams: true})
    const wrapAsync = require("../utils/wrapAsync.js");
    const ExpressError = require("../utils/ExpressError.js");
    const { reviewSchema } = require("../schema.js");
    const Review = require("../models/review.js");
    const Listing = require("../models/listing.js");

    const validateReview = (req, res, next) => {
        let { error } = reviewSchema.validate(req.body);
        if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
        } else {
        next();
        }
    };

    // Post Reviews Route
    router.post(
        "/",
        validateReview,
        wrapAsync(async (req, res) => {
        try {
            //console.log(req.params.id);
            let listing = await Listing.findById(req.params.id);
            if (!listing) {
            throw new ExpressError(404, "Listing not found");
            }
    
            let newReview = new Review(req.body.review);
    
            // Check if listing.reviews is undefined, and initialize it as an empty array if needed
            if (!listing.reviews) {
            listing.reviews = [];
            }
    
            listing.reviews.push(newReview);
            await newReview.save();
            await listing.save();
    
            console.log("Saved review to database!");
            res.redirect(`/listings/${listing._id}`);
        } catch (error) {
            console.error("Error saving review:", error);
            next(error);
        }
        })
    );
    
    // Delete Review Route
    router.delete("/:reviewId", wrapAsync(async (req, res) => {
        const { listingId, reviewId } = req.params;
    
        try {
            // Use findByIdAndUpdate to find and delete the review by its ID
            await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: { _id: reviewId } } });
            await Review.findByIdAndDelete(reviewId);
        
            res.redirect(`/listings/${listingId}`);
        } catch (error) {
            console.error("Error deleting review:", error);
            res.status(500).send("An error occurred while deleting the review");
        }
    }));
    
    module.exports = router