#!/bin/ash

set -e

if [ -z $BASIC_AUTHS ]; then
  echo >&2 "BASIC_AUTHS must be set"
  exit 1
fi

PASSWORD_FILE=/etc/nginx/.htpasswd

touch $PASSWORD_FILE

IFS="," set -- "$BASIC_AUTHS"
for AUTH in $@
do
  IFS=":" set -- "$AUTH"
  htpasswd -bB $PASSWORD_FILE $1 $2
done

exec nginx -g "daemon off;"
