const express=require('express')
const app=express();
const cookieParser = require('cookie-parser');
const connection=require('./Connections/connection');
const { createUser, loginUser, logout } = require('./Controller/loginController');
const { allUsers, DeletePost, EditPost } = require('./Controller/userController');
const { isAuthanticate } = require('./Middleware/isAuthantication');
require('dotenv').config({path:"./Config/config.env"})
const cors = require('cors');


app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const corsOptions = {
    origin: ['http://localhost:5173'], 
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, 
  };
  
  app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/create',createUser)
app.post('/login',loginUser)
app.get('/logout',logout)

app.get('/user/alluser',isAuthanticate,allUsers)
app.delete('/user/delete/:id',isAuthanticate,DeletePost)
app.put('/user/edit/:id',isAuthanticate,EditPost)



connection();


app.listen(process.env.PORT || 4000,()=>{
    console.log('Server is running on port ',process.env.PORT);
})

