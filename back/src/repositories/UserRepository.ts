import User from '../models/User';

class UserRepository {
  async createUser(data: any) {
    return await User.create(data);
  }

  async findAllUsers(filters: any = {}) {
    return await User.findAll({ where: filters });
  }

  async findUserById(id: number) {
    return await User.findByPk(id);
  }

  async updateUser(id: number, data: any) {
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }
}

export default new UserRepository();
