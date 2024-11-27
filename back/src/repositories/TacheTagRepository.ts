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

  async isTagOntask(id: number, tags: number[]){
    const tagOnTask = await TachesTags.findAll({
        where: {
          TacheId: id,
          TagId: tags
        }
    })
    if(tagOnTask.length == 0) return false
    return true
  }

  async addTags(id: number, tags: number[]) {
    const tasktags = tags.map(tagId => ({
      TacheId: id,
      TagId: tagId
    }));
    return await TachesTags.bulkCreate(tasktags);
  }

  async removeTags(id: number, tags: number[]){
      return await TachesTags.destroy({
          where: {
            TacheId: id,
            TagId: tags
          }
      });
  }

}

export default new TacheTagRepository();