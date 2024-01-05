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
const mongoose       = require("mongoose");
const jwt            = require("jsonwebtoken");
const Joi            = require("joi");

const userSchema = new mongoose.Schema(
    {
        name:     {
            type:     String,
            required: true
        },
        password: {
            type:     String,
            required: true
        }
});

const token = jwt.sign({_id: this._id}, env.JWT_SECRET, {
   expiresIn: env.JWT_EXPIRE
});

userSchema.methods.generateAuthToken = function () {
    return token;
}

const userDB = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        name:     Joi.string().required().label("Name"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { userDB, token, validate }