import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image:String,
    
  content: String,
});

const News = mongoose.model('News', newsSchema);

export default News;

