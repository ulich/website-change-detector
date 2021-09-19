# website-change-detector

Checks when a website changes and notifies you via OpsGenie or Slack

## Running locally 

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9223 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')

    export URL="https://the-website-to-check.com"
    
    // if you want to get notified via opsgenie
    export OPSGENIE_API_KEY="xxxxx"

    // if you want to get notified via slack
    export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/xxxxx"

    export CSS_SELECTOR=".some-css-selector"
    export UNWANTED_TEXT="If the element targeted via CSS_SELECTOR does not have this text, trigger the notification"
    node index.js
