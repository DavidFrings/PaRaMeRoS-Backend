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
const multer         = require("multer");
const { red }        = require("../utilities");
const { green }      = require("../utilities");
const { yellow }     = require("../utilities");
const { token }      = require("../models/user");

//Time
moment.defaultFormat = "[[]DD[/]MM[/]YYYY HH[:]mm[:]ss[]]";

router.post("/", (req, res) => {
    //console.log(yellow, moment().format() + "Image is being uploading!")
    const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, "./images");
        },
        filename: (req, res ,cb) => {
            cb(null, req.body.name);
        }
    });
    const upload = multer({storage: storage}).single("file");

    if (req.query.key === token) {
        try {
            upload(req, res, err => {
                if (!err) {
                    console.log(green, moment().format() + "Image has been uploaded!")
                    res.status(200).json("Image has been uploaded!");
                } else {
                    console.log(red, moment().format() + err);
                    res.status(400).json("error");
                }
            });
        } catch (err) {
            console.log(red, moment().format() + err);
        }
    } else {
        console.log(red, moment().format() + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
        res.status(400).json("Your Ip has been saved!");
    }
});

module.exports = router;