/* Result API file */
const danger = require("../../schema/DangerSchema.js");
const user = require("../../schema/UserSchema.js");
const road = require("../../schema/RoadSchema.js");

const { Router } = require("express");
const router = Router();

const PythonShell = require('python-shell');

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

exports.get_root = async (req,res) => {
    try {
        const dangers = await danger.find();
        res.send({ data: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.get_user_dangers = async (req,res) => {
    try {
        // console.log(req.params.user_id)
        const dangers = await danger.find({ user_id: Types.ObjectId(req.params.user_id)});
        res.send({ data: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.post_model = async (req,res) => {
    try {
        // run model
        await PythonShell.PythonShell.run('yolov5/inference.py', function(err, res) {
            if (err) throw err;
            console.log(res);
            console.log("finished")
        });

        const model_danger_num = 1;
        const model_garbage_num = 1;
        const model_pothole_num = 1;
        const model_animal_num = 1;

        // user update
        // const users = await user.updateMany({
        //     _id: req.body.user_id
        // }, {
        //     danger_num: (danger_num + model_danger_num),
        //     garbage_num: (garbage_num + model_garbage_num),
        //     pothole_num: (pothole_num + model_pothole_num),
        //     animal_num: (animal_num + model_animal_num)
        // })

        // // road update
        // const roads = await road.updateMany({
        //     _id: req.body.road_id
        // }, {
        //     danger_num: (danger_num + model_danger_num),
        //     garbage_num: (garbage_num + model_garbage_num),
        //     pothole_num: (pothole_num + model_pothole_num),
        //     animal_num: (animal_num + model_animal_num)
        // })

        // danger insert 만들기
        // for 
        // const dangers = await danger.create({
        //     category: 
        // })


        // const dangers = await danger.find({ user_id: Types.ObjectId(req.params.user_id)});
        res.send({ data: "success" });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};