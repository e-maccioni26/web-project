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
    await UserRepository.updateUser(id, data);
    return await UserRepository.findUserById(id);
  }

  async deleteUser(id: number) {
    const user = await UserRepository.findUserById(id);
    if (!user) throw new Error("Utilisateur introuvable");
    return await UserRepository.deleteUser(id);
  }
  async getUserTaches(id: number) {
    return await UserTachesRepository.getUserTaches(id);
  }
  async getUserProjects(id: number) {
    return await UserProjectRepository.getUserProjects(id);
  }

}

export default new UserService();
