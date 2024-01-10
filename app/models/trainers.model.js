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

module.exports = Trainers;