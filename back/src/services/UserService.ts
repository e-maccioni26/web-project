import UserRepository from "../repositories/UserRepository";
import UserTachesRepository from "../repositories/UserTachesRepository";
import UserProjectRepository from "../repositories/UserProjectRepository";

class UserService {
  async createUser(data: any) {
    return await UserRepository.createUser(data);
  }

  async getUsers(filters: any) {
    return await UserRepository.findAllUsers(filters);
  }

  async getUserById(id: number) {
    const user = await UserRepository.findUserById(id);
    if (!user) throw new Error("Utilisateur introuvable");
    return user;
  }

  async updateUser(id: number, data: any) {
    const user = await UserRepository.findUserById(id);
    if (!user) throw new Error("Utilisateur introuvable");
    return await UserRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    const user = await UserRepository.findUserById(id);
    if (!user) throw new Error("Utilisateur introuvable");
    return await UserRepository.deleteUser(id);
  }
  async getUserTaches(id: number) {
    return await UserTachesRepository.findAll({ UserId: id });
  }
  async getUserProjects(id: number) {
    return await UserProjectRepository.findAll({ UserId: id });
  }

  async addUserTache(userId: number, data: any) {
    const userTache = {
     ...data, UserId: userId
    }
    return await UserTachesRepository.create(data);
  }

  async removeUserTache(userId: number, tacheId: number) {
    const userTache = await UserTachesRepository.findAll({ UserId: userId, TacheId: tacheId });
    if (!userTache) throw new Error("Tâche introuvable");
    return await UserTachesRepository.delete(Number(userTache[0].id));
  }
}

export default new UserService();
