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

        // danger insert // score 돌리기 완료
        const danger_list = data.hazards;
        for(var i=0; i<danger_list.length; ++i){
            var danger_score = 0;
            var quick = false;
            var category = danger_list[i].category;
            var accuracy = danger_list[i].accuracy;
            const result = spawn('python', ['src/routes/result/src/danger_priority_score.py', danger_list[i].category]);

            result.stdout.on('data', function(data) {
                console.log(parseInt(data));
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
                console.log("new_danger: " + new_danger)
            });
    
            result.stderr.on('data', function(data) {
                console.log(data.toString());
            });

        }

        // user update // score 돌리기
        const user = await user.updateOne({
            _id: Types.ObjectId(req.body.user_id)
        }, { "$inc": {
            danger_num: model_danger_num,
            garbage_num: model_garbage_num,
            pothole_num: model_pothole_num,
            animal_num: model_animal_num
        }})

        const user_danger_num = user.danger_num
        const user_quick_num  = (await danger.find({user_id: Types.ObjectId(req.body.user_id), quick: true})).length // report num
        const user_complete_num = (await danger.find({user_id: Types.ObjectId(req.body.user_id), quick: true, complete: true})).length // report_actioned_num

        //  run score python
        const user_result = spawn('python', ['src/routes/result/src/user_score.py', user_danger_num, user_quick_num, user_complete_num]);

        user_result.stdout.on('data', function(data) {
            console.log(parseInt(data));
            var user_score = parseInt(data)

            const user = user.update({
                _id: Types.ObjectId(req.body.user_id)
            }, {
                user_score: user_score
            })
            console.log("update_user: " + user)
        });

        user_result.stderr.on('data', function(data) {
            console.log(data.toString());
        });

        // road update // score 돌리기
        const road = await road.update({
            _id: Types.ObjectId(req.body.road_id)
        }, { "$inc": {
            danger_num: model_danger_num,
            garbage_num: model_garbage_num,
            pothole_num: model_pothole_num,
            animal_num: model_animal_num
        }})

        const road_danger_num = road.danger_num
        const road_garbage_num  = road.garbage_num
        const road_pothole_num = road.pothole_num
        const road_animal_num = road.animal_num
        const road_complete_num = road.complete_num

        const road_result = spawn('python', ['src/routes/result/src/road_score.py', road_garbage_num, road_pothole_num, road_animal_num, road_danger_num, road_complete_num]);

        road_result.stdout.on('data', function(data) {
            console.log(parseInt(data));
            var road_score = parseInt(data)

            const road = road.update({
                _id: Types.ObjectId(req.body.road_id)
            }, {
                road_score: road_score
            })
            console.log("update_road: " + road)
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