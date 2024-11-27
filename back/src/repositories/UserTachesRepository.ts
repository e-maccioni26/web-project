import UsersTaches from "../models/UsersTaches";
import Tache from "../models/Tache";

class UserTacheRepository {
  async create(data: any) {
    return await UsersTaches.create(data);
  }

  async findAll(filters: any = {}) {
    return await UsersTaches.findAll({
      include: [{model: Tache}]
    });
  }

  async findById(id: number) {
    return await UsersTaches.findAll({ where: { UserId: id } });
  }

  async update(id: number, data: any) {
    return await UsersTaches.update(data, { where: { id } });
  }

  async delete(id: number) {
    return await UsersTaches.destroy({ where: { id } });
  }

  async isUserInTache(id: number, usersIds: number[]){
    const isUsersIn = await UsersTaches.findAll({
        where: {
          TacheId: id,
          UserId: usersIds
        }
    })
    if(isUsersIn.length == 0) return false
    return true
}

async addUsers(id: number, usersIds: number[]) {
    const usersProjects = usersIds.map(userId => ({
      TacheId: id,
        UserId: userId
    }));
    return await UsersTaches.bulkCreate(usersProjects);
}

async removeUsers(id: number, usersIds: number[]){
    return await UsersTaches.destroy({
        where: {
          TacheId: id,
          UserId: usersIds
        }
    });
}
}

export default new UserTacheRepository();