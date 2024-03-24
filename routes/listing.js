const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400, msg);
    } else {
      next();
    }
  };


//Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
      const allListings = await Listing.find({}); // get all listings from the database
      res.render("listings/index.ejs", { allListings });
    })
  );
  
  // New Route
  router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  // Show Route
  router.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings"); 
      }
      res.render("listings/show.ejs", { listing });
    })
  );
  
  // create Route
  router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
      let result = listingSchema.validate(req.body);
      console.log(result);
      if (result.error) {
        throw new ExpressError(400, result.error);
      }
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      req.flash("success", "Your listing has been created!"); 
      res.redirect("/listings");
    })
  );
  
  //Edit Route
  router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings"); 
      }
      res.render("listings/edit.ejs", { listing });
    })
  );
  
  // Update Route
  router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const updateListing = await Listing.findByIdAndUpdate(id, req.body.listing);
      req.flash("success","Your listing was updated.");
      res.redirect(`/listings/${updateListing._id}`);
    })
  );
  
  // Delete Route
  router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let deleted = await Listing.findByIdAndDelete(id);
      //console.log(deleted);
      req.flash("success", `Successfully removed ${deleted.title}!`);
      res.redirect("/listings");
    })
  );

module.exports = router