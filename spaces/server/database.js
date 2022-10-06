import mongoose from "mongoose";

(async () => {
  const db = await mongoose.connect("mongodb+srv://jordy:DR08216a7Fe3Zr5m@db-mongodb-48fa5fb9.mongo.ondigitalocean.com/galleryapp?tls=true&authSource=admin&replicaSet=db-mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to:", db.connection.name);
})();
