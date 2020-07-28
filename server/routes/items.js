const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const fileUploader = require("../config/cloudinary");

//Fetch all the items in the DB
router.get("/", (req, res, next) => {
    Item.find()
    .then( items => {
        res.status(200).json(items)
    })
    .catch( err => res.status(500).json(err))
});

//Fetch one item in the DB corresponding to the id provided in the route
router.get("/:id", (req, res, next) => {
    Item.findById(req.params.id)
    .then( item => {
        res.status(200).json(item)
    })
    .catch( err => res.status(500).json(err))
});

//Create one item with the arguments provided in the request
router.post("/", fileUploader.single("image"), (req, res, next) => {
    const {name, description, category, quantity, address, location} = req.body;
    const newItem = {name, description, category, quantity, address, location};
    if(req.file) newItem.image = req.file.path;
    newItem.id_user= req.session.currentUser._id;
    Item.create(newItem)
    .then( item => {
        res.status(201).json(item)
    })
    .catch( err => res.status(500).json(err))
});

//Update one item with the arguments provided in the request
router.patch("/:id", fileUploader.single("image"), (req, res, next) => {

    const {name, description, category, quantity, address, location} = req.body;
    const updatedItem = {name, description, category, quantity, address, location};
    if(req.file) updatedItem.image = req.file.secure_url;
    // newItem.id_user= req.session.currentUser._id;

    Item.findByIdAndUpdate(req.params.id, updatedItem, {new: true})
    .then( item => {
        res.status(200).json(item)
    })
    .catch( err => res.status(500).json(err))
});

//Delete one item 
router.delete("/:id", (req, res, next) => {

    Item.findByIdAndDelete(req.params.id)
    .then( item => {
        res.status(200).json(item)
    })
    .catch( err => res.status(500).json(err))
});

module.exports = router;