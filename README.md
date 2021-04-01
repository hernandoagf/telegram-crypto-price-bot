# telegram-crypto-price-bot

A Telegram bot to send crypto prices every 1 hour

## Scripts 👩‍💻

`npm run dev` will launch the bot locally, with hot reloading included.
`npm run start`: Starts up the bot without hot reloading; used for deployment.

### Configuration 🔧

First, install the dependencies:
`npm install`
`npm install -D`

For the bot to run, it needs these variables, laid out in the `.env.sample` file:

- `BOT_TOKEN`: Your Telegram bot token.
- `TOKEN_ID`: Your token ID on Honeyswap.
