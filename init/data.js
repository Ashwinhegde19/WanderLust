const sampleListings = 
    [
        {
          title: "Seaside Cottage Retreat",
          description: "Relax and rejuvenate in this charming seaside cottage overlooking the azure waters of the Mediterranean. Perfect for a romantic getaway.",
          image: "https://images.unsplash.com/photo-1526961584549-28f7f16df5b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNob3BwaW5nJTIwY29zdGFnZXxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
          price: 1200,
          location: "Santorini",
          country: "Greece"
        },
        {
          title: "Private Island Paradise",
          description: "Escape to your own private island sanctuary surrounded by crystal-clear waters and pristine white sand beaches. Ultimate luxury awaits.",
          image: "https://images.unsplash.com/photo-1508710588431-52c5d4128ab0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHByaXZhdGUlMjBpc2xhbmQlMjBvZiUyMGltYWdlcyUyMGluJTIwYWxidW1zJTIwYW5kJTIwcG9ydHN8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 5000,
          location: "Maldives",
          country: "Maldives"
        },
        {
          title: "Safari Lodge Experience",
          description: "Immerse yourself in the heart of the African wilderness with a stay at this luxurious safari lodge. Witness breathtaking wildlife and stunning sunsets.",
          image: "https://images.unsplash.com/photo-1562521042-0577a8c93fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FmYXJpJTIwbG9kZ2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 2000,
          location: "Serengeti National Park",
          country: "Tanzania"
        },
        {
          title: "Mountain Chalet Retreat",
          description: "Escape the hustle and bustle of city life and immerse yourself in the tranquil beauty of the Swiss Alps. Cozy up by the fireplace and enjoy breathtaking mountain views.",
          image: "https://images.unsplash.com/photo-1545177244-3ce50cf65baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1vdW50YWluJTIwY2hhbGV0JTIwZWxlcGhhbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 1800,
          location: "Zermatt",
          country: "Switzerland"
        },
        {
          title: "Historic Castle Stay",
          description: "Step back in time and experience the grandeur of a bygone era with a stay in this meticulously restored medieval castle. Live like royalty for a truly unforgettable experience.",
          image: "https://images.unsplash.com/photo-1571426080421-80114c993f6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxjaGFzc2x5JTIwY2FzdGxlJTIwc3RheXxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
          price: 3000,
          location: "Edinburgh",
          country: "Scotland"
        },
        {
          title: "Tropical Rainforest Retreat",
          description: "Immerse yourself in the lush beauty of the Amazon rainforest with a stay in this eco-friendly jungle lodge. Explore diverse wildlife and discover the wonders of the rainforest.",
          image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1hem9uJTIwcmFpbmZvc3QlMjBsb2RnZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          price: 1500,
          location: "Manaus",
          country: "Brazil"
        },
        {
          title: "Vineyard Estate Getaway",
          description: "Indulge in the luxury of wine country living with a stay at this exquisite vineyard estate. Sip fine wines, stroll through the vineyards, and savor gourmet cuisine.",
          image: "https://images.unsplash.com/photo-1521402772445-b25615d5aade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHZpbmV5YXJkJTIwdmluZXlhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 2500,
          location: "Napa Valley",
          country: "United States"
        },
        {
          title: "Beachfront Luxury Villa",
          description: "Experience the epitome of luxury living with a stay in this stunning beachfront villa. Relax by the infinity pool, stroll along the private beach, and enjoy panoramic ocean views.",
          image: "https://images.unsplash.com/photo-1573273787174-789ae946f8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2hmcnVpdCUyMGx1eHVyeSUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 4000,
          location: "Bali",
          country: "Indonesia"
        },
        {
          title: "Riverside Cabin Retreat",
          description: "Escape to a rustic riverside cabin. Enjoy fishing, hiking, and campfires under the stars in the picturesque wilderness.",
          image: "https://images.unsplash.com/photo-1560855331-d0ef797f2a0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHJpdmVyc2lkZSUyMGNhYmluJTIwcmV0cmVhdHxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
          price: 900,
          location: "Yellowstone National Park",
          country: "United States"
        },
        {
          title: "Alpine Ski Chalet",
          description: "Hit the slopes and experience the thrill of skiing with a stay at this cozy alpine ski chalet. After a day on the mountain, unwind by the fireplace and soak in stunning mountain views.",
          image: "https://images.unsplash.com/photo-1517838933305-d89269dc06f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWxwaW5lJTIwY2hhbGV0JTIwZmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 1600,
          location: "Chamonix",
          country: "France"
        },
      ];
  
  module.exports = { data: sampleListings };