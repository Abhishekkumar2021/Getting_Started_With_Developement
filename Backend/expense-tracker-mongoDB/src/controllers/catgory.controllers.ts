import { Request, Response } from "express";
import ErrorResponse from "../utility/error-response.model.js";
import SuccessResponse from "../utility/success-response.model.js";
import { add_category, get_categories } from "../database/category.db.js";


export function getCategories(req: Request, res: Response){
    try {
        const categories = get_categories();
        res.status(200).json(new SuccessResponse(categories, 200, "Succesfully fetched all categories!"))
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}

export function addCategory(req: Request, res: Response){
    try {
        const { category } = req.body;
        add_category(category);
        res.status(201).json(new SuccessResponse(null, 201, "Succesfully created the category!"))
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}