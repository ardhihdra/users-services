const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27018/sejutacita", 
   {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     auth: {
       username: "admin",
       password: "admin"
     }
   }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected!");
});
