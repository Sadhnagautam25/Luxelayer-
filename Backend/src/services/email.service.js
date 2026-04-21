import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "../config/config.js";

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
 console.log("BREVO KEY:", config.EMAIL.BREVO_API_KEY);
apiKey.apiKey = config.EMAIL.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, html }) => {
   console.log('sender key:', config.EMAIL.SENDER_EMAIL);
   
  await tranEmailApi.sendTransacEmail({
    sender: {
      email: config.EMAIL.SENDER_EMAIL, // verified sender in Brevo
      name: "LuxeLayer",
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

export default sendEmail;
