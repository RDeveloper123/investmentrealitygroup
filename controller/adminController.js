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

// //property type
// exports.getType = asyncHandler(async (req, res) => {
//     const result = await PropertyType.find()
//     res.json({ message: "Type Fetch Successfully", result })
// })

// exports.addType = asyncHandler(async (req, res) => {
//     const { type } = req.body
//     const { isError, error } = checkEmpty({ type })
//     if (isError) {
//         return res.status(400).json({ message: "All Feilds Required", error })
//     }

//     const result = await PropertyType.create(req.body)
//     res.status(201).json({ message: "Type Added Successfully", data: result })
// })
// exports.updateType = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     const { isError, error } = checkEmpty({ id })
//     if (isError) {
//         return res.status(400).json({ message: "All Feilds Required", error })
//     }
//     await PropertyType.findByIdAndUpdate(id, req.body)
//     res.json({ message: "Type Updated Successfully" })
// })

// exports.deleteType = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     const { isError, error } = checkEmpty({ id })
//     if (isError) {
//         return res.status(400).json({ message: "All Feilds Required", error })
//     }
//     await PropertyType.findByIdAndDelete(id)
//     res.json({ message: "Type Deleted Successfully" })
// })

// //property status
// exports.getPropertyStatus = asyncHandler(async (req, res) => {
//     const result = await PropertyStatus.find()
//     res.json({ message: "Type Fetch Successfully", result })
// })

// exports.addPropertyStatus = asyncHandler(async (req, res) => {
//     const { type } = req.body
//     const { isError, error } = checkEmpty({ type })
//     if (isError) {
//         return res.status(400).json({ message: "All Feilds Required", error })
//     }

//     const result = await PropertyStatus.create(req.body)
//     res.status(201).json({ message: "Type Added Successfully", data: result })
// })
// exports.updatePropertyStatus = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     const { isError, error } = checkEmpty({ id })
//     if (isError) {
//         return res.status(400).json({ message: "All Feilds Required", error })
//     }
//     await PropertyStatus.findByIdAndUpdate(id, req.body)
//     res.json({ message: "Type Updated Successfully" })
// })

// exports.deletePropertyStatus = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     const { isError, error } = checkEmpty({ id })
//     if (isError) {
//         return res.status(400).json({ message: "All Feilds Required", error })
//     }
//     await PropertyStatus.findByIdAndDelete(id)
//     res.json({ message: "Type Deleted Successfully" })
// })

//property

exports.getProperty = asyncHandler(async (req, res) => {
    const result = await Property.find({
        propertStatus: req.body.propertyStatus,
        propertyType: req.body.propertyType
    })
    res.json({ message: "Property get  Successfully", result })
})
exports.getAllProperty = asyncHandler(async (req, res) => {
    const result = await Property.find()
    res.json({ message: "All Property get  Successfully", result })
})

exports.addProperty = asyncHandler(async (req, res) => {
    Propertyupload(req, res, async (err) => {
        console.log(req.body);

        const { price,
            city,
            landmark,
            desc,
           
            propertyStatus,
            propertyType
        } = req.body
        const { isError, error } = checkEmpty({
            price,
            city,
            landmark,
            desc,
           
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
        if (!req.files) {
            return res.status(400).json({ message: "Image Is Required" })
        }
        // console.log(req.files.video);
        // console.log(req.files.image);
        const imageData = [], videoData = [];

        if (req.files['image']) {
            for (let i = 0; i < req.files['image'].length; i++) {
                const imageFile = req.files['image'][i];
                imageData.push(imageFile);
                // const result = await cloudinary.uploader.upload(imageFile.path);
                // console.log(imageFile);
                // filePromises.push(result);
            }
        }
        // const result = await cloudinary.uploader.

        if (req.files['video']) {
            for (let i = 0; i < req.files['video'].length; i++) {
                const videoFile = req.files['video'][i];
                videoData.push(videoFile);
                // const result = await cloudinary.uploader.upload(videoFile.path);
                // console.log(videoFile);
                // filePromises.push(result);
            }
        }
        const x = []
        // let y
        for (const item of imageData) {
            const result = await cloudinary.uploader.upload(item.path)
            x.push(result.secure_url)
        }
        if (videoData.length > 0) {

            for (const item of videoData) {
                cloudinary.uploader.upload_large(item.path, { resource_type: "video" }, async (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ message: "ERROR" })
                    }
                    await Property.create({
                        ...req.body,
                        image: x,
                        video: result.secure_url
                    })
                    return res.json({ message: "OK" })
                })
            }
        } else {

            return res.json({ message: "OK" })
        }
        // console.log(x);
        // console.log(videoData);

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

