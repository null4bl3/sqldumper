#!/bin/sh

#----------------------------------------------------------
#	MYSQL BACKUP SCRIPT BY NULL4BL3
#----------------------------------------------------------

# VARIABLES
FILE=$1.sql.`date +"%Y%m%d"`
DBSERVER=127.0.0.1
DATABASE=$2
USER=$3
PASS=$4

# IF RUN MORE THAN ONCE A DAY, RM THE PREVIOUS VERSION OF THE DB FILE
unalias rm     2> /dev/null
rm ${FILE}     2> /dev/null
rm ${FILE}.gz  2> /dev/null

# RUN DUMP
mysqldump --opt --user=${USER} --password=${PASS} ${DATABASE} > ${FILE}

#  GZIP DUMP FILE
gzip $FILE

# PRINT RESULT
SEND_FILE="${FILE}.gz"
echo ${SEND_FILE}
