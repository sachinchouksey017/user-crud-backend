const userService = require('../services/userService')
const { body, validationResult } = require('express-validator');
module.exports.create = (req, res) => {
    console.log("data in controller", req.body);
    console.log('file is ', req.file);
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.create({
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        mobileNumber: body.mobileNumber,
        profileUrl:body.profileUrl
    }, (err, data) => {
        if (err)
            return res.status(err.status).send(err)
        else
            return res.status(data.status).send(data)
    })
}
module.exports.updateUser = (req, res) => {
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.updateUser({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        profileUrl: body.profileUrl,
        password: body.password,
        userId: body.userId,
        mobileNumber: body.mobileNumber
    }, (err, data) => {
        if (err)
            return res.status(err.status).send(err)
        else
            return res.status(data.status).send(data)
    })

}
module.exports.deleteUser = (req, res) => {
    console.log("param is ", req.params, "      ", req.query);
    const userId = req.query.userId;
    const errors = validationResult(req);
    if (!userId) {
        return res.status(400).send({
            mess: "userId is required field in query"
        });
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.delete({
        userId: userId
    }, (err, data) => {
        if (err)
            return res.status(err.status).send(err)
        else
            return res.status(data.status).send(data)
    })
}
module.exports.get = (req, res) => {
    console.log('in get');
    userService.get().then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}
module.exports.profile = (req, res) => {
    console.log('in get', req.file);
    var imageUrl = 'http://localhost:3000/' + req.file.filename
    return res.status(200).send({ imageUrl: imageUrl })
}
