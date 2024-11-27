import UsersProjects from "../models/UsersProjects";
import User from "../models/User";
import Project from "../models/Project";
import { error } from "console";

class UserProjectRepository {
    async createUserProject(userId: number, projectId: number) {
        return await UsersProjects.create({
            UserId: userId,
            ProjectId: projectId
        });
    }

    async getUserProjects(userId: number) {
        const projects = await UsersProjects.findAll({
            where: { UserId: userId },
            attributes: [],
            include: [{
                model: Project
            }],
        }) as any[];
        const projectUsers = projects.map(project => project.Project.dataValues)
        return projectUsers
    }

    async getProjectUsers(projectId: number) {
        const projects = await UsersProjects.findAll({
            where: { ProjectId: projectId },
            attributes: [],
            include: [{
                model: User,
                attributes: ['id', 'nom', 'email', 'mot_de_passe', 'date_creation'],
            }],
        }) as any[];
        const projectUsers = projects.map(project => project.User.dataValues)
        return projectUsers
    }

    async findAll(filters: any = {}) {
        return await UsersProjects.findAll({ where: filters });
    }

    async isUserInProject(id: number, usersIds: number[]){
        const isUsersIn = await UsersProjects.findAll({
            where: {
                ProjectId: id,
                UserId: usersIds
            }
        })
        if(isUsersIn.length == 0) return false
        return true
    }

    async addUsers(id: number, usersIds: number[]) {
        const usersProjects = usersIds.map(userId => ({
            ProjectId: id,
            UserId: userId
        }));
        return await UsersProjects.bulkCreate(usersProjects);
    }
    
    async removeUsers(id: number, usersIds: number[]){
        return await UsersProjects.destroy({
            where: {
                ProjectId: id,
                UserId: usersIds
            }
        });
    }
}

export default new UserProjectRepository();