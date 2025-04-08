#!/bin/bash

#Function to generate WebdriverIO command with Yarn
run_Wdio(){
    local base_url="$1"
    local suite="$2"
    local include_ptid="$3"
    local exclude_ptid="$4"
    local include_tag="$5"
    local exclude_tag="$6"

    # Clean previous results
    echo "Cleaning previous Allure results..."
    rm -rf allure-results allure-report || true

    # Base command using yarn
    local cmd="yarn wdio run ./config/wdio.ci.conf.ts"

    #Append parameters if specified
    [ -n "$suite" ] && cmd+=" --suite=$suite"
    [ -n "$base_url" ] && cmd+=" --baseUrl=$base_url"
    [ -n "$include_ptid" ] && cmd+=" --includePTID=$include_ptid"
    [ -n "$exclude_ptid" ] && cmd+=" --excludePTID=$exclude_ptid"
    [ -n "$include_tag" ] && cmd+=" --includeTag=$include_tag"
    [ -n "$exclude_tag" ] && cmd+=" --excludeTag=$exclude_tag"

    echo "Executing: $cmd"
    
    # Run tests and capture exit code
    if ! eval "$cmd"; then
        echo "Test execution failed"
        # Still generate report if results exist
        generate_allure_report
        exit 1
    fi

    # Generate Allure report if tests passed
    generate_allure_report
}

 Function to generate Allure report
generate_allure_report() {
    if [ -d "allure-results" ]; then
        echo "Generating Allure report..."
        yarn allure generate allure-results --clean -o allure-report || {
            echo "Failed to generate Allure report"
            exit 1
        }
        echo "Allure report generated at: $(pwd)/allure-report"
    else
        echo "Warning: No Allure results found at allure-results"
        exit 1
    fi
}

# Example: Run smoke tests excluding quarantined
run_wdio "$@"