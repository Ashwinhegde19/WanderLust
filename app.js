const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require( "path" )  
const methodOverride = require("method-override")

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
app.use(methodOverride("_method"))                     // Overrides HTTP verbs (GET, POST, PUT, DELETE etc.) in a form 

app.get( "/", (req, res) => {
    res.send('Hello World!')
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({})  // get all listings from the database
    res.render("listings/index.ejs", { allListings });
 })

// Display form for creating a new listing
app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs")
});

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs", { listing });
}) 

app.post("/listings", async (req, res) => {
    const  newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
 })

app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render( "listings/edit.ejs" ,{ listing })
})

app.put("/listings/:id", async (req, res) => {
    let {id} = req.params
    const updateListing = await Listing.findByIdAndUpdate( id , req.body.listing )
    res.redirect(`/listings/${updateListing._id}`)
})

app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params
    let deleted = await Listing.findByIdAndDelete(id)
    //console.log(deleted);
    res.redirect("/listings")
})


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




app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
