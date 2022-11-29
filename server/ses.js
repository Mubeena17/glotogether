require("dotenv").config();
const aws = require("aws-sdk");

const { AWS_KEY, AWS_SECRET, AWS_REGION } = process.env;

module.exports.ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION,
});
