import UsersProjects from "../models/UsersProjects";

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