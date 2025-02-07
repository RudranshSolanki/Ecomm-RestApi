import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    'service': 'Gmail',
    'auth':{
        'user': 'rudransh@dumadu.com',
        'pass': 'Mademynewpass@12'
    }
})


export const sendMail=(toEmail,message)=>{
    const mailOptions = {
        from: 'rudransh@dumadu.com',
        to: toEmail,
        subject: 'Welcome to SociaNetwork',
        text: message
    };
    
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err)
            console.log(err);
        else
            console.log('mail sent');
    })
}
