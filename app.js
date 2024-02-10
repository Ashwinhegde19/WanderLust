const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")


const MONGO_URL = "mongodb://localhost:27017/wanderlust"

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error(`Error connecting to MongoDB: ${err}`);
    })
     
async function main() {
    await mongoose.connect(MONGO_URL)
}

app.get( "/", (req, res) => {
    res.send('Hello World!')
});

app.get("/testListening", async (req,res)=>{
    let sampleListing = new Listing({
        title:"Sample Title",
        description:"This is a sample listing.",
        price: 500,
        location: "goa",
        country: "India"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("tested")

})




app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
