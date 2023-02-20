/* Test API file */
const danger = require("../../schema/DangerSchema.js");
const user = require("../../schema/UserSchema.js")
const { Router } = require("express");
const router = Router();

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

exports.get_root = async (req,res) => {
    try {
        const dangers = await danger.find();
        res.send({ dangers: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.get_user_dangers = async (req,res) => {
    try {
        // console.log(req.params.user_id)
        const dangers = await danger.find({ user_id: Types.ObjectId(req.params.user_id)});
        res.send({ dangers: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};