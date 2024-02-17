import express from 'express'

const router =express.Router();

router.get('/get',(req, res)=>{
    res.json("lolu")
})

export default router