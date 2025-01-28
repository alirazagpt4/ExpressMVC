import express from 'express';
import { login } from '../controllers/user_controller.js'
import { signup } from '../controllers/user_controller.js'
import {authenticationToken} from '../controllers/user_controller.js';

const routes = express.Router();
routes.get('/' , (req , res)=>{
      res.send("Hello Welcome to site")
})
routes.post('/signup' , signup)
routes.post('/login' , login);

routes.get('/auth' , authenticationToken , (req , res)=>{
    res.json({message: "Authenticated"})
})
routes.get('*' , ()=>{
    return "404 not found"
});

export default routes; 