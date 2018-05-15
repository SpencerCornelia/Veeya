#!/bin/bash -e

LOGFILE=/var/log/app.log
COUNT=0

echo "Running npm start..."
forever  -o $LOGFILE -e $LOGFILE start -c "npm start" .

while [ $COUNT -lt 15 ]; do
	echo "Waiting for log file..."
  	if [ -f $LOGFILE ]; then
	   echo "File $FILE exists."
	   break
	fi
        COUNT=$((COUNT+1))
  	sleep 1
done

tail -f $LOGFILE
