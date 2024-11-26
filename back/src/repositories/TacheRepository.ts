import Tache from '../models/Tache';

class TacheRepository {
  async createTache(data: any) {
    return await Tache.create(data);
  }

  async findAllTaches(filters: any = {}) {
    return await Tache.findAll({ where: filters });
  }

  async findTacheById(id: number) {
    return await Tache.findByPk(id);
  }

  async updateTache(id: number, data: any) {
    return await Tache.update(data, { where: { id } });
  }

  async deleteTache(id: number) {
    return await Tache.destroy({ where: { id } });
  }
}

export default new TacheRepository();
