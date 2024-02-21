const Validator = require("../config/data.validate");
const jwt = require("jsonwebtoken");
const CommunityManager = require("../models/communityManager.model");

exports.createCommunityManager = (request, response) => {
    const { batchId, studentId } = request.body;
    const communityManagerToken = request.headers.token;
    const key = request.headers.key;

    // Checking token validation
    jwt.verify(communityManagerToken, key, (tokenError, decoded) => {
        if (tokenError) {
            return response.json({ "status": "Unauthorized User !!! " });
        }

        // Validation
        const validationErrors = {};

        // Validation for batchId
        if (Validator.isEmpty(batchId).isValid) {
            validationErrors.batchId = Validator.isEmpty(batchId).message;
        }

        // Validation for studentId
        if (Validator.isEmpty(studentId).isValid) {
            validationErrors.studentId = Validator.isEmpty(studentId).message;
        }

        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return response.json({ "status": "Validation failed", "data": validationErrors });
        }

        const newCommunityManager = new CommunityManager({
            batchId: batchId,
            studentId: studentId
        });

        CommunityManager.create(newCommunityManager, (createError, data) => {
            if (createError) {
                response.json({ "status": createError });
            } else {
                response.json({ "status": "success", "data": data });
            }
        });
    });
};
