const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const controller = require('../controllers/userController')
const fileUpload = require('../middleware/multer')
const router = express.Router()
fileUpload.upload
router.post('/user', [
    check('firstName').notEmpty().withMessage('firstName is required field')
        .isLength({ min: 3, max: 20 }).withMessage('firstName min length 3 and max length 20')
        .isAlpha().withMessage('firstName is not valid'),
    check('lastName').notEmpty().withMessage('lastName is required field')
        .isLength({ min: 3, max: 20 }).withMessage('lastName min length 3 and max length 20')
        .isAlpha().withMessage('lastName is not valid'),
    check('email').notEmpty().withMessage('email is required field')
        .isEmail().withMessage('email is not valid '),
    check('password').notEmpty().withMessage('password is required field')
        .isLength({ min: 3, max: 20 }).withMessage('password min length 3 and max length 20')

],
    controller.create)
router.post('/profile', fileUpload.upload.single('file'),controller.profile)
router.get('/user', controller.get)
router.delete('/user', controller.deleteUser)
router.post('/userUpdate', [
    check('email')
        .optional()
        .isEmail()
        .withMessage('email is not valid'),
    check('userId')
        .notEmpty()
        .withMessage('userId is required field')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('userId is not valid')
], controller.updateUser)

module.exports = router;