// controllers/news.controller.js
import express from "express";
import mongoose from "mongoose";

import News from "../models/News.js";

const app = express();

const router = express.Router();
// Fetch all data
export const getAllNews = async (req, res) => {
  try {
    const newsPosts = await News.find();
    res.status(200).json(newsPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add single news
export const addNews = async (req, res) => {
  const { title, description, imageLink, content } = req.body;

  try {
    // Create the News object with the uploaded image URL
    const createNewPost = new News({
      title,
      description,
      image: imageLink, // Correctly using imageLink here
      content,
    });

    // Save the News object
    await createNewPost.save();

    res.status(201).json(createNewPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "News creation failed." });
  }
};


// Get single news
export const getSingleNews = async (req, res) => {
  const { id } = req.params;

  try {
    const singlePost = await News.findById(id);
    res.status(200).json(singlePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update single news
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Post ${id} not found`);

  const updatedNews = {
    title,
    description,
    image,
    content,
    _id: id,
  };

  try {
    await News.findByIdAndUpdate(id, updatedNews, { new: true });
    res.json(updatedNews);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Remove single news
export const removeNews = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Post ${id} not found`);

  try {
    await News.findByIdAndRemove(id);
    res.json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
