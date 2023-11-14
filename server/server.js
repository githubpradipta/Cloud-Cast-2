const express = require("express");
const cors = require('cors')
const Joi = require('@hapi/joi');
const createError = require('http-errors')
require('./Model/connection')
const DB = require('./Model/model');
const { authLoginSchema, authRegisterSchema } = require('./validation/Joi')

const app = express();

const PORT = 8000
app.listen(PORT, () => { console.log(`server start at port ${PORT}`) })
app.use(express.json());
app.use(cors())

app.post('/auth/register', async (req, res, next) => {
    const data = req.body;
    try {
        const validate = await authRegisterSchema.validateAsync(data);
        const check = await DB.findOne({ username: data.username });
        if (check) {
            const Conflict = createError.Conflict('Username not available, please choose another one');
            return next(Conflict)
        }
        if (data.password !== data.cpassword) {
           const passNotMatched =  createError.NotAcceptable('password and confirm password should be matched');
           return next(passNotMatched)
        }
        const DBdata = await DB.create(data);
        res.json({
            message: 'Registered'
        })
    }
    catch (err) {
        next(createError.NotAcceptable(err.message));
    }
})

app.post('/auth/login', async (req, res, next) => {
    const data = req.body;
    try {
        const validation = await authLoginSchema.validateAsync(data);

        const Userdata = await DB.findOne({ username: data.username })
        if (Userdata) {
            if (Userdata.password === data.password) {
                return res.json({
                    message: 'logged in'
                })
            }
            else {
                return next(createError.NotAcceptable('username / password is wrong'))
            }
        }
        else {
            return next(createError.NotAcceptable('username / password is wrong'))
        }
    }
    catch (err) {
        next(createError.NotAcceptable(err.message))
    }

})

app.use('*', (req, res) => {
    res.json({
        message: 'API Not found'
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})