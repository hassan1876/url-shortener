import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    urlId: {
      type: String,
      unique:true,
      required: true,
      index: true
    },
    origUrl: {
      type: String,
      unique:true,
      required: true,
      index: true
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      default: Date.now,
    },
  });
  UrlSchema.index({ urlId: 1, origUrl: 1 });
  
  export default mongoose.model('Url', UrlSchema);