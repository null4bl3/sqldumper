# SQLDUMPER
SQL dump auto mailer for Linux using node.js and bash.

The script runs on a system using [node-cron](https://github.com/merencia/node-cron) to trigger a bash script in a node.js child_process, the bash script creates a MySQL dump of a database and mails the file to the recipients of your choice.

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

**PROJECT** - The project name. Used for file naming.

**DATABASE.DB** - The database to create a dump from

**DATABASE.USER** - The database user

**DATABASE.PASS** - The database password

**MAILJET.MAILFROM** - A string containing the email of a an approved mailjet email.

**MAILJET.MAILTO** - An array of objects of contacts with Name and Email values

**MAILJET.PUBKEY** - The mailjet public key

**MAILJET.SECRET** - The mailjet secret

**CRON** - A cron string structured as: **0 0 0 * * \* **

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
