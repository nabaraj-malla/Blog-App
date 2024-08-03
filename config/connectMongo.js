import mongoose from "mongoose";
const connectMongoDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connectecd to mongodb");
    })
    .catch(() => {
      console.log("Error in connecting to mongodb");
    });
};

export default connectMongoDB;
