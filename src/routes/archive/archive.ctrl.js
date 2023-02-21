/* Archive API file */
const danger = require("../../schema/DangerSchema.js");
const { Router } = require("express");
const router = Router();

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

exports.get_danger = async (req,res) => {
    try {
        const dangers = await danger.find().sort({"danger_score": -1});
        res.send({ data: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};
