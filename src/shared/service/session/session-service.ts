import { User } from "../../../models/user-model";

const userLogin = require('../../../database/users-login.json');
export default class SessionService{
    async get(){
        return  "get";
    }
    async post(req:any, body:User){
        try{
            const user = userLogin.find((e:User)=> e.email === body.email)
            if(!user){
                return "login failed";
            }
            if(user.password === body.password){
                return {
                    success: true,
                    message: "Login successful"
                };
            }else{
                return {
                    success: false,
                    message: "login failed"
                };
            }
        } catch(error: any){
            return {
                success: false,
                message: error.message
            };;
        }
    }
    async put(){
        return  "put";
    }

    async editUser(req:any, body:User){
        try{
            const user = userLogin.find((e:User)=> e.email === body.email)
            if(!user){
                return {
                    success: false,
                    message:"user not found",
                }
            }else{
                user.password = body.password;
                return {
                    success: true,
                    message: "user updated"
                }
            }
        } catch(error: any){
            return {
                success: false,
                message: error.message
            }};
    }

    async createUser(){
        return  "createUser";
    }
    async delete(){
        return  "delete";
    }
};

