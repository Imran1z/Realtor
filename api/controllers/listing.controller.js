import { errorHandler } from "../utils/error.js"
import Listing from '../models/listing.model.js'



export const createListing =async(req, res, next)=>{
    
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
        
    } catch (error) {
        next(error)
    }
    
}













export const getListing =(req, res)=>{
    console.log("done and dusted")
    
}