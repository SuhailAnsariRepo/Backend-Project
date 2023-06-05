const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
dotenv.config();
const uri = process.env.DB_CONNECT;


async function run() {
  try {
    const conn = await mongoose.connect(uri,{
      useNewUrlParser :true,
      useUnifiedTopology :true
    });
    console.log("connected");
    
  } catch (error) {
    console.log(error.msg);
  }
}
run().catch(console.dir);

//Import Routes
const adminRoutes = require("./routes/admin")

// Middlewares
app.use(express.json());
app.use(cors());

//Route Middleware
app.use("/api/admins", adminRoutes);

app.listen(4000, () => {console.log("Server up and running at port 4000")});

