const Cms = require("../models/Cms")
const Property = require("../models/Property")
const PropertyStatus = require("../models/PropertyStatus")
const PropertyType = require("../models/PropertyType")
const { checkEmpty } = require("../utils/handleEmpty")
const { upload, Propertyupload } = require("../utils/upload")
const asyncHandler = require('express-async-handler')

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


//cms
exports.addCms = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { brandname, mobile, address, email, socialMediaLinks } = req.body
        const { isError, error } = checkEmpty({ brandname, mobile, address, email, socialMediaLinks })
        if (isError) {
            return res.status(400).json({ message: "All Feilds Required", error })
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "upload error" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image Is Required" })
        }

        const f = await cloudinary.uploader.upload(req.file.path)
        console.log(f);
        const result = await Cms.create({ ...req.body, logo: f.secure_url })
        res.status(201).json({ message: "Cms Add Success", result })
    })
})

exports.deleteCms = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Cms.findByIdAndDelete(id)
    if (!result) {
        return res.status(404).json({ message: "Cms Not Found" })
    }
    res.status(200).json({ message: "Cms Delete Success" })
})


//property
exports.getProperty = asyncHandler(async (req, res) => {
    const data = req.query;

    const result = await Property.find(data);
    console.log(result);
  
    if (!result) {
      return res.status(404).json({ message: 'No properties found' });
    }
  
    res.status(200).json(result);
  });
exports.getAllProperty = asyncHandler(async (req, res) => {
    const result = await Property.find()
    res.json({ message: "All Property get  Successfully", result })
})

exports.addProperty = asyncHandler(async (req, res) => {
    Propertyupload(req, res, async (err) => {
        console.log(req.body);

        const { price,
            budget,
            city,
            landmark,
            desc,
           preselection,
            propertyStatus,
            propertyType
        } = req.body
        const { isError, error } = checkEmpty({
            price,
            budget,
            city,
            landmark,
            desc,
            preselection,
            propertyStatus,
            propertyType
        })
        if (isError) {
            return res.status(400).json({ message: "All Feilds Required", error })
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "upload error" })
        }
        if (!req.files || !req.files['image']) {
            return res.status(400).json({ message: "Image Is Required" })
        }
        const imageData = [];

        if (req.files['image']) {
            for (let i = 0; i < req.files['image'].length; i++) {
                const imageFile = req.files['image'][i];
                imageData.push(imageFile);
            }
        }

        const x = []
        for (const item of imageData) {
            const result = await cloudinary.uploader.upload(item.path)
            x.push(result.secure_url)
        }

        let videoUrl = null;
        if (req.files && req.files['video']) {
            for (const item of req.files['video']) {
                cloudinary.uploader.upload_large(item.path, { resource_type: "video" }, async (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ message: "ERROR" })
                    }
                    videoUrl = result.secure_url;
                })
            }
        }

        await Property.create({
            ...req.body,
            image: x,
            video: videoUrl
        })
        return res.json({ message: "OK" })
    })
})

exports.deleteProperty = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    await Property.findByIdAndDelete(id)
    res.json({ message: "Property Deleted Successfully" })
})

