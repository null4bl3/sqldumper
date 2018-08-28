# SQLDUMPER
SQL dump auto mailer for Linux.

## Requirements
A mailjet account.

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
The cron job requires a cron job like: "0 0 0 * * \*" ( this runs every day at midnight )
