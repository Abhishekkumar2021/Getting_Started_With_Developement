import ErrorResponse from "../utility/error-response.model.js";
import CategoryDatabase from "../database/category.db.js";
import SuccessResponse from "../utility/success-response.model.js";
const categoryDB = new CategoryDatabase();
export function getCategories(req, res) {
    try {
        const categories = categoryDB.getCatgories();
        res.status(200).json(new SuccessResponse(categories, 200, "Succesfully fetched all categories!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function addCategory(req, res) {
    try {
        const { category } = req.body;
        categoryDB.addCategory(category);
        res.status(201).json(new SuccessResponse(null, 201, "Succesfully created the category!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
