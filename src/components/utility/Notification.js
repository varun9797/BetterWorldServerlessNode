
import emailTemplateModel from "./EmailTemplateModel";
import nodemailer from "nodemailer";
import  {
    MESSAGE_TEMPLATE
} from "../../config/config";
// import {
//     MESSAGE_TEMPLATE
// } from "config/constants";

class Notification {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
     }
    dummyMailFunction = async (req, res) => {
        console.log("Notification : auctionDeniedNotification ");
        try {
            const paramObj = {
                values: {
                    name:"varun!!!"
                },
                message_template_id: MESSAGE_TEMPLATE.DUMMY_MAIL
            };
            let htmlTemplate = await emailTemplateModel.getEmailTemplate(
                paramObj
            );
            let paramsMailObj = {
                email: "varun.verma@cuelogic.com",
                subject: "Your live offer denied",
                htmlBody: htmlTemplate
            };
            console.log(paramsMailObj);
            await this.sendEmail(paramsMailObj);
            res.send("mail sent!!");
        } catch (err) {
            console.log("Notification  : auctionDeniedNotification :: error ", err);
            res.send("something went wrong!!", err);
        }
    }

    sendEmail = async params => {
        console.log("Notification : sendEmail ");
        try {
            params.email =
                params.email.constructor === Array ? params.email : [params.email];
            if (!params.cc) {
                params.cc = null;
            }
            await this.sendEmailByNodeMailer(
                params.email.join(","),
                params.subject,
                params.message,
                params.htmlBody,
                params.cc,
                params.bcc
            );
        } catch (err) {
            console.log("Notification :: sendEmail :: error " + err);
        }
    };

    sendEmailByNodeMailer = (receiver, subject, message, html = null, cc = null, bcc = null) => {
        console.log("Notification :: sendEmailByNodeMailer " + receiver + " CC:" + cc + " BCC " + bcc);
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: process.env.EMAIL,
                to: receiver,
                subject: subject,
                text: message,
                html: html
            };
            if (cc) {
                mailOptions.cc = cc.join(",");
            }
            if (bcc) {
                mailOptions.bcc = bcc.join(",");
            }
            this.transporter.sendMail(mailOptions, err => {
                if (err) {
                    console.log(
                        "Notification :: sendEmailByNodeMailer :: error " +
                        JSON.stringify(err)
                    );
                    reject(err);
                } else {
                    console.log(
                        "Notification :: sendEmailByNodeMailer email sent successfully "
                    );
                    resolve({
                        message: "Mail sent successfully !!"
                    });
                }
            });
        });
    };
}

export default new Notification();