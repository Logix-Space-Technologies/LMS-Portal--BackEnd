const jwt = require("jsonwebtoken");
const College = require("../models/college.model");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = function (req, file, cb) {
    const allowedExtensions = /\.(jpg|jpeg|png|webp|heif)$/;

    if (allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
        return cb(null, true);
    } else {
        return cb('Only JPG,JPEG,PNG,WEBP,HEIF files are allowed!', false);
    }
};


const upload = multer({ storage: storage }).single('collegeImage');

exports.collegeCreate = (request, response) => {
    const { collegeName, collegeAddress, website, email, collegePhNo, collegeMobileNumber} = request.body;
    console.log(request.body);
    if (!collegeName || collegeName.trim() === "") {
        return response.json({ "status": "College Name cannot be empty" });
    }    
    if (!collegeAddress || collegeAddress.trim() === "") {
        return response.json({ "status": "College Address cannot be empty" });
    }
    if (!website || !/^www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(website)) {
        return response.json({ "status": "Website must be in the format www.example.com" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return response.json({ "status": "Invalid Email" });
    }
    if (!collegePhNo || !/^\d{2,4}-\d{6,8}$/.test(collegePhNo)) {
        return response.json({ "status": "Invalid Phone Number" });
    }
    if (!collegeMobileNumber || !/^\+91[6-9][0-9]{9}$/.test(collegeMobileNumber)) {
        return response.json({ "status": "Invalid Mobile Number" });
    }

    const collegeImage = request.file ? request.file.filename : null;

    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading image:", err);
            return response.json({ "status": "Error uploading image" });
        }

        const college = new College({
            collegeName: request.body.collegeName,
            collegeAddress: request.body.collegeAddress,
            website: request.body.website,
            email: request.body.email,
            collegePhNo: request.body.collegePhNo,
            collegeMobileNumber: request.body.collegeMobileNumber,
            collegeImage: collegeImage
        });

        const collegeToken = request.body.token;

        if (college.collegeName !== "" && college.collegeName !== null) {
            jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
                if (decoded) {
                    College.create(college, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            return response.json({ "status": "success", "data": data });
                        }
                    });
                } else {
                    return response.json({ "status": "Unauthorized User!!" });
                }
            });
        } else {
            return response.json({ "status": "Content cannot be empty." });
        }
    });
};

exports.viewCollege = (request, response) => {
    const collegeToken = request.body.token
    College.getAll((err, data) => {
        if (err) {
            console.log(err)
            response.json({ "status": err })
        }
        jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
            if (decoded) {
                response.json(data)
            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        })

    })
}
