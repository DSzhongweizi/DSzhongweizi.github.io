import mongoose from "mongoose"
const url = 'mongodb://139.155.81.236:27017/blog'

mongoose.connect(url);
mongoose.connection.on("disconnected", () => mongoose.connect(url));
mongoose.connection.on("error", (err) => console.error('Connect Failed: ', err));
mongoose.connection.on("open", async () => console.log('🚀 Connecting MongoDB Successfully 🚀'));
