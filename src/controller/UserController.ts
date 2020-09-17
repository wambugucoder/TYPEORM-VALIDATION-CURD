import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";



  

    export const AllUsers =async (request: Request, response: Response, next: NextFunction) =>{
        const userRepository = getRepository(User);
        return userRepository.find();
    }

export const GetOne = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
        return userRepository.findOne(request.params.id);
    }

export const CreateUser = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
        const user =  plainToClass(User, request.body);
        const errors = await validate(user, { skipMissingProperties: true });
        if (errors) {
            let errorTexts = Array();
               for (const errorItem of errors) {
                   errorTexts = errorTexts.concat(errorItem.constraints);
               }
               return response.status(400).send(errors);
        }
        else {
            response.json(request.body);
            //return this.userRepository.save(user)
        }
        
       
    }

    export const Remove =async (request: Request, response: Response, next: NextFunction) =>{
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(request.params.id);
        await userRepository.remove(userToRemove);
    }

