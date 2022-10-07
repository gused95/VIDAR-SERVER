const router = require("express").Router()

const mongoose = require("mongoose");

const Collection = require("../models/Collection.model")

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

// POST "/collections/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
  
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

//router.methodHTTP(path, ()  => {})

//Route for add collection(object)

// http://localhost:5005/celulares/collection
router.post("/addnew", (req, res) => {
    const { 
        title, 
        description, 
        pickLocation, 
        pickSchedule, 
        postUntil,
        collecType,
        imageUrl,
        price,
                    } = req.body;

    if (!title || 
        !description || 
        !pickLocation || 
        !pickSchedule || 
        !postUntil || 
        !collecType ||
        !imageUrl
        ) {
        return res
          .status(400)
          .json({ errorMessage: "Please enter all the fields" });
      }
    
    Collection.create(
        {
        title,
        description,
        pickLocation,
        pickSchedule,
        postUntil,
        collecType,
        imageUrl,
        price,
        }
    )

        .then(() => {
            res.status(200).json({ message: "Collection created successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
          });
      
});

//Route to get all the Collections

// http://localhost:5005/celulares/getcols
router.get("/getcols", (req, res) => {
    
    Collection.find()
        .then((collections) => {
            res.status(200).json(collections);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        });
})

//Route for colletion details
//ID from  params
//POST - localhost:5005/collections/details/id
router.get("/details/:id", async (req, res) => {
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }
        //Read - Modelo.findById()
        const collectionFound = await Collection.findById(id);
        res.json(collectionFound);
    } catch (error) {
        console.log(error);
    }
})

//Route for update a collection
//id from collection in params
//new data => req.body
//http://localhost:5005/collections/details/id
router.put("/details/:id", async (req, res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {                     //verifica solo la estructura
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }

        //Update - Model.findByIdAndUpdate(id, newData, { new:true })
        const collectionUpdated = await Collection.findByIdAndUpdate(id,req.body, { new:true })
        res.json(collectionUpdated);
    }catch(error){
        console.log(error)
    }
})

//Route to remove a collection
//id from collection in params
//http://localhost:5005/collections/details/id
router.delete("/details/:id", async (req, res) => {
    try{
        const { id } = req.params;
        //Delete - Modelo.findByIdAndDelete()
        const deletedCollection = await Collection.findByIdAndDelete(id);  
        res.json(deletedCollection)
    }catch(error){
        console.log(error)
    }
})

module.exports = router