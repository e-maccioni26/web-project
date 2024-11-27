import UsersProjects from "../models/UsersProjects";
import User from "../models/User";

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

    async deleteUserProject(projectId: number) {
        return await UsersProjects.destroy({
            where: {
                ProjectId: projectId
            }
        });
    }

    async deleteUserProjects(userId: number) {
        return await UsersProjects.destroy({
            where: {
                UserId: userId
            }
        });
    }

    async findAll(filters: any = {}) {
        return await UsersProjects.findAll({ where: filters });
    }
}

export default new UserProjectRepository();