import nodemailer from 'nodemailer'
export async function sendToEmail(dest,message){
    const transporter = nodemailer.createTransport({
        service : "gmail" ,
        secure: false,
        auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
        },
      });
      let info = await transporter.sendMail({   
        from: '"Route alex 👻" <nourhanroutenodejs@gmail.com>', 
        to: dest, 
        subject: "Hello ✔",
        text: "Hello world?", 
        html: message, 
      });
}
