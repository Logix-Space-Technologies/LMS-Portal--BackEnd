const path = require('path');


function isEmpty(value) {
    return {
        isValid: (value === null || value === ""),
        message: "Field cannot be empty."
    };
}

function isValidGitLink(gitLink) {
    return {
        isValid: /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/i.test(gitLink),
        message: "Invalid Git Link"
    };
}



function isValidPhoneNumber(phoneNumber) {
    if (phoneNumber === null || phoneNumber === "") {
        return {
            isValid: true,
        };
    }
    return {
        isValid: /^(\(?\d{2,4}\)?[\s-]?)?\d{6,8}$/.test(phoneNumber),
        message: "Invalid Phone Number"
    };
}


function isValidImageWith1mbConstratint(file) {
    // Accept only JPG and JPEG files
    const allowedExtensions = /\.(jpg|jpeg|png|webp|heif)$/;

    // Check file extension
    const extensionIsValid = allowedExtensions.test(path.extname(file.filename.replace(/[^\w\-.]/g, '')).toLowerCase());

    // Check file size (max 1 MB)
    const maxFileSize = 2 * 1024 * 1024; // 1 MB in bytes
    const sizeIsValid = file.size <= maxFileSize;

    if (!extensionIsValid && !sizeIsValid) {
        return {
            isValid: false,
            message: 'Invalid image format and size exceeds the limit of 2 MB.'
        };
    } else if (!extensionIsValid) {
        return {
            isValid: false,
            message: 'Invalid image format. Only JPG, JPEG, PNG, WEBP and HEIF files are allowed.'
        };
    } else if (!sizeIsValid) {
        return {
            isValid: false,
            message: 'Image size exceeds the limit of 2 MB.'
        };
    }

    return {
        isValid: true,
        message: 'Image is valid'
    };
}


function isValidMobileNumber(mobileNumber) {
    // Check if the number is in the format +91XXYYYYYYYY or XXYYYYYYYY with the first digit after +91 greater than 5
    return {
        isValid: /^\+91[6-9]\d{9}$|^\+91\s?[6-9]\d{9}$|^[6-9]\d{9}$/.test(mobileNumber),
        message: "Invalid Mobile Number"
    };
}

function isValidAmount(amount) {
    console.log(amount)
    return {
        isValid: amount > 0,
        message: "Value must be greater than zero"
    };
}


function isValidAddress(address) {
    return {
        isValid: !address || address.length <= 2000,
        message: "Address cannot be empty and should not exceed 100 characters"
    };
}

function isValidWebsite(website) {
    if (website === null || website === "") {
        return {
            isValid: false,
            message: "Website cannot be null or empty"
        };
    }

    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*$/;
    const isValid = regex.test(website);

    return {
        isValid: isValid,
        message: isValid ? "" : "Website must be in a valid format (e.g., www.example.com, http://example.com)"
    };
}



function isValidEmail(email) {
    return {
        isValid: /^[a-z0-9._!#$%&'*+/=?^_`{|}~-]+@[a-z]+(\.[a-z]+)+$/.test(email),
        message: "Email cannot be empty or Invalid Email! "
    };
}

function isValidPassword(password) {
    return {
        isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(password),
        message: "Password must include at least 8 characters and cannot exceed 12 characters, one uppercase letter, one lowercase letter, numbers and special characters"
    };
}

function isValidName(name) {
    return {
        isValid: /^[a-zA-Z\s]*$/.test(name),
        message: "Name must contain only alphabets"
    };
}



function isValidDate(date) {
    return {
        isValid: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(date),
        message: "Date must be in the format YYYY-MM-DD"
    };
}

function isDateGreaterThanToday(date) {
    const inputDate = new Date(date);
    const currentDate = new Date();

    return {
        isValid: inputDate > currentDate,
        message: "Select a date greater than today."
    };
}

function isValidTime(time) {
    return {
        isValid: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time),
        message: "Time must be in the 24-hour format HH:MM"
    };
}


function isValidAadharNumber(aadharNumber) {
    return {
        isValid: /^\d{12}$/.test(aadharNumber),
        message: "Aadhar Number cannot be empty and must be of 12 digits"
    };
}

function isValidFile(file) {
    // Accept only PDF and DOCX files
    const allowedExtensions = /\.(pdf|docx)$/;

    // Check file extension
    const extensionIsValid = allowedExtensions.test(path.extname(file.filename.replace(/[^\w\-.]/g, '')).toLowerCase());
    console.log(file.filename)
    // Check file size (max 1 MB)
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
    const sizeIsValid = file.size <= maxFileSize;

    if (!extensionIsValid && !sizeIsValid) {
        return {
            isValid: false,
            message: 'Invalid file format and size exceeds the limit of 1 MB.'
        };
    } else if (!extensionIsValid) {
        return {
            isValid: false,
            message: 'Invalid file format. Only PDF and DOCX files are allowed.'
        };
    } else if (!sizeIsValid) {
        return {
            isValid: false,
            message: 'Image size exceeds the limit of 1 MB.'
        };
    }
}

function isDate1GreaterThanDate2(date1, date2) {
    // Add one year to inputDate1
    const oneYearLater = new Date(date1);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    return {
        isValid: date2 >= oneYearLater,
        message: "Select a date greater than or equal to one year after the previous date."
    };

}

function isValidAadharNumberUpdate(aadharNumber) {
    if (aadharNumber === null || aadharNumber === "") {
        return {
            isValid: true,
        };
    }
    return {
        isValid: /^\d{12}$/.test(aadharNumber),
        message: "Aadhar Number must be 12 digits"
    };
}

function acceptOnlyCapitalLetters(value) {
    return {
        isValid: /^[A-Z]*$/.test(value),
        message: "Invalid Code. It must contain only CAPITAL letters."
    };
}

function isLaterDate(selectedDate, previousDate) {
    return {
        isValid: selectedDate > previousDate,
        message: "Select a date greater than the previous date."
    };
}



module.exports = {
    isEmpty,
    isValidPhoneNumber,
    isValidMobileNumber,
    isValidAddress,
    isValidWebsite,
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidDate,
    isValidTime,
    isValidImageWith1mbConstratint,
    isValidAadharNumber,
    isValidAmount,
    isDateGreaterThanToday,
    isValidFile,
    isDate1GreaterThanDate2,
    isValidAadharNumberUpdate,
    isValidGitLink,
    acceptOnlyCapitalLetters,
    isLaterDate
};