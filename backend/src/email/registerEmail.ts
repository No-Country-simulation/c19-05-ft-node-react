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
          from: "Ta Trade",
          to: parametros.email,
          subject: "Confirma tu email",
          text: "Confirma tu email clickeando el enlace",
          html: `<p>Hola: ${parametros.name} Ya casi has finalizado el registro, solo queda que confirmes tu email</p>
          <p>Visita el siguiente enlace</p>
          <a href="http://localhost:${envs.PORT}/api/user/confirm-email/${parametros.token}">Confirmar cuenta</a>
          <p>Este token expira en 30 minutos</p>
          `,
        });
        console.log("mensaje enviado: ", info.messageId);
      } catch (error) {
        throw new Error("Ocurrio un error al enviar el mail de confirmacion");
      }
    }
}