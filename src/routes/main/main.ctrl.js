/* Main API file */
const danger = require("../../schema/DangerSchema.js");
const pbv = require("../../schema/PBVSchema.js")
const { Router } = require("express");
const router = Router();

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

exports.get_report = async (req,res) => {
    try {
        const dangers = await danger.find();
        var entire_num = dangers.length;

        const dangers_quick = await danger.find({ quick: true });
        var quick_num = dangers_quick.length;

        const dangers_complete = await danger.find({ complete: true });
        var complete_num = dangers_complete.length;

        res.send({ data: { "entire_num": entire_num, "quick_num": quick_num, "complete_num": complete_num } });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.get_pbv = async (req,res) => {
    try {
        // console.log(req.params.user_id)
        const pbvs = await pbv.find();
        var entire_num = pbvs.length;

        const pbvs_on = await pbv.find({ status: 3});
        var on_num = pbvs_on.length;

        const pbvs_fix = await pbv.find({ status: 4});
        var fix_num = pbvs_fix.length;

        res.send({ data: {"entire_num": entire_num, "on_num": on_num, "fix_num": fix_num} });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};