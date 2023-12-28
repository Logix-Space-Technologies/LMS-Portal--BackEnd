const Material = require("../models/material.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const { request, response } = require("express");
const multer = require("multer")
const Validator = require("../config/data.validate");
const { log } = require("console");

// multer setup for file uploads
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname.replace(/[^\w\-.]/g, ''));
    },
});

const upload = multer({ storage: storage }).single('uploadFile');

exports.createMaterial = (request, response) => {  // Corrected parameter name rsponse to response
    upload(request, response, function (err) {
        if (err) {
            console.log("Error Uploading file: ", err)
            return response.json({ "status": err })
        }

        const { batchId, fileName, materialDesc, remarks, uploadFile } = request.body
        const materialToken = request.body.token

        jwt.verify(materialToken, "lmsappone", (err, decoded) => {
            if (decoded) {
                const validationErrors = {};

                if (Validator.isEmpty(batchId).isValid) {
                    validationErrors.value = Validator.isEmpty(batchId).message;
                }
                if (!Validator.isValidAmount(batchId).isValid) {
                    validationErrors.amount = Validator.isValidAmount(batchId).message;
                }
                if (!Validator.isValidName(fileName).isValid) {
                    validationErrors.name = Validator.isValidName(fileName).message;
                }

                if (!Validator.isValidAddress(materialDesc).isValid) {
                    validationErrors.address = Validator.isValidAddress(materialDesc).message;
                }

                if (request.uploadFile && !Validator.isValidFile(request.uploadFile).isValid) {
                    validationErrors.file = Validator.isValidFile(request.uploadFile).message;
                }

                // If validation fails
                if (Object.keys(validationErrors).length > 0) {
                    return response.json({ "status": "Validation failed", "data": validationErrors });
                }

                const uploadFile = request.file ? request.file.filename : null

                const addMaterial = new Material({
                    batchId: batchId,
                    fileName: fileName,
                    materialDesc: materialDesc,
                    remarks: remarks,
                    uploadFile: uploadFile
                })

                Material.materialCreate(addMaterial, (err, data) => {
                    if (err) {
                        return response.json({ "status": err });
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                })

            } else {
                return response.json({ "status": "Unauthorized User!!" });
            }
        })

    })

}

exports.searchMaterial = (request, response) => {
    const materialQuery = request.body.materialQuery;
    const materialSearchToken = request.body.token;

    jwt.verify(materialSearchToken, "lmsappone", (err, decoded) => {
        if (!materialQuery) {
            return response.json({ "status": "Provide a search query" });
        }
        if (decoded) {
            Material.searchMaterial(materialQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};
