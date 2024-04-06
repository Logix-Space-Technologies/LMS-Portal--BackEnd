const firebaseToken = require('../models/clgStaffFirebaseToken.model');
const { response } = require('express')
const jwt = require('jsonwebtoken')

exports.createTokens = (request, response) => {
    const firebaseCreateToken = request.headers.token;
    // const key = request.headers.key;

    if (!firebaseCreateToken || firebaseCreateToken === "" || firebaseCreateToken === null) {
        return response.status(400).json({ "status": "Firebase token is required." });
    }

    jwt.verify(firebaseCreateToken, "lmsappstud", (err, decoded) => {
        if (err) {
            return response.status(401).json({ "status": "Unauthorized access!!" });
        }
        
        // Check if firebaseToken is provided in the request body
        const firebaseTokenValue = request.body.firebaseToken;
        if (!firebaseTokenValue) {
            return response.status(400).json({ "status": "Firebase token is required in the request body." });
        }

        // Only create firebaseSetup if firebaseToken is not null or empty
        const firebaseSetup = new firebaseToken({
            clgStaffId: request.body.clgStaffId,
            firebaseToken: firebaseTokenValue
        });

        firebaseToken.create(firebaseSetup, (err, data) => {
            if (err) {
                return response.status(500).json({ "status": err });
            }
            return response.status(200).json({ "status": "success", "data": data });
        });
    });
};


exports.sendNotificationByclgStaffId = (request, response) => {
    const clgStaffId = request.body.clgStaffId;
    const payload = {
        notification: {
            title:request.body.title,
            body: request.body.body
        }
    };
    firebaseToken.sendNotificationclgStaffId(clgStaffId, payload, (err, data) => {
        if (err) {
            return response.status(500).json({ "status": err });
        }
        return response.status(200).json({ "status": "success", "data": data });
    });
};


exports.viewTokens = (request, response) => {
    firebaseToken.viewTokens((err, data) => {
        if (err) {
            return response.status(500).json({ "status": err });
        }
        return response.status(200).json({ "status": "success", "data": data });
    });
};