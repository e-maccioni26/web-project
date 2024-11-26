import TacheRepository from '../repositories/TacheRepository';

class TacheService {
  async createTache(data: any) {
    return await TacheRepository.createTache(data);
  }

  async getTaches(filters: any) {
    console.log('filters', filters);
    return await TacheRepository.findAllTaches(filters);
  }

  async getTacheById(id: number) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tâche introuvable');
    return tache;
  }

  async updateTache(id: number, data: any) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tâche introuvable');
    return await TacheRepository.updateTache(id, data);
  }

  async deleteTache(id: number) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tâche introuvable');
    return await TacheRepository.deleteTache(id);
  }
}

export default new TacheService();
