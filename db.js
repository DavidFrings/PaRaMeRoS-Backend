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
//

require("dotenv").config();
const env            = process.env;
const moment         = require("moment");
const mongoose       = require("mongoose");
const { red }        = require("./utilities");
const { green }      = require("./utilities");
const { yellow }     = require("./utilities");

//Time
moment.defaultFormat = "[[]DD[/]MM[/]YYYY HH[:]mm[:]ss[]]";

const db = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(env.DB, connectionParams);
        console.log(green, moment().format() + "Connected to the database successfully");
    } catch (err) {
        console.log(red, moment().format() + "Could not connect to the database!\n");
        console.log(red, moment().format() + err);
    }
};

module.exports = db