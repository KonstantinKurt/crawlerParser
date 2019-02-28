const User = require('../model/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Profile = require('../model/profile.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

const sendEmail = require('../libs/sendEmail.js');

module.exports = {
    registration: function(req, res) {
        let user = new User({ _id: new mongoose.Types.ObjectId(), password: req.body.password, email: req.body.email, name: req.body.name });
        if (user) {
            user.save(function(err) {
                err && res.status(404).json({ message: "There was a problem with saving user to DB", data: { ...err.errors } });
                res.json({ status: "success", message: "Unverified user added successfully!!! Letter sended", data: null });
            });
            let link = `http://${req.get('host')}/verification?id=${user.email}`;
            let options = sendEmail.getMailoptions(user.email, user.name, `Please verificate your Email`, link);
            sendEmail.transporter.sendMail(options, function(err, info) {
                err && console.log(err);
                console.log(info);
            });
        }
    },
    verification: function(req, res) {
        User.updateOne({ email: req.query.id }, { isVerified: true }, function(err, user) {
            err && res.status(404).json({ message: "There was a problem to find user to DB", data: { ...err.errors } });
            res.json({ message: "User email verified succesfully!", data: null });
        });
    },
    authentication: function(req, res) {
        User.findOne({ email: req.body.email, isVerified: true }, function(err, user) {
            err && res.status(404).json({ message: "There was a problem to find user to DB", data: { ...err.errors } });
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                Profile.findOne({ email: req.body.email }, function(err, profile) {
                    err && res.status(404).json({ message: "There was a problem with finding profile in DB", data: { ...err.errors } });
                    if (!profile) {
                        let newProfile = new Profile({ _id: user._id, email: user.email, name: user.name, password: user.password });
                        newProfile.save(function(err) {
                            err && res.status(404).json({ message: "There was a problem with saving profile in DB", data: { ...err.errors } });
                            const token = jwt.sign({ newProfile }, config.secret, { expiresIn: '72h' });
                            console.log(newProfile);
                            res.json({ token });
                        });
                    } else {
                        console.log(profile);
                        const token = jwt.sign({ profile }, config.secret, { expiresIn: '72h' });
                        res.json({ token });
                        console.log(profile);
                    }
                });
            } else {
                return res.status(404).json({ message: "User not found or users email isn't verificated", data: null });
            }
        });
    },
};