import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs" 
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string
    password: string
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        const user = await usersRepositories.findOne({
            email
        })

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const PasswordMatch = await compare(password, user.password)
        if(!PasswordMatch){
            throw new Error("Email/Password incorrect")
        }

        //Gerar token
        const token = sign({
            email: user.email,
        },"99e557a6c4dd1e24c61cba4f90962598", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }