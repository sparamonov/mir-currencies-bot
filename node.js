// Import the Telegram Bot API library
const TelegramBot = require('node-telegram-bot-api');

// Replace this with your node's access token
const ACCESS_TOKEN = '5750247191:AAE7Qa5jhumeuYfZo8-xF1m-lIdiHgz6v10';

// Create a new node instance
const node = new TelegramBot(ACCESS_TOKEN, { polling: true });

// Import the command modules
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const ratesCommand = require('./commands/rates');
// const notifyCommand = require('./commands/notify');
const stopCommand = require('./commands/stop');
const kzCommand = require('./commands/kz');

// Handle the /start command
node.onText(/\/start/, (msg) => {
    startCommand.execute(node, msg);
});

// Handle the /help command
node.onText(/\/help/, (msg) => {
    helpCommand.execute(node, msg);
});

// Handle the /rates command
node.onText(/\/rates/, (msg) => {
    ratesCommand.execute(node, msg);
});

// Handle the /notify command
// node.onText(/\/notify/, (msg) => {
//     notifyCommand.execute(node, msg);
// });

// Handle the /stop command
node.onText(/\/stop/, (msg) => {
    stopCommand.execute(node, msg);
});

// Handle the kz or кз command
node.onText(/kz|кз/, (msg) => {
    kzCommand.execute(node, msg);
});
