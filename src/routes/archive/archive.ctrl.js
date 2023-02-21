/* Archive API file */
const road = require("../../schema/RoadSchema.js");
const { Router } = require("express");
const router = Router();

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

exports.get_road = async (req,res) => {
    try {
        const roads = await road.find();
        res.send({ data: {"road_name": roads.road_name, "road_score": roads.road_score} });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};