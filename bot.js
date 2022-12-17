// Import the Telegram Bot API library
const TelegramBot = require('node-telegram-bot-api');

// Replace this with your bot's access token
const ACCESS_TOKEN = '5750247191:AAE7Qa5jhumeuYfZo8-xF1m-lIdiHgz6v10';

// Create a new bot instance
const bot = new TelegramBot(ACCESS_TOKEN, { polling: true });

// Import the command modules
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const ratesCommand = require('./commands/rates');
const notifyCommand = require('./commands/notify');
const stopCommand = require('./commands/stop');

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    startCommand.execute(bot, msg);
});

// Handle the /help command
bot.onText(/\/help/, (msg) => {
    helpCommand.execute(bot, msg);
});

// Handle the /rates command
bot.onText(/\/rates/, (msg) => {
    ratesCommand.execute(bot, msg);
});

// Handle the /notify command
bot.onText(/\/notify/, (msg) => {
    notifyCommand.execute(bot, msg);
});

// Handle the /stop command
bot.onText(/\/stop/, (msg) => {
    stopCommand.execute(bot, msg);
});
