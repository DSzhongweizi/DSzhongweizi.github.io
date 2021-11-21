import mongoose from "mongoose"
const Schema = mongoose.Schema;

export default mongoose.model('article', new Schema({
  title: String,
  desc: String,
  status: String,
  tags: [String],
  category: [String],
  ctime: {
    type: Date,
    default: Date.now(),
  },
  utime: {
    type: Date,
    default: Date.now()
  }
}))