import {
    Request,
    Response,
    NextFunction
    } from "express"

import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

function ensureAuthenticated(
    req:Request,
    res:Response,
    next:NextFunction
){
   const authToken =  req.headers.authorization
   //Verifica se o token está preechido
   if(!authToken){
       return res.status(401).end()
   }

   const [, token] = authToken.split(" ")
   
   try{
        const { sub } = verify(token ,"99e557a6c4dd1e24c61cba4f90962598") as IPayload
        req.user_id = sub

        return next()
   }catch(err) {
        return res.status(401).end()
   }

}


export { ensureAuthenticated }