#!/bin/sh

#----------------------------------------------------------
#
#			MYSQL BACKUP SCRIPT BY NULL4BL3
#
#----------------------------------------------------------

# (1) set up all the mysqldump variables
FILE=lego_prod.sql.`date +"%Y%m%d"`
DBSERVER=127.0.0.1
DATABASE=lego_cdn
USER=root
PASS=maartin1

# (2) in case you run this more than once a day, remove the previous version of the file
unalias rm     2> /dev/null
rm ${FILE}     2> /dev/null
rm ${FILE}.gz  2> /dev/null

# (3) do the mysql database backup (dump)

# use this command for a database server on localhost. add other options if need be.
mysqldump --opt --user=${USER} --password=${PASS} ${DATABASE} > ${FILE}

# (4) gzip the mysql database dump file
gzip $FILE

# (5) show the user the result
#echo "${FILE}.gz"
SEND_FILE="${FILE}.gz"

echo ${SEND_FILE}

