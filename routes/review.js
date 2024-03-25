const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// Post Reviews Route
router.post(
  "/",
  isLoggedIn, 
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review created");
    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    try {
      // Use findByIdAndUpdate to find and delete the review by its ID
      await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: { _id: reviewId } },
      });
      await Review.findByIdAndDelete(reviewId);
      req.flash("success", "Successfully deleted review!");
      res.redirect(`/listings/${id}`);
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).send("An error occurred while deleting the review");
    }
  })
);

module.exports = router;
