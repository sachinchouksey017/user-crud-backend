const user = require('../model/user.model');
const bcrypt = require('bcrypt');
const { use } = require('../router/router');

function hashGenerate(password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            callback(err);
        } else {
            callback(null, hash)
        }
    });
}
module.exports.create = (object, callback) => {
    var response = {
        "success": true,
        "message": "",
        "data": "",
        "status": 200
    }
    user.find({ email: object.email }, (err, data) => {
        if (err) {
            console.log(err);
            response.success = false
            response.message = 'server err',
                res.status = 500
            callback(response);
        } else {

            if (data.length > 0) {
                response.success = false
                response.message = 'Email already Exists',
                    response.status = 409
                callback(response);
            } else {
                // hash is not used because in update it is showing in encrypt form
                hashGenerate(object.password, (err, data) => {
                    if (err) {
                        response.success = false
                        response.message = 'Invalid password  !!try again';
                        response.status = 500
                        callback(response);

                    } else {
                        const newUser = new user({
                            'firstName': object.firstName,
                            'lastName': object.lastName,
                            'email': object.email,
                            'password': object.password,
                            "profileUrl": object.profileUrl,
                            "mobileNumber": object.mobileNumber
                        });
                        newUser.save((err, data) => {
                            console.log(data);

                            if (err) {
                                response.success = false;
                                response.message = "Error while save"
                                response.status = 500
                                response.data = err
                                callback(response);
                            } else {
                                var obj = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    id: data._id,
                                }
                                response.message = 'User created successFully';
                                response.data = obj;
                                callback(null, response)
                            }
                        })
                    }
                })
            }
        }
    })
}
module.exports.get = () => {
    var response = {
        "success": true,
        "message": "",
        "data": "",
        "status": 200
    }
    return new Promise((resolve, reject) => {
        user.find({}, (err, data) => {
            if (err) {
                response.success = false;
                response.message = 'try again later',
                    response.status = 500
                reject(response)
            } else {
                response.message = "user retrived successfully",
                    response.status = 200,
                    response.data = data;
                resolve(response)
            }
        })

    })
}
module.exports.delete = (obj, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }
    user.findByIdAndRemove({ _id: obj.userId }, (err, data) => {
        console.log('after find and remove', err, '    ', data);
        if (err) {
            response.message = "user does not Exist";
            callback(response);
        } else if (data != null) {
            response.message = "user deleted successfully"
            response.success = true;
            response.status = 200
            callback(null, response)
        } else {
            response.message = "user does not Exist";
            response.status = 500
            callback(response)
        }
    })
}
module.exports.updateUser = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }
    var userModel = {
        ...req.firstName && { firstName: req.firstName },
        ...req.lastName && { lastName: req.lastName },
        ...req.email && { email: req.email },
        ...req.profileUrl && { profileUrl: req.profileUrl },
        ...req.password && { password: req.password },
        ...req.mobileNumber && { mobileNumber: req.mobileNumber },
        ...req.profileUrl && { profileUrl: req.profileUrl }

    }
    console.log('user is ', userModel);
    user.findOneAndUpdate({ _id: req.userId },
        { $set: userModel }, (err, data) => {
            if (err) {
                response.message = "User already exist";
                response.err = err;
                response.status = 500
                callback(response);
            } else if (data != null) {
                console.log("data is", data);
                response.message = "user updated successfully"
                response.success = true;
                response.status = 200

                callback(null, response)
            } else {
                response.status = 500
                response.message = "user does not Exist";
                callback(response)
            }
        })
}