const db = require('../models/db');
const { response } = require('express')

const Trainers = function (trainers) {
    this.trainerName = trainers.trainerName;
    this.about = trainers.about;
    this.email = trainers.email;
    this.password = trainers.password;
    this.phoneNumber = trainers.phoneNumber;
    this.profilePicture = trainers.profilePicture;
}