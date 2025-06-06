#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

>&2 echo "Postgres is up - executing command"
exec $cmd
