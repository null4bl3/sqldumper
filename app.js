const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const util = require("util");
const fs = require("fs");
const moment = require("moment");
const conf = require("./config.json");
let cron = require("node-cron");

console.log();
console.log("SQLDUMPER INITIALISED !");
console.log();

cron.schedule(conf.CRON, () => {
  const ls = spawn("./sql_dumper.sh", [
    conf.PROJECT,
    conf.DATABASE.DB,
    conf.DATABASE.USER,
    conf.DATABASE.PASS
  ]);

  ls.stdout.on("data", (ok) => {
    let data = ok.toString();
    console.log("SQL DUMP FILE: ", data);
    let _file = fs.readFileSync(process.cwd() + "/" + data.trim());
    let buffer = new Buffer(_file).toString("base64");
    const mailjet = require("node-mailjet").connect(
      conf.MAILJET.PUBKEY,
      conf.MAILJET.SECRET
    );
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: conf.MAILJET.MAILFROM,
            Name: conf.PROJECT + " CRON MAIL"
          },
          To: conf.MAILJET.MAILTO,
          Subject: moment().format("YYYY-MM-DD - HH:mm") + " - " + conf.PROJECT + " SQL DUMP!",
          TextPart: "Todays SQL DUMP",
          HTMLPart:
            "<br><h3>SQL DUMP from today: <br> " +
            moment().format("YYYY/MM/DD - HH:mm") +
            "</h3><br><br><br><br>",
          Attachments: [
            {
              ContentType: "text/plain",
              Filename: data,
              Base64Content: buffer
            }
          ]
        }
      ]
    });
    request
      .then((res) => {
        if (
          res &&
          res.body &&
          res.body.Messages[0].Status &&
          res.body.Messages[0].Status === "success"
        ) {
          console.log("SQL DUMP SEND");
        } else {
          console.log("SQL DUMP FAILED!");
        }
      })
      .catch((e) => {
        console.log("MAILJET ERROR:");
        console.log(e);
      });
  });

  ls.stderr.on("data", (data) => {
    console.log("ERROR: ");
    console.log(data.toString());
  });
});
