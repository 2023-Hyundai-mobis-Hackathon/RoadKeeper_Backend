/* Info API file */
const user = require("../../schema/UserSchema.js");
const road = require("../../schema/RoadSchema.js");
const pbv = require("../../schema/PBVSchema.js");
const { Router } = require("express");
const router = Router();

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

exports.get_user = async (req,res) => {
    try {
        const users = await user.find();
        console.log(users)
        // res.send({ data: {"user_name": users.user_name, "mileage": users.mileage, "danger_num": users.danger_num, "user_score": users.user_score} });
        res.send({data: users})
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.get_road = async (req,res) => {
    try {
        const roads = await road.find();
        // res.send({ data: {"road_name": roads.road_name, "danger_num": roads.danger_num, "complete_num": roads.complete_num, "road_score": roads.road_score} });
        res.send({data: roads});
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.get_pbv = async (req,res) => {
    try {
        const pbvs = await pbv.find();
        // res.send({ data: {"category": pbvs.category, "status": pbvs.status, "location": pbvs.location } });
        res.send({data: pbvs})
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};