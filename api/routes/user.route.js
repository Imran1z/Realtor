import express from 'express'
import { signin,signout,signup } from '../controllers/user.controller';

const router =express.Router();

router.get('/get',(req, res)=>{
    res.json("lolu")
})

export default router