const router = require("express").Router()

const mongoose = require("mongoose");

const Collection = require("../models/Collection.model")

//routerl.methodHTTP(path, ()  => {})

router.get("/", (req, res) => {
    res.json({ celulares: [1, 2, 3] })
})


//Route for add collection(object)

// http://localhost:5005/celulares/collection
router.post("/collection", (req, res) => {
    const { title, description, pickLocation, pickSchedule, postUntil } = req.body;

    if (!title || !description || !pickLocation || !pickSchedule || !postUntil) {
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

// http://localhost:5005/celulares/getcol
router.get("/getcol", (req, res) => {
    
    Collection.find()
        .then((collections) => {
            res.status(200).json(collections);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        });
})

module.exports = router