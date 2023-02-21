/* Result API file */
const danger = require("../../schema/DangerSchema.js");
const user = require("../../schema/UserSchema.js");
const road = require("../../schema/RoadSchema.js");

const { Router } = require("express");
const router = Router();

var PythonShell = require('python-shell');
const path = require("path");

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

        // const exec = require('child_process').exec;

        // const result = exec('python', ['yolov5/inference.py']);
        // // const result = spawn('python', ['./src/routes/result/test.py']);

        // result.stdout.on('data', function(data) {
        //     console.log(data.toString());
        // });

        // result.stderr.on('data', function(data) {
        //     console.log(data.toString());
        // });

        const runModel = async () => {
            console.log("Test1")
            const options = {
                mode: 'text',
                pythonOptions: ['-u'],
                // scriptPath: 'yolov5',
            };
            console.log("Test2")
            // wrap it in a promise, and `await` the result
            const result = await new Promise((resolve, reject) => {
                console.log("Test3")
                // PythonShell.PythonShell.run('inference.py', options, (err, results) => {
                    PythonShell.PythonShell.run('./src/routes/result/test.py', options, (err, results) => {
                    console.log("Test4")
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
            console.log("Test4")
            console.log(result.stdout);
            return result;
        };
        console.log("Test5")

        runModel();
        console.log("Test6")
        // const options = {
        //     mode: 'text',
        //     pythonPath: '',
        //     pythonOptions: ['-u'],
        //     scriptPath: 'yolov5',
        // }

        // await PythonShell.PythonShell.run('inference.py', options, async (err, result) => {
        //     if (err) throw err;
        //     console.log(result);
        //     console.log("finished");
        //     res.send({data: result});
        // });

        console.log("test2")

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