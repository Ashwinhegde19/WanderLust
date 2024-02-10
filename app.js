const express = require("express")
const app = express();
const mongoose = require("mongoose")

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

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
