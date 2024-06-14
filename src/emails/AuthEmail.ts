import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async( user: IEmail ) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'UpTask - Confirma tu cuenta',
            html: `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>UpTask</title>
                    
                    <style>
                            table {
                            width: 600px;
                            margin: 0 auto;
                            font-family: Arial, sans-serif;
                            border: 1px solid #c9c9c9;
                            }
                            td {
                            padding: 20px;
                            }
                            p {
                            margin: 0;
                            }
                            a {
                            display: inline-block;
                            text-decoration: none;
                            padding: 10px 20px;
                            }
                            @media screen and (max-width: 600px) {
                            table {
                                width: 100%;
                                border: none;
                            }
                            td {
                                padding: 10px;
                            }
                            h1 {
                                font-size: 18px;
                            }
                            p {
                                font-size: 16px;
                            }
                            a {
                                font-size: 16px;
                                padding: 15px 25px;
                            }
                            }
                        </style>
                    </head>
                    <body>
                        <table>
                            <tr>
                                <td style="background-color:#0284C7;">
                                <h1 style="font-size: 21px; color: #ffffff; font-weight: bold; display: table-cell; vertical-align: middle; text-align: center;">UpTask</h1>
                        </td>
                        </tr>
                            <tr>
                            <td style="padding-top: 60px;">
                                <p style="font-size: 16px; color: #666666; text-align:center; padding-bottom:20px;">Hola: <span style="font-weight:bold;">${user.name}</span>, ayúdanos a comprobar tu cuenta</p>
                                <p style="font-size: 16px; color: #666666;  padding-bottom:20px; text-align:center;">Tu cuenta ya está casi lista, solo debes confirmarla ingresando el código <b>${user.token}</b> al hacer clic en el siguiente enlace:</p>
                            </td>
                            </tr>
                                <tr>
                                <td style="padding-bottom: 50px; text-align: center;">
                                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="font-size: 14px; font-weight: bold; color: #ffffff; background-color: #0099ff; border-radius: 13px;">Comprobar Cuenta</a>
                                    <p style="font-size: 16px; color: #666666;  margin-top:40px; text-align:center;">Este código expira en <b>10 minutos</b></p>
                                </td>
                                </tr>
                                <tr>
                                <td style="background-color: #fafafa; text-align: center">
                                    <p style="font-size: 12px; color: #999999;">Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
                                </td>
                                </tr>
                        </table>
                    </body>
                    </html>
      `
        })
        console.log('Mensaje enviado', info.messageId)
    }
    
    static sendPasswordResetToken = async( user: IEmail ) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Reestablecer contraseña',
            text: 'UpTask - Reestablecer contraseña',
            html: `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>UpTask</title>
                    
                    <style>
                            table {
                            width: 600px;
                            margin: 0 auto;
                            font-family: Arial, sans-serif;
                            border: 1px solid #c9c9c9;
                            }
                            td {
                            padding: 20px;
                            }
                            p {
                            margin: 0;
                            }
                            a {
                            display: inline-block;
                            text-decoration: none;
                            padding: 10px 20px;
                            }
                            @media screen and (max-width: 600px) {
                            table {
                                width: 100%;
                                border: none;
                            }
                            td {
                                padding: 10px;
                            }
                            h1 {
                                font-size: 18px;
                            }
                            p {
                                font-size: 16px;
                            }
                            a {
                                font-size: 16px;
                                padding: 15px 25px;
                            }
                            }
                        </style>
                    </head>
                    <body>
                        <table>
                            <tr>
                                <td style="background-color:#0284C7;">
                                <h1 style="font-size: 21px; color: #ffffff; font-weight: bold; display: table-cell; vertical-align: middle; text-align: center;">UpTask</h1>
                        </td>
                        </tr>
                            <tr>
                            <td style="padding-top: 60px;">
                                <p style="font-size: 16px; color: #666666; text-align:center; padding-bottom:20px;">Hola: <span style="font-weight:bold;">${user.name}</span>, has solicitado reestablecer tu contraseña</p>
                                <p style="font-size: 16px; color: #666666;  padding-bottom:20px; text-align:center;">Para elegir una nueva contraseña, ingresa el código <b>${user.token}</b> al hacer clic en el siguiente enlace:</p>
                            </td>
                            </tr>
                                <tr>
                                <td style="padding-bottom: 50px; text-align: center;">
                                    <a href="${process.env.FRONTEND_URL}/auth/new-password" style="font-size: 14px; font-weight: bold; color: #ffffff; background-color: #0099ff; border-radius: 13px;">Reestablecer Contraseña</a>
                                    <p style="font-size: 16px; color: #666666;  margin-top:40px; text-align:center;">Este código expira en <b>10 minutos</b></p>
                                </td>
                                </tr>
                                <tr>
                                <td style="background-color: #fafafa; text-align: center">
                                    <p style="font-size: 12px; color: #999999;">Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
                                </td>
                                </tr>
                        </table>
                    </body>
                    </html>
      `
        })
        console.log('Mensaje enviado', info.messageId)
    }
}