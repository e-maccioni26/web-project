import TagRepository from '../repositories/TagRepository';
import TacheTagRepository from '../repositories/TacheTagRepository';

class TagService {
  async createTag(data: any) {
    return await TagRepository.createTag(data);
  }

  async getTags(filters: any) {
    return await TagRepository.findAllTags(filters);
  }

  async getTagById(id: number) {
    const tag = await TagRepository.findTagById(id);
    if (!tag) throw new Error('Tag introuvable');
    return tag;
  }

  async updateTag(id: number, data: any) {
    const tag = await TagRepository.findTagById(id);
    if (!tag) throw new Error('Tag introuvable');
    return await TagRepository.updateTag(id, data);
  }

  async deleteTag(id: number) {
    const tag = await TagRepository.findTagById(id);
    if (!tag) throw new Error('Tag introuvable');
    return await TagRepository.deleteTag(id);
  }

  async getTagsByTacheId(tacheId: number) {
    return await TacheTagRepository.findAllTacheTags({ TacheId: tacheId });
  }

  async addTagToTache(tacheId: number, data: any) {
    const tacheTag = {
      ...data,
      TacheId: tacheId,
    };
    return await TacheTagRepository.createTacheTag(tacheTag);
  }

  async removeTagFromTache(tacheId: number, tagId: number) {
    const tacheTag = await TacheTagRepository.findAllTacheTags({ TacheId: tacheId, TagId: tagId });
    if (!tacheTag) throw new Error('Tag introuvable');
    return await TacheTagRepository.deleteTacheTag(Number(tacheTag[0].id));
  }
}

export default new TagService();