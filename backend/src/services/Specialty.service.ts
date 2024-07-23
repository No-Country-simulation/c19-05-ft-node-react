import { SpecialtyRepository } from "../repositories/Specialty.repository";

export class SpecialtyService {
  private readonly specialtyRepository: SpecialtyRepository;

  constructor(specialtyRepository: SpecialtyRepository) {
    this.specialtyRepository = specialtyRepository;
  }

  async find() {
    try {
      const result = await this.specialtyRepository.find();

      return { status: "error", payload: result };
    } catch (error) {
      throw error;
    }
  }
}
