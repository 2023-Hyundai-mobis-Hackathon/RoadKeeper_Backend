/* Result API file */
const danger = require("../../schema/DangerSchema.js");
const user = require("../../schema/UserSchema.js");
const road = require("../../schema/RoadSchema.js");

const { Router } = require("express");
const router = Router();

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
        const runModel = async () => {
            const res = await new Promise((resolve, reject) => {
                const spawn = require('child_process').spawn;

                const result = spawn('python', ['yolov5/inference.py']);

                result.stdout.on('data', function(data) {
                    console.log(data.toString());
                    return resolve(data);
                });

                result.stderr.on('data', function(data) {
                    console.log(data.toString());
                    return reject(data);
                });

            })
            return JSON.parse(res.toString());
        };

        const data = await runModel();
        console.log("data: " + data);

        const model_danger_num = data.danger_num;
        const model_garbage_num = data.garbage_num;
        const model_pothole_num = data.pothole_num;
        const model_animal_num = data.animal_num;

        // user update
        const users = await user.updateMany({
            _id: Types.ObjectId(req.body.user_id)
        }, { "$inc": {
            danger_num: model_danger_num,
            garbage_num: model_garbage_num,
            pothole_num: model_pothole_num,
            animal_num: model_animal_num
        }})

        // road update
        const roads = await road.updateMany({
            _id: Types.ObjectId(req.body.road_id)
        }, { "$inc": {
            danger_num: model_danger_num,
            garbage_num: model_garbage_num,
            pothole_num: model_pothole_num,
            animal_num: model_animal_num
        }})

        // danger insert 만들기
        const danger_list = data.hazards;
        for(var i=0; i<danger_list.length; ++i){
            await danger.create({
                category: danger_list[i].category,
                accuracy: danger_list[i].accuracy,
                location: req.body.location,
                user_id: req.body.user_id,
                quick: false, // 나중에 계산 식 추가
                complete: false,
                danger_score: 50 // 나중에 계산 식 추가
            })
        }

        res.send({ data: "success" });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};