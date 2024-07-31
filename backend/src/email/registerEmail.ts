import { envs } from "../config/envs/env.config";
import { transport } from "../config/nodemailer/nodemailer.config";

interface IEmail {
  email: string;
  name: string;
  token: string;
}
export class Emails {
  static sendConfirmationEmail = async (parametros: IEmail) => {
    try {
      const info = await transport.sendMail({
        from: '"Talent Trade" <no-reply@talenttrade.com>',
        to: parametros.email,
        subject: "Confirm your email - Talent Trade",
        html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Welcome to Talent Trade!</h2>
              <p>Hi, <strong>${parametros.name}</strong>,</p>
              <p>Thank you for registering with Talent Trade! You are almost done with the registration, you just need to confirm your email.</p>
              <p style="text-align: center;">
                <a href="${envs.FRONTEND_URL}/auth/confirm-account/${parametros.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirm account</a>
              </p>
              <p>Or you can copy and paste the following link into your browser:</p>
              <p><a href="${envs.FRONTEND_URL}/auth/confirm-account/${parametros.token}" style="color: #4CAF50;">Click here</a></p>
              <p style="color: #888;">This token will expire in 30 minutes.</p>
              <p>If you did not register with Talent Trade, please ignore this email.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Talent Trade. All rights reserved.</p>
            </div>
          </div>`,
      });
      console.log("Mensaje enviado: ", info.messageId);
    } catch (error) {
      throw new Error("Ocurrió un error al enviar el correo de confirmación");
    }
  };
  static sendResetPasswordEmail = async (parametros: IEmail) => {
    try {
      const info = await transport.sendMail({
        from: "Ta Trade",
        to: parametros.email,
        subject: "Confirma tu email",
        text: "Confirma tu email clickeando el enlace",
        html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Recuperación contraseña</h2>
              <p>Hola, <strong>${parametros.name}</strong>,</p>
              <p>Para elegir una contraseña nueva, ingresa en el siguiente enlace.</p>
              <p style="text-align: center;">
                <a href="${envs.FRONTEND_URL}/auth/reset-password/${parametros.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirmar Cuenta</a>
              </p>
              <p>O puedes copiar y pegar el siguiente enlace en tu navegador:</p>
              <p><a href="${envs.FRONTEND_URL}/auth/reset-password/${parametros.token}" style="color: #4CAF50;">Click here</a></p>
              <p style="color: #888;">Este token expira en 30 minutos.</p>
              <p>Si no has pedido un cambio de contraseña, ignora este mensaje.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Talent Trade. Todos los derechos reservados.</p>
            </div>
          </div>`,
      });
      console.log("mensaje enviado: ", info.messageId);
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de confirmacion");
    }
  };
}
