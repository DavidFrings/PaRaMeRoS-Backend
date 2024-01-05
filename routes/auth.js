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
const bcrypt         = require("bcrypt");
const { red }        = require("../utilities");
const { green }      = require("../utilities");
const { yellow }     = require("../utilities");
const { userDB }     = require("../models/user");
const { validate }   = require("../models/user");

//Time
moment.defaultFormat = "[[]DD[/]MM[/]YYYY HH[:]mm[:]ss[]]";

router.post("/", async (req, res) => {
    try {
        const { err } = validate(req.body);
        if (!err) {
            const user = await userDB.findOne({ name: req.body.name });
            if (user) {
                const name = user.name;

                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                if (validPassword) {
                    const token = user.generateAuthToken();

                    console.log(green, moment().format() + name + ' has logged in | IP: "' + req.socket.remoteAddress + '"');
                    res.status(200).json({ data: `${name}?key=${token}`, message: "Logged in successfully!" });
                } else {
                    console.log(red, moment().format() + name + ' entered the wrong Password! | IP: "' + req.socket.remoteAddress + '"');
                    return res.status(401).json({message: "Invalid name or password!"});
                }
            } else {
                return res.status(401).json({message: "Invalid name or password!"});
            }
        } else {
         return res.status(400).json({ message: err.details[0].message });
        }
    } catch (err) {
        console.log(red, moment().format(), err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;