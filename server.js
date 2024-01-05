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
const app            = express();
const router         = express.Router();
const moment         = require("moment");
const cors           = require("cors");
const path           = require("path");
const connection     = require("./db");
const { red }        = require("./utilities");
const { green }      = require("./utilities");
const { yellow }     = require("./utilities");
const authRoute      = require("./routes/auth");
const eventRoute      = require("./routes/events");
const hobbiesRoute   = require("./routes/hobbies");
const terminalRoute  = require("./routes/terminal");
const uploadRoute    = require("./routes/upload");

//Time
moment.defaultFormat = "[[]DD[/]MM[/]YYYY HH[:]mm[:]ss[]]";

//Database
connection();

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users",    router);
app.use("/api/auth",     authRoute);
app.use("/api/events",    eventRoute);
app.use("/api/hobbies",  hobbiesRoute);
app.use("/api/upload",   uploadRoute);
app.use("/api/terminal", terminalRoute);
app.use("/api/images",   express.static(path.join(__dirname, "./images")));

//Redirect
app.get("/*", (req, res) => {
   res.redirect(env.FRONTEND);
});

//Start
app.listen(env.PORT, () => console.log(yellow, moment().format() + "Listening on port " + env.PORT));