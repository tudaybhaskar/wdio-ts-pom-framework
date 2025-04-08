#!/bin/bash

#Function to generate WebdriverIO command with Yarn
run_Wdio(){
    local base_url="$1"
    local suite="$2"
    local include_ptid="$3"
    local exclude_ptid="$4"
    local include_tag="$5"
    local exclude_tag="$6"

    #Base command using yarn
    local cmd="yarn wdio run ./config/wdio.conf.ts"

    #Append parameters if specified
    [ -n "$suite" ] && cmd+=" --suite=$suite"
    [ -n "$base_url" ] && cmd+=" --baseUrl=$base_url"
    [ -n "$include_ptid" ] && cmd+=" --includePTID=$include_ptid"
    [ -n "$exclude_ptid" ] && cmd+=" --excludePTID=$exclude_ptid"
    [ -n "$include_tag" ] && cmd+=" --includeTag=$include_tag"
    [ -n "$exclude_tag" ] && cmd+=" --excludeTag=$exclude_tag"

    echo "Executing: $cmd"
    if ! eval "$cmd"; then
        echo "Test execution failed"
        exit 1
    fi
}

# Example: Run smoke tests excluding quarantined
run_wdio "$@"