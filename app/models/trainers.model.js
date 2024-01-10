const db = require('../models/db');
const { response } = require('express');

const Trainers = function (trainers) {
    this.trainerName = trainers.trainerName;
    this.about = trainers.about;
    this.email = trainers.email;
    this.password = trainers.password;
    this.phoneNumber = trainers.phoneNumber;
    this.profilePicture = trainers.profilePicture;
};

Trainers.create = (newTrainer, result) => {
    db.query("SELECT * FROM trainersinfo WHERE email=? AND deleteStatus = 0 AND isActive = 1", newTrainer.email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length > 0) {
            console.log("Email already exists");
            result("Email already exists", null);
            return;
        }
        db.query("INSERT INTO trainersinfo SET ?", newTrainer, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created trainer: ", { id: res.insertId, ...newTrainer });
            result(null, { id: res.insertId, ...newTrainer });
        });
    });
};

Trainers.viewTrainers = (result) => {
    const query = "SELECT id, trainerName, profilePicture, about, phoneNumber, email,addedDate, updatedDate FROM trainersinfo WHERE isActive = 1 AND deleteStatus = 0";

    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("trainers: ", res);
        result(null, res);
    });
};



Trainers.searchTrainer = (search, result) => {
    const searchTerm = '%' + search + '%'
    db.query("SELECT id, trainerName, profilePicture, phoneNumber, email, about,addedDate,updatedDate FROM trainersinfo WHERE deleteStatus = 0 AND isActive = 1 AND (trainerName LIKE ? OR email LIKE ? OR phoneNumber LIKE ?)",
    [searchTerm, searchTerm, searchTerm],
    (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            result
        } else {
            console.log("Trainer Details : ", res)
            result(null, res)
        }
    })
}


module.exports = Trainers;