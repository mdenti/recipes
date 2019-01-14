#!/usr/bin/env bash
set -eo pipefail

maxTries=30
while [ "$maxTries" -gt 0 ] && ! mysql -h "$MYSQL_HOST" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" $MYSQL_DATABASE ; do
    echo $maxTries
    maxTries=$((maxTries-1))
    sleep 2
done
if [ "$maxTries" -le 0 ]; then
    echo >&2 'error: unable to contact MySql database after 30 tries'
    exit 1
fi

yarn migrate

case $1 in
  start)
    # The '| cat' is to trick Node that this is an non-TTY terminal
    # then react-scripts won't clear the console.
    yarn start-dev | cat
    ;;
  test)
    yarn test $@
    ;;
  *)
    exec "$@"
    ;;
esac