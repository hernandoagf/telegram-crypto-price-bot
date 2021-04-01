const { Telegraf } = require('telegraf')
const { CronJob } = require('cron')
const dotenv = require('dotenv')

const { getTokenData } = require('./fetchData')
const { numberWithCommas } = require('./utils')

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

let chatId

bot.start(async (ctx) => {
  chatId = (await ctx.getChat()).id

  priceMessageJob.start()
})

const priceMessageJob = new CronJob('0 * * * *', async () => {
  const { price, volume, symbol } = await getTokenData()

  bot.telegram.sendMessage(
    chatId,
    `💰 <b>${symbol}</b>: $${numberWithCommas(price)} | 📈 Volume (today): $${numberWithCommas(volume)}`,
    { parse_mode: 'HTML' }
  )
})

bot.launch()