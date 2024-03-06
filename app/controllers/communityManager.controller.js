const Validator = require("../config/data.validate");
const jwt = require("jsonwebtoken");
const CommunityManager = require("../models/communityManager.model");

exports.createCommunityManager = (request, response) => {
    const studentId= request.body.studentId;
    const batchId = request.body.batchId;
    const communityManagerToken = request.headers.token;
    const key = request.headers.key;

    // Checking token validation
    jwt.verify(communityManagerToken, key, (tokenError, decoded) => {
        if (tokenError) {
            return response.json({ "status": "Unauthorized User !!!" });
        }

        const newCommunityManager = {
            studentId: studentId,
            batchId: batchId           
        };

        CommunityManager.create(newCommunityManager, (createError, data) => {
            if (createError) {
                response.json({ "status": createError });
            } else {
                response.json({ "status": "success", "data": data });
            }
        });
    });
};


exports.deleteCommunityManager = (request, response) => {
    const id = request.body.id; // Assuming the managerId is passed in the request body
    const communityManagerToken = request.headers.token;
    const key = request.headers.key;

    // Checking token validation
    jwt.verify(communityManagerToken, key, (tokenError, decoded) => {
        if (tokenError) {
            return response.json({ "status": "Unauthorized User !!!" });
        }
        CommunityManager.delete(id, (deleteError, data) => {
            if (deleteError) {
                return response.json({ "status": deleteError });
            } else {
                return response.json({ "status": "success" });
            }
        });
    });
};
