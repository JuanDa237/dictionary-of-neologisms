import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import UsersModel, { encryptPassword, validatePassword } from "../users/models/users.models";
import RolesModel from "../roles/models/roles.models";

class AuthControllers {
    
    //Post
    public async singIn(request: Request, response: Response): Promise<Response> {
        
        const { username, password } = request.body;

        const user = await UsersModel.find({ username: username, active: true });
        
        if(user.length > 0) {

            const correctPassword: boolean = await validatePassword(password, user[0].password);

            if(correctPassword) {

                const token: string = jwt.sign({
                    _id: user[0]._id
                }, process.env.TOKEN_SECRET || "tokenTest", {
                    expiresIn: 86400 //The token expires in 24 hours
                });
                
                return response.status(200).header("token", token).set('Access-Control-Expose-Headers', 'token').json({ message: "Sing in succesfully." });
            }
            else {
                return response.status(401).json({ message: "Password is wrong." });
            }
        }
        else {
            return response.status(404).json({ message: "Username not found." });
        }
    }
    
    public async singUp(request: Request, response: Response): Promise<Response> {
        
        const { roleName, username, password, name } = request.body;
        var idRole: string;

        //Validate username
        const usernameFound = await UsersModel.find({ username: username });

        if(usernameFound.length > 0) {
            return response.status(401).json({ message: `Username '${username}' is in use.` });
        }

        //Validate role
        if(roleName != null) {
            const roleFound = await RolesModel.find({ name: roleName });

            if(roleFound.length > 0) {
                                    
                idRole = roleFound[0]._id;
            }
            else {
                return response.status(400).json({ message: `Role "${roleName}" not found.` });
            }
        }
        else {
            return response.status(400).json({ message: "No provided role." });
        }

        //Create user
        const newUser = await new UsersModel({
            idRole,
            username,
            password: await encryptPassword(password),
            name
        });

        newUser.save();

        return response.status(200).json({
            message: "Saved user.",
            user: {
                _id: newUser._id,
                idRole: newUser.idRole,
                username: newUser.username,
                name: newUser.name
            }
        });
    }
}

export const authControllers = new AuthControllers();