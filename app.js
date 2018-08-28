const exec = require('child_process').exec;
const util = require('util');
const fs = require("fs");
const run = util.promisify(exec);
const moment = require('moment');
let cron = require('node-cron');

cron.schedule('0 0 0 * * *', function () {
  run('./sql_dumper.sh')
    .then((data) => {
      console.log("SQL DUMP: ", data.stdout.trim());
      let _file = fs.readFileSync(process.cwd() + "/" + data.stdout.trim());
      let buffer = new Buffer(_file).toString('base64');
      const mailjet = require('node-mailjet')
        .connect("b99ece9f73ba590adf72fcd20ab592ff", "2e1a60418718eba9f98403cb684a1bd4")
      const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
          "Messages": [
            {
              "From": {
                "Email": "msn@proreact.dk",
                "Name": "The LEGO Brick"
              },
              "To": [
                {
                  "Email": "msn@proreact.dk",
                  "Name": "Martin"
                }
              ],
              "Subject": moment().format("YYYY-MM-DD - HH:mm") + " - LEGO SQL DUMP!",
              "TextPart": "Todays SQL DUMP",
              "HTMLPart": "<h3>Todays SQL DUMP!</h3><br /> !",
              "Attachments": [
                {
                  "ContentType": "text/plain",
                  "Filename": data.stdout,
                  "Base64Content": buffer
                }
              ]
            }
          ]
        });
      return request
    })
    .catch((e) => {
      console.log("MAILJET: ", e);
    })
    .then((res) => {
      console.log("MAILJET SEND. SHOULD BE SUCCESSFUL");
    })
    .catch((e) => {
      console.log(e);
    });
});