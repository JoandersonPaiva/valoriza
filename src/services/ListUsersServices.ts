import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { classToPlain } from "class-transformer"

class ListUsersService {
    async execute() {
        const usersReposities = getCustomRepository(UsersRepositories)
        
        const users = await usersReposities.find()

        return classToPlain(users)
    }
}

export { ListUsersService }