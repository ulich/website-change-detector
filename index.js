const { openBrowser, goto, text, $, deleteCookies } = require("taiko");
const axios = require('axios');

; (async () => {
  try {
    await openBrowser({
      host: "localhost",
      port: 9223,
      headless: false,
    });

    await deleteCookies()
    await goto(process.env.URL);

    const textFound = (await $(process.env.CSS_SELECTOR).text()).trim()
    console.log('Text found:', textFound)

    if (textFound === process.env.UNWANTED_TEXT) {
      console.log('Unwanted text found. Site did not change. Exiting...')
      process.exit(0)
    }

    console.log(`notifying`)
    await notify(textFound)
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})();

async function notify(textFound) {
  try {
    if (process.env.OPSGENIE_API_KEY) {
      await notifyViaOpsGenie(textFound)
    } else if (process.env.SLACK_WEBHOOK_URL) {
      await notifyViaSlack(textFound)
    } else {
      throw new Error('Neither OPSGENIE_API_KEY nor SLACK_WEBHOOK_URL provided. Exiting')
    }
  } catch (e) {
    throw new Error('Error triggering alert: ' + JSON.stringify(e.response?.data ?? e.message))
  }
}

async function notifyViaOpsGenie(textFound) {
  await axios.post('https://api.eu.opsgenie.com/v2/alerts', {
    message: `website changed! Text found was: ${textFound}`
  }, {
    headers: {
      Authorization: `GenieKey ${process.env.OPSGENIE_API_KEY}`
    }
  })
}

async function notifyViaSlack(textFound) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `Change detected on ${process.env.URL}! Text found was: ${textFound}`
  })
}
