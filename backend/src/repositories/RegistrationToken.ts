import RegistrationToken from "../models/RegistrationToken.model";

export class RegistrationTokenRepository {
  constructor(private readonly RegistrationTokenModel = RegistrationToken) {}

  async create(email: string) {
    try {
      const newRegistrationToken = await this.RegistrationTokenModel.create({
        email,
      });
      console.log("Hola");
      return newRegistrationToken;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const registrationToken = await this.RegistrationTokenModel.findOne({
        email,
      });
      return registrationToken;
    } catch (error) {
      throw error;
    }
  }

  async deleteByEmail(email: string) {
    try {
      const registrationToken = await this.RegistrationTokenModel.deleteOne({
        email,
      });
      return registrationToken;
    } catch (error) {
      throw error;
    }
  }
}
