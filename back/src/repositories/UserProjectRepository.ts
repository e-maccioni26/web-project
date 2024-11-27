import UsersProjects from "../models/UsersProjects";
import User from "../models/User";
import { error } from "console";

class UserProjectRepository {
    async createUserProject(userId: number, projectId: number) {
        return await UsersProjects.create({
            UserId: userId,
            ProjectId: projectId
        });
    }

    async getUserProjects(userId: number) {
        return await UsersProjects.findAll({
            where: {
                UserId: userId
            }
        });
    }

    async getProjectUsers(projectId: number) {
        return await UsersProjects.findAll({
            where: { ProjectId: projectId },
            attributes: [],
            include: [{
                model: User,
                attributes: ['id', 'nom', 'email', 'mot_de_passe', 'date_creation'],
            }],
        });
    }

    async findAll(filters: any = {}) {
        return await UsersProjects.findAll({ where: filters });
    }

    async addUsers(id: number, usersIds: number[]) {
        const usersProjects = usersIds.map(userId => ({
            ProjectId: id,
            UserId: userId
        }));
        const isUsersIn = await UsersProjects.findAll({
            where: {
                ProjectId: id,
                UserId: usersIds
            }
        })
        if(isUsersIn.length > 0) throw new Error("User already in project")
        return await UsersProjects.bulkCreate(usersProjects);
    }
    
    async removeUsers(id: number, usersIds: number[]){
        const isUsersIn = await UsersProjects.findAll({
            where: {
                ProjectId: id,
                UserId: usersIds
            }
        })
        if(isUsersIn.length == 0) throw new Error("User not in project")
        return await UsersProjects.destroy({
            where: {
                ProjectId: id,
                UserId: usersIds
            }
        });
    }
}

export default new UserProjectRepository();