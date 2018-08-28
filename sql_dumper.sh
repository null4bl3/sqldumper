#!/bin/sh

#----------------------------------------------------------
#
#			        MYSQL BACKUP SCRIPT BY NULL4BL3
#
#----------------------------------------------------------

# # (1) SET UP MYSQLDUMP VARIABLES
FILE=$1.sql.`date +"%Y%m%d"`
DBSERVER=127.0.0.1
DATABASE=$2
USER=$3
PASS=$4

# # (2) IF RUN MORE THAN ONCE A DAY, RM THE PREVIOUS VERSION OF THE DB FILE
unalias rm     2> /dev/null
rm ${FILE}     2> /dev/null
rm ${FILE}.gz  2> /dev/null

# # (3) DO THE MYSQL DB BACKUP
mysqldump --opt --user=${USER} --password=${PASS} ${DATABASE} > ${FILE}

# # (4) GZIP THE MYSQL DB DUMP FILE
gzip $FILE

# # (5) PRINT RESULT
SEND_FILE="${FILE}.gz"
echo ${SEND_FILE}
