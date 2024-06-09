const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
  try {
    const allListings = await Listing.find({}); // get all listings from the database
    res.render("listings/index.ejs", { allListings });
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");  // Return here to ensure only one response is sent
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};

module.exports.createListing = async (req, res, next) => {
  try {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
    console.log(response.body.features[0].geometry);
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);

    req.flash("success", "Your listing has been created!");
    res.redirect("/listings");
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};

module.exports.renderEditForm = async (req, res, next) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings"); // Return here to ensure only one response is sent
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("upload", "/upload/h_300/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};

module.exports.updateListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    let coordinate = await geocodingClient
      .forwardGeocode({
        query: `${req.body.listing.location},${req.body.listing.country}`,
        limit: 2,
      })
      .send();

    req.body.listing.geometry = coordinate.body.features[0].geometry;
    let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing);

    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      updatedListing.image = { url, filename };
      updatedListing.save();
    }
    req.flash("success", "Listing Updated !!");
    res.redirect(`/listings/${id}`);
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};

module.exports.search = async (req, res, next) => {
  try {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " ");
    console.log(input);
    if (input == "" || input == " ") {
      req.flash("error", "Search value empty !!!");
      return res.redirect("/listings"); // Return here to ensure only one response is sent
    }

    let data = input.split("");
    let element = "";
    let flag = false;
    for (let index = 0; index < data.length; index++) {
      if (index == 0 || flag) {
        element = element + data[index].toUpperCase();
      } else {
        element = element + data[index].toLowerCase();
      }
      flag = data[index] == " ";
    }
    console.log(element);
    let allListings = await Listing.find({
      title: { $regex: element, $options: "i" },
    });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Title";
      return res.render("listings/index.ejs", { allListings });
    }

    if (allListings.length == 0) {
      allListings = await Listing.find({
        category: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Category";
        return res.render("listings/index.ejs", { allListings });
      }
    }
    if (allListings.length == 0) {
      allListings = await Listing.find({
        country: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Location";
        return res.render("listings/index.ejs", { allListings });
      }
    }

    const intValue = parseInt(element, 10);
    const intDec = Number.isInteger(intValue);

    if (allListings.length == 0 && intDec) {
      allListings = await Listing.find({ price: { $lte: element } }).sort({
        price: 1,
      });
      if (allListings.length != 0) {
        res.locals.success = `Listings searched for less than Rs ${element}`;
        return res.render("listings/index.ejs", { allListings });
      }
    }
    if (allListings.length == 0) {
      req.flash("error", "Listings is not here !!!");
      return res.redirect("/listings"); // Return here to ensure only one response is sent
    }
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};

module.exports.destroyListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    req.flash("success", `Successfully removed ${deleted.title}!`);
    res.redirect("/listings");
  } catch (e) {
    next(e); // Pass errors to the error handler
  }
};
