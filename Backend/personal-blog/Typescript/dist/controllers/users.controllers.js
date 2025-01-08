import { StatusCodes } from "http-status-codes";
import { UserDatabase } from "../db/user.db.js";
const userDb = new UserDatabase();
export function getAllUsers(req, res) {
    const users = userDb.getAllUsers();
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully fetched all users",
        data: users
    });
}
export function getUserById(req, res) {
    const { id } = req.params;
    const foundUser = userDb.getUserById(parseInt(id));
    if (!foundUser) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "User with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    res.status(StatusCodes.OK);
    res.json({
        message: "Succesfully fetched the user",
        data: foundUser
    });
}
export function createUser(req, res) {
    const { email, password, name, username } = req.body;
    let maxId = userDb.getMaxId();
    // Add new user to the array
    const newUser = {
        id: maxId + 1,
        email,
        password,
        name,
        username,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    userDb.createUser(newUser);
    res.status(StatusCodes.CREATED);
    res.json({
        message: "Successfully created the user",
        data: newUser
    });
}
export function updateUserById(req, res) {
    const { id } = req.params;
    const body = req.body;
    const foundUser = userDb.getUserById(parseInt(id));
    if (!foundUser) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "User with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    const updatedUser = Object.assign(Object.assign({}, foundUser), body);
    updatedUser.updatedAt = new Date();
    userDb.updateUserById(parseInt(id), updatedUser);
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully updated the user",
        data: updatedUser
    });
}
export function deleteUserById(req, res) {
    const { id } = req.params;
    const deletedUser = userDb.getUserById(parseInt(id));
    const deletedIdx = userDb.deleteUserById(parseInt(id));
    if (deletedIdx === -1) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "User with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully deleted the user",
        data: deletedUser
    });
}
