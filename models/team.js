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
//along with this program. If not, see <https://www.gnu.org/licenses/>.

//You can contact me by writing a mail to david.frings.development@gmail.com


const mongoose       = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        name:    {
            type:     String,
            required: true,
            unique:   true,
        },
        mail:     {
            type:     String,
            required: true,
            unique:   true,
        },
        tel:    {
            type:     String,
            required: false,
            unique:   true,
        },
        username: {
            type:     String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("teamDB", teamSchema);