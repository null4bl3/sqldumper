# SQLDUMPER
SQL dump auto mailer for Linux using node.js and bash.
The script runs on a system using [node-cron](https://github.com/merencia/node-cron) to trigger a bash script in a node.js child_process, that creates a MySQL dump of a database and mails the file to an email of your choice.

## Requirements
A [mailjet](https://www.mailjet.com/) account.

## Installation
```
git clone https://github.com/null4bl3/sqldumper
cd sqldumper
npm install
```

## Configuration
This project needs a file called "config.json" in the root of the project directory.

The config file should contain the following parameters:

```
{
  "PROJECT": "",
  "DATABASE": {
    "DB": "",
    "USER": "",
    "PASS": ""
  },
  "MAILJET": {
    "MAILFROM": "",
    "MAILTO": [
      {
        "Email": "",
        "Name": ""
      }
    ],
    "PUBKEY": "",
    "SECRET": ""
  },
  "CRON": ""
}
```
*'MAILFROM' is in the form of an email string value *


The cron job requires a [cron](https://github.com/merencia/node-cron) job like:

**"0 0 0 * * \*"**

*( this example runs every day at midnight )*

The application uses [npm run script](https://docs.npmjs.com/cli/run-script) functionality, meaning that to start the application daemonized run:

 ```
npm run start
 ```
And to stop:


 ```
npm run stop
 ```
