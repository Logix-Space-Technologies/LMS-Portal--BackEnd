const firebaseToken = require('../models/firebaseTokens.model');
const { response } = require('express')
const jwt = require('jsonwebtoken')

exports.createTokens = (request, response) => {
    const firebaseCreateToken = request.headers.token;
    // const key = request.headers.key;

    if (!firebaseCreateToken) {
        return response.status(400).json({ "status": "Firebase token and key are required." });
    }

    jwt.verify(firebaseCreateToken, "lmsappstud", (err, decoded) => {
        if (err) {
            return response.status(401).json({ "status": "Unauthorized access!!" });
        }
        const firebaseSetup = new firebaseToken({
            studId: request.body.studId,
            firebaseToken: request.body.firebaseToken
        });
        firebaseToken.create(firebaseSetup,(err, data) => {
            if (err) {
                return response.status(500).json({ "status": err });
            }
            return response.status(200).json({ "status": "success", "data": data });
        });
    });
};
