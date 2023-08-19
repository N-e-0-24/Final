// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import contactUs from './models/contactUs.js'
import dotenv from 'dotenv';
import newsPost from "./routes/newsPost.routes.js";




          



dotenv.config();

const app = express();
          

// Middleware

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


app.use(cors("http://localhost:5173"));


app.use("/",newsPost);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
      w: 'majority', // Specify a valid write concern mode
      j: true, // Optional: Journal write concern
      wtimeout: 1000 // Optional: Write concern timeout in milliseconds
  }
})
  .then(() => {
      console.log('Database connected');
  })
  .catch((err) => {
      console.log('Error in connecting to database: ' + err);

  });
// API endpoint to save form data
app.get('/',(req,res)=>{
  res.send("Hello From Node backened")
})
app.post('/api/submit-form', async (req, res) => {
  const { name, email, company, country, message } = req.body;

  try {
    // Create a new FormEntry instance
    const formEntry = new contactUs({
      name,
      email,
      company,
      country,
      message,
    });

    // Save the form entry to the database
    await formEntry.save();

    // Send a response back to the client
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving the data' });
  }
});

const PORT = 3000; // You can change this to any port you prefer

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
