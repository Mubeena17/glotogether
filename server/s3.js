const aws = require("aws-sdk");
const path = require("path");
require("dotenv").config({ path: __dirname + "./server/.env" });

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
}

module.exports.S3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});
