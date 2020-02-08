const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');
const { auth } = require("../middleware/auth");


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
    //after getting that image from client
    //we need to save it inside Node Server

    //Multer library
    upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    }

    )
});

router.post("/uploadProduct", auth, (req, res) => {

    //save the data from the client into the DB 
    const product = new Product(req.body)

    product.save((err) => {
        if (err) returnres.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/getProducts", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    console.log(req.body.filters)

    let findArgs = {};
    //term from LandingPage.js-updateSearchTerms-variables
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {

            } else {
                findArgs[key] = req.body.filters[key];
                console.log(req.body.filters[key])
            }
        }
    }

    if(term) {
        //save the data from the client into the DB 
        Product.find(findArgs)
            .find({  $text: {$search: term}})       //mongoDB method that allows the function to actually work
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    } else {

        //save the data from the client into the DB 
        Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
 })

    }
   

});


//?id=${productId}&type=single
router.post("/products_by_id", auth, (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type=="array") {

    }

    Product.find({'_id': {$in: productIds}})
    .populate('writer')
    .exec((err, product)=> {
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })

    //find the club information that belongs to the club id

});

module.exports = router;
