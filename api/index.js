import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './routes'
import dotenv from 'dotenv'
dotenv.config()
//const express=require('express')
//const morgan=require('morgan')
//const cors=require('cors')
mongoose.Promise=global.Promise;
const dbUrl=process.env.MONGODB_URI
mongoose.connect(dbUrl)
.then(mongoose=>console.log('Conectando a la BD sistemaTicket'))
.catch((err=>console.log(err)))

const app=express()
app.use(morgan('dev'))
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/api',router)
app.set('port',process.env.PORT || 4000);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');// http://localhost:9000/ // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`)  
})