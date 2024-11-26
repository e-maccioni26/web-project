import Tag from "../models/Tag";

class TagRepository {
  async createTag(data: any) {
    return await Tag.create(data);
  }

  async findAllTags(filters: any = {}) {
    return await Tag.findAll({ where: filters });
  }

  async findTagById(id: number) {
    return await Tag.findByPk(id);
  }

  async updateTag(id: number, data: any) {
    return await Tag.update(data, { where: { id } });
  }

  async deleteTag(id: number) {
    return await Tag.destroy({ where: { id } });
  }
}

export default new TagRepository();