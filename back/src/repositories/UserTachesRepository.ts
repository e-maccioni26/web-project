import UsersTaches from "../models/UsersTaches";

class UserTacheRepository {
  async create(data: any) {
    return await UsersTaches.create(data);
  }

  async findAll(filters: any = {}) {
    return await UsersTaches.findAll({ where: filters });
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
}

export default new UserTacheRepository();