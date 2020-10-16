import { Request, Response } from "express";

import UsersModel from "./models/users.models";
import RolesModel from "../roles/models/roles.models";

class UsersControllers {
    
    //Get logged user
    public async loggedUser(request: Request, response: Response): Promise<Response> {

        const user = await UsersModel.find({ _id: request.user._id, active: true });

        const role = await RolesModel.findById(user[0].idRole);

        return response.status(200).json({
            name: user[0].name,
            role: role?.name
        });
    }
}

export const usersControllers = new UsersControllers();