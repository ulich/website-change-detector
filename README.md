# website-change-detector

Checks when a website changes and notifies you via OpsGenie

## Running locally 

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9223 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')

    export BASEURL="https://the-website-to-check.com"
    export OPSGENIE_API_KEY="xxxxx"
    export UNWANTED_TEXT="When this text is not found on the page, it must have changed"
    node index.js
