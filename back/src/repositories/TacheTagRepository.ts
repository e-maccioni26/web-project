import TachesTags from "../models/TachesTags";
import Tache from "../models/Tache";

class TacheTagRepository {
  async createTacheTag(data: any) {
    return await TachesTags.create(data);
  }

  async findAllTacheTags(filters: any = {}) {
    return await TachesTags.findAll({ where: filters });
  }

  async findTacheTagById(id: number) {
    return await TachesTags.findByPk(id);
  }

  async updateTacheTag(id: number, data: any) {
    return await TachesTags.update(data, { where: { id } });
  }

  async deleteTacheTag(id: number) {
    return await TachesTags.destroy({ where: { id } });
  }

  async findTagsByProjectId(projectId: number) {
    return await Tache.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: TachesTags,
          through: { attributes: [] },
        },
      ],
    });
  }

}

export default new TacheTagRepository();