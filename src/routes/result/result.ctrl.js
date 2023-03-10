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
        const dangers = await danger.find().sort({"danger_score": -1});
        res.send({ data: dangers });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

exports.get_user_dangers = async (req,res) => {
    try {
        // console.log(req.params.user_id)
        const dangers = await danger.find({ user_id: Types.ObjectId(req.params.user_id)}).sort({"danger_score": -1});
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

        console.log("req.body.user_id: " + req.body.user_id)
        const model_danger_num = data.danger_num;
        const model_garbage_num = data.garbage_num;
        const model_pothole_num = data.pothole_num;
        const model_animal_num = data.animal_num;

        const spawn = require('child_process').spawn;

        // danger insert // score ????????? ??????
        const danger_list = data.hazards;
        for(var i=0; i<danger_list.length; ++i){
            var danger_score = 0;
            var quick = false;
            var category = danger_list[i].category;
            var accuracy = danger_list[i].accuracy;
            const result = spawn('python', ['src/routes/result/src/danger_priority_score.py', danger_list[i].category]);

            result.stdout.on('data', function(data) {
                // console.log(parseInt(data));
                danger_score = parseInt(data)
                if (danger_score >= 75) quick = true;
                else quick = false;

                const new_danger = danger.create({
                    category: category,
                    accuracy: accuracy,
                    location: req.body.location,
                    user_id: req.body.user_id,
                    quick: quick,
                    complete: false,
                    danger_score: danger_score 
                })
                // console.log("new_danger: " + new_danger)
            });
    
            result.stderr.on('data', function(data) {
                console.log(data.toString());
            });

        }

        // user update // score ????????? ??????
        const users = await user.updateOne({
            _id: Types.ObjectId(req.body.user_id)
        }, { "$inc": {
            danger_num: model_danger_num,
            garbage_num: model_garbage_num,
            pothole_num: model_pothole_num,
            animal_num: model_animal_num
        }})

        const user_danger_num = (await user.findOne({_id: Types.ObjectId(req.body.user_id)}).select('danger_num')).danger_num
        const user_quick_num  = (await danger.find({user_id: Types.ObjectId(req.body.user_id), quick: true})).length // report num
        const user_complete_num = (await danger.find({user_id: Types.ObjectId(req.body.user_id), quick: true, complete: true})).length // report_actioned_num

        console.log("user: " + user_danger_num, user_quick_num, user_complete_num)
        //  run score python
        const user_result = spawn('python', ['src/routes/result/src/user_score.py', user_danger_num, user_quick_num, user_complete_num]);

        user_result.stdout.on('data', function(data) {
            console.log(parseInt(data));
            var user_score = parseInt(data)

            const update_user = user.updateOne({
                _id: Types.ObjectId(req.body.user_id)
            }, {
                user_score: user_score
            })
            console.log("update_user: " + update_user)
        });

        user_result.stderr.on('data', function(data) {
            console.log(data.toString());
        });

        // road update // score ????????? ??????
        const roads = await road.updateOne({
            _id: Types.ObjectId(req.body.road_id)
        }, { "$inc": {
            danger_num: model_danger_num,
            garbage_num: model_garbage_num,
            pothole_num: model_pothole_num,
            animal_num: model_animal_num
        }})

        const road_danger_num = (await road.findOne({_id: Types.ObjectId(req.body.road_id)}).select('danger_num')).danger_num
        const road_garbage_num  = (await road.findOne({_id: Types.ObjectId(req.body.road_id)}).select('garbage_num')).garbage_num
        const road_pothole_num = (await road.findOne({_id: Types.ObjectId(req.body.road_id)}).select('pothole_num')).pothole_num
        const road_animal_num = (await road.findOne({_id: Types.ObjectId(req.body.road_id)}).select('animal_num')).animal_num
        const road_complete_num = (await road.findOne({_id: Types.ObjectId(req.body.road_id)}).select('complete_num')).complete_num

        const road_result = spawn('python', ['src/routes/result/src/road_score.py', road_garbage_num, road_pothole_num, road_animal_num, road_danger_num, road_complete_num]);

        road_result.stdout.on('data', function(data) {
            console.log(parseInt(data));
            var road_score = parseInt(data)

            const update_road = road.updateOne({
                _id: Types.ObjectId(req.body.road_id)
            }, {
                road_score: road_score
            })
            console.log("update_road: " + update_road)
        });

        road_result.stderr.on('data', function(data) {
            console.log(data.toString());
        });


        res.send({ data: "success" });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};