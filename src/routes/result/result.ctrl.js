/* Test API file */
const danger = require("../../schema/DangerSchema.js");
const { Router } = require("express");
const router = Router();

exports.get_root = async (req,res) => {
    try {
        const dangers = await danger.find({});
        res.send({ dangers: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};
