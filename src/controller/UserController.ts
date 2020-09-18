import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";

import { validate } from "class-validator";




  

export const AllUsers = async (request: Request, response: Response) =>{
        const userRepository = getRepository(User);
         userRepository.find().then((done) => {response.json(done)})
    }

export const GetOne = async (request: Request, response: Response) => {
    const userRepository = getRepository(User);
    userRepository.findOne(request.params.id).then((user) => {
        if (user) {
               response.json(user) 
            }
        else {
            response.status(404).json({user:"Couldn't Find The Requested User"})
            }
        })
    }

export const CreateUser = async (request: Request, response: Response)=> {
    const userRepository = getRepository(User);
    let user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.password = request.body.password;

        const errors = await validate(user, { skipMissingProperties: true });
        if (errors.length >=1) {
           
            let errorTexts = Array();
               for (const errorItem of errors) {
                   errorTexts = errorTexts.concat(errorItem.constraints);
               }
               
               return response.status(400).send(errorTexts);
        }

        else {
             userRepository.save(user).then((saved) => {response.json(saved)})
        }
        
    
       
    }

    export const Remove =async (request: Request, response: Response) =>{
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(request.params.id);
        await userRepository.remove(userToRemove);
    }

