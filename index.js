const { openBrowser, goto, text, deleteCookies } = require("taiko");
const axios = require('axios')

;(async () => {
  try {
    await openBrowser({
      host: "localhost",
      port: 9223,
      headless: false,
    });

    await deleteCookies()
    await goto(process.env.BASEURL);

    if (await text(process.env.UNWANTED_TEXT).exists()) {
      console.log('Unwanted text found. Site did not change. Exiting...')
      process.exit(0)
    }

    console.log('notifying')
    await notify()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})();

async function notify() {
  try {
    await axios.post('https://api.eu.opsgenie.com/v2/alerts', {
      message: 'website changed!'
    }, {
      headers: {
        Authorization: `GenieKey ${process.env.OPSGENIE_API_KEY}`
      }
    })
  } catch (e) {
    throw new Error('Error triggering alert: ' + JSON.stringify(e.response?.data))
  }
}
