const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require( "path" )  
const methodOverride = require("method-override")
const ejsMate  = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js")

const MONGO_URL = "mongodb://localhost:27017/wanderlust"

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error(`Error connecting to MongoDB: ${err}`);
    })
     
async function main() {
    await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));  // Allows us to access data from HTML forms 
app.use(methodOverride("_method"))    // Overrides HTTP verbs (GET, POST, PUT, DELETE etc.) in a form 
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

app.get( "/", (req, res) => {
    res.send('Hello World!')
});

//Index Route
app.get("/listings", wrapAsync( async (req, res) => {
    const allListings = await Listing.find({})  // get all listings from the database
    res.render("listings/index.ejs", { allListings });
 }))

// Display form for creating a new listing
app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs")
});

// Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs", { listing });
})) 

// create Route
app.post("/listings", wrapAsync(async(req, res, next) => {
        let result = listingSchema.validate(req.body)
        console.log(result);
        if(result.error){
            throw new ExpressError(400, result.error)
        }
        const  newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
   
 }))

 //Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render( "listings/edit.ejs" ,{ listing })
}))

// Update Route
app.put("/listings/:id", wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400, "Send Valid Data for Listing")
    }
    let {id} = req.params
    const updateListing = await Listing.findByIdAndUpdate( id , req.body.listing )
    res.redirect(`/listings/${updateListing._id}`)
}))

// Delete Route
app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params
    let deleted = await Listing.findByIdAndDelete(id)
    //console.log(deleted);
    res.redirect("/listings")
}))


// app.get("/testListening", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"Sample Title",
//         description:"This is a sample listing.",
//         price: 500,
//         location: "goa",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("tested")

// })

app.all("*", function(req, res, next){
    next(new ExpressError(404, "Page Not Found"))
});

app.use((err, req, res, next) => {
    let {statusCode=500, message="Internal Error"} = err;
    res.status(statusCode).render("error.ejs", {message})
    // res.status(statusCode).send(message);
})



app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
