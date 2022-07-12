#!/bin/bash


GREEN='\033[0;32m' # Green
BLUE='\033[0;34m' # Blue
RED='\033[1;31m' # Red
NC='\033[0m' # No Color
die() {
	echo -e $RED"$*"$NC >&2
	exit -1
}
step() {
	echo -e $BLUE"$*"$NC >&2
}

SCRIPTPATH=$(dirname $0)
function usage () {
    echo "Usage: $0 environment" 1>&2
    exit 1
}

function log_message () {
    level="$1"
    msg="$2"
    echo "[$level] [$(date -u +"%Y-%m-%d %H:%M:%S")] $msg"
}

environment="$1"
environment_file="deploy-$environment.conf"

[ "$1" == "" ]  && {
    die "You should provide an environment as command line"
}

[ -f "$environment_file" ] || {
    die "Environment $environment_file does not exist, read the README for more info"
}

source "$environment_file"
echo configuration loaded

deploy_server=$DEPLOYMENT_HOST
deploy_path=$DEPLOYMENT_PATH
port="$DEPLOYMENT_PORT"
user="$DEPLOYMENT_USER"
build="$BUILD_ENVIRONMENT"
if [ "$build" != "" ]
then
    build_subcomand=build:$build
else
    build_subcomand=build
fi

today=$(date +"%Y-%m-%d_%H%M%S")
dest_dir="$deploy_path/build_$today"
app_dir="$deploy_path/build"
alias_dir="build_$today"

function build () {
    log_message "INFO" "Building project"
    npm run $build_subcomand

    if [ $? != 0 ]
    then
        log_message "ERROR" "An error ocurred building app $?"
        exit -1
    fi
}

function upload () {
    RSYNC_RSH="ssh -p $port"
    SCRIPTPATH=$(dirname $0)
    export RSYNC_RSH
    log_message "INFO" "Uploading build build_$today to $deploy_server:$port"
    rsync -avz $SCRIPTPATH/../build/* $user@$deploy_server:$dest_dir
    if [ $? != 0 ]
    then
        log_message "ERROR" "An error ocurred uploading code: $?"
        exit -1
    fi

    log_message "INFO" "Linking new build... "
    ssh $user@$deploy_server -p $port "rm $app_dir; ln -s $alias_dir $app_dir"
    if [ $? != 0 ]
    then
        log_message "ERROR" "An error ocurred linking new build $?"
        exit -1
    fi
    unset RSYNC_RSH
}

log_message "INFO" "Build with env: $build"

build
upload
log_message "INFO" "Build finished, I did well my job!!"
