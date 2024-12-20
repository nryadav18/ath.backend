const express = require('express')
const mongoose = require('mongoose')
const Feedback_form = require('../model/ti_model')

const Clearence = async(req,res)=>{
    Feedback_form.findOneAndDelete({date : req.body.date, rollNumber : req.body.rollNumber})
    .then(succ=>{
        return res.status(200).json("Issue Cleared")
    })
    .catch(err=>{
        return res.status(500).json(err)
    })
}

exports.Clearence = Clearence;