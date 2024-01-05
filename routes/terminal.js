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


                       require("dotenv").config();
const env            = process.env;
const express        = require("express");
const router         = express.Router();
const moment         = require("moment");
const fs             = require("fs");
const { red }        = require("../utilities");
const { green }      = require("../utilities");
const { yellow }     = require("../utilities");
const { token }      = require("../models/user");

//Time
moment.defaultFormat = "[[]DD[/]MM[/]YYYY HH[:]mm[:]ss[]]";

//Load
router.post("/load/:name", (req, res) => {
    if (req.query.key === token) {
        fs.readdir(env.PYTHON_DIR, (err, files) => {
            if (!err) {
                fs.writeFile(env.PYTHON_DIR + env.PYTHON_USER, req.params.name, (err) =>{
                    if (err) {
                        console.log(red, moment().format() + err);
                        res.status(400).json({ directory: "error" });
                    }
                });
                fs.writeFile(env.PYTHON_DIR + env.PYTHON_OUTPUT, "pwd", (err) =>{
                    if (err) {
                        console.log(red, moment().format() + err);
                        res.status(400).json({ directory: "error" });
                    }
                });
                fs.writeFile(env.PYTHON_DIR + env.PYTHON_START, "Start!", (err) =>{
                    if (err) {
                        console.log(red, moment().format() + err);
                        res.status(400).json({ directory: "error" });
                    }
                });

                function loadDIR() {
                    setTimeout(() => {
                        fs.readFile(env.PYTHON_DIR + env.PYTHON_USER, "utf8", (err, data) => {
                            if (!err) {
                                if (req.params.name === data) {
                                    fs.readFile(env.PYTHON_DIR + env.PYTHON_START, "utf8", (err, data) => {
                                        if (!err) {
                                            switch (data) {
                                                case ("Done!"):
                                                    fs.writeFile(env.PYTHON_DIR + env.PYTHON_START, "", (err) => {
                                                        if (err) {
                                                            console.log(red, moment().format() + err);
                                                            res.status(400).json({text: "error", directory: "error"});
                                                        }
                                                    });

                                                    fs.readFile(env.PYTHON_DIR + env.PYTHON_DIR_FILE, "utf8", (err, data) => {
                                                        if (err) {
                                                            console.log(red, moment().format() + err);
                                                            res.status(400).json({text: "error", directory: "error"});
                                                        } else {
                                                            console.log(green, moment().format() + req.params.name + " has the directory loaded successfully");
                                                            res.status(200).json({directory: `<span class="span">${req.params.name}@PaRaMeRoS.net:</span><span class="color2">${data}</span><span class="span">$</span>`});
                                                        }
                                                    });
                                                    break;
                                                case ("Start!"):
                                                    loadDIR();
                                                    break;
                                                default:
                                                    console.log(red, moment().format() + "Error: " + env.PYTHON_START + " = " + data);
                                                    res.status(400).json({text: "error", directory: "error"});
                                            }
                                        } else {
                                            console.log(red, moment().format() + err);
                                            res.status(400).json({directory: "error"});
                                        }
                                    });
                                } else {
                                    console.log(red, moment().format() + "Two users used the terminal at the same time!");
                                    res.status(400).json({
                                        text: "Ein anderer User nutzt das Terminal gerade auch!",
                                        directory: "error"
                                    });
                                }
                            } else {
                                console.log(red, moment().format() + err);
                                res.status(400).json({directory: "error"});
                            }
                        });
                    }, 500);
                }
                loadDIR();
            } else {
                console.log(red, moment().format() + err);
                res.status(400).json({ directory: "error" })
            }
        });
    } else {
        console.log(red, moment().format() + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
        res.status(400).json("Your Ip has been saved!");
    }
});

//Commands
router.post("/:name", (req, res) => {
    if (req.query.key === token) {
        fs.readdir(env.PYTHON_DIR, (err, files) => {
            if (!err) {
                if (req.body.command){
                    fs.writeFile(env.PYTHON_DIR + env.PYTHON_USER, req.params.name, (err) =>{
                        if (err) {
                            console.log(red, moment().format() + err);
                            res.status(400).json({ text: "error", directory: "error" });
                        }
                    });
                    fs.writeFile(env.PYTHON_DIR + env.PYTHON_OUTPUT, req.body.command, (err) =>{
                        if (err) {
                            console.log(red, moment().format() + err);
                            res.status(400).json({ text: "error", directory: "error" });
                        }
                    });
                    fs.writeFile(env.PYTHON_DIR + env.PYTHON_START, "Start!", (err) =>{
                        if (err) {
                            console.log(red, moment().format() + err);
                            res.status(400).json({ text: "error", directory: "error" });
                        } else {
                            console.log(yellow, moment().format() + req.params.name + " has started processing the input: " + req.body.command);
                        }
                    });

                    function check() {
                        setTimeout(() => {
                            fs.readFile(env.PYTHON_DIR + env.PYTHON_USER, "utf8", (err, data) => {
                                if (!err) {
                                    if (req.params.name === data) {
                                        fs.readFile(env.PYTHON_DIR + env.PYTHON_START, "utf8", (err, data) => {
                                            if (!err) {
                                                switch (data) {
                                                    case ("Done!"):
                                                        fs.writeFile(env.PYTHON_DIR + env.PYTHON_START, "", (err) =>{
                                                            if (err) {
                                                                console.log(red, moment().format() + err);
                                                                res.status(400).json({ text: "error", directory: "error" });
                                                            }
                                                        });

                                                        fs.readFile(env.PYTHON_DIR + env.PYTHON_INPUT, "utf8", (err, data) => {
                                                            if (err) {
                                                                console.log(red, moment().format() + err);
                                                                res.status(400).json({ text: "error", directory: "error" });
                                                            } else {
                                                                let input = data;

                                                                fs.readFile(env.PYTHON_DIR + env.PYTHON_DIR_FILE, "utf8", (err, data) => {
                                                                    if (err) {
                                                                        console.log(red, moment().format() + err);
                                                                        res.status(400).json({ text: "error", directory: "error" });
                                                                    } else {
                                                                        console.log(green, moment().format() + req.params.name + " has successfully completed processing the input: \n" + input);
                                                                        res.status(200).json({ text: input, directory: `<span class="span">${req.params.name}@PaRaMeRoS.net:</span><span class="color2">${data}</span><span class="span">$</span>` });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                        break;
                                                    case ("Start!"):
                                                        check();
                                                        break;
                                                    default:
                                                        console.log(red, moment().format() + "Error: " + env.PYTHON_START + " = " + data);
                                                        res.status(400).json({ text: "error", directory: "error" });
                                                        break;
                                                }
                                            } else {
                                                console.log(red, moment().format() + err);
                                                res.status(400).json({ text: "error", directory: "error" });
                                            }
                                        });
                                    } else {
                                        console.log(red, moment().format() + "Two users used the terminal at the same time!");
                                        res.status(400).json({ text: "Ein anderer User nutzt das Terminal gerade auch!", directory: "error" });
                                    }
                                } else {
                                    console.log(red, moment().format() + err);
                                    res.status(400).json({ text: "error", directory: "error" });
                                }
                            });
                        }, 500);
                    }
                    check();
                } else {
                    return res.status(400).json({ text: "error", directory: "error" });
                }
            } else {
                console.log(red, moment().format() + err);
                res.status(400).json({ text: "error", directory: "error" })
            }
        });
    } else {
        console.log(red, moment().format() + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
        res.status(400).json("Your Ip has been saved!");
    }
});

module.exports = router;