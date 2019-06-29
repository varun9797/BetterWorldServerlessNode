import mysql from "mysql";
const queryMediator = require("./QueryMediator");
const handlebars = require("handlebars");

// class EmailTemplateModel {
//     constructor() { }

    export async function getEmailTemplate (params) {
        console.log("EmailTemplateModel :: getEmailTemplate ",params);
        // return promise reject || resolve
        return new Promise(async (resolve, reject) => {
            try {
                let rawHtml;
                if(params.htmlContent) {
                    rawHtml = params.htmlContent;
                } else {
                    const sql = "SELECT template FROM messagetemplate WHERE id = " + mysql.escape(params.message_template_id) + " AND row_status = '1'";
                    let result = await queryMediator.queryConnection(sql);
                    rawHtml=result.dbResponse[0]["template"];
                }
                
                const compiledTemplate = await handlebars.compile(rawHtml);

                let finalHtmlText = compiledTemplate(params.values);
                
                finalHtmlText = finalHtmlText.replace(/null, | null ,| null/g, "");

                resolve(finalHtmlText);
            } catch (err) {
                console.log("EmailTemplateModel :: getEmailTemplate " + err);
                reject({ message: "something went wrong!!" });
            }
        });
    }
// }

// export default new EmailTemplateModel();