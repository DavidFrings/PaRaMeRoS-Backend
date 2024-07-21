//PaRaMeRoS Backend
//Copyright (C) 2024  David Frings

//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU Affero General Public License as published
//by the Free Software Foundation, either version 3 of the License, or
//any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//Affero General Public License for more details.

//You should have received a copy of the GNU Affero General Public License
//along with this program.  If not, see <https://www.gnu.org/licenses/>.

//You can contact me by writing a mail to david.frings.development@gmail.com


const express        = require("express");
const router         = express.Router();
const moment         = require("moment");
const { red }        = require("../utilities");
const { green }      = require("../utilities");
const { yellow }     = require("../utilities");
const { token }      = require("../models/user");
const teamDB         = require("../models/team");

//Time
moment.defaultFormat = "[[]DD[/]MM[/]YYYY HH[:]mm[:]ss[]]";

//Create
router.post("/:name", async (req, res) => {
    const newTeam = new teamDB(req.body);

    if (req.query.key === token) {
        try {
            const savedTeam = await newTeam.save();

            console.log(green, moment().format() + req.params.name + " has created a new team member: " + req.body.title);
            res.status(200).json(savedTeam);
        } catch (err) {
            console.log(red, moment().format() + err);
            res.status(400).json("error");
        }
    } else {
        console.log(red, moment().format() + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
        res.status(400).json("Your Ip has been saved!");
    }
});

//Update - OLD
//router.put("/:name", async (req, res) => {
//    if (req.query.key === token) {
//        try {
//            const team = await teamDB.findById({ _id: req.query.id });
//            const updatedTeam = await teamDB.findByIdAndUpdate(req.query.id, { $set: req.body }, { new: true });
//
//            if (team.title === req.body.title) {
//                console.log(yellow, moment().format() + req.params.name + " has updated a user: " + team.title + " (desc: " + team.desc + " to " + req.body.desc + ")");
//            } else if (team.desc === req.body.desc) {
//                console.log(yellow, moment().format() + req.params.name + " has updated a user: " + team.title + " to " + req.body.title);
//            } else {
//                console.log(yellow, moment().format() + req.params.name + " has updated a user: " + team.title + " to " + req.body.title + " (desc: " + team.desc + " to " + req.body.desc + ")");
//            }
//            res.status(200).json(updatedTeam);
//        } catch (err) {
//            console.log(red, moment().format() + err);
//            res.status(400).json("error");
//        }
//    } else {
//        console.log(red, moment().format() + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
//        res.status(400).json("Your Ip has been saved!");
//    }
//});

//Delete - OLD
//router.delete("/:name", async (req, res) => {
//    if (req.query.key === token) {
//        try {
//            const team = await teamDB.findById({ _id: req.query.id });
//            await team.deleteOne();
//
//            console.log(red, moment().format() + req.params.name + " has deleted a user: " + team.title);
//            res.status(200).json("User has been deleted");
//        } catch (err) {
//            console.log(red, moment().format() + err);
//            res.status(400).json("error");
//        }
//    } else {
//        console.log(red, moment().format() + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
//        res.status(400).json("Your Ip has been saved!");
//    }
//});

//Get - OLD
//router.get("/:id", async  (req, res) => {
//    try {
//        const team = await teamDB.findById(req.params.id);
//        res.status(200).json(team)
//    } catch (err) {
//        res.status(400).json("error");
//    }
//});

//Get All
router.get("/", async (req, res) => {
    try {
        const team = await teamDB.find();
        res.status(200).json(team)
    } catch (err) {
        res.status(400).json("error");
    }
});

module.exports = router;