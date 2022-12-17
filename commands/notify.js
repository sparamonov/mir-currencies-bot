// Import the libraries
const request = require('request');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
// schedule.scheduleJob('0/5 * * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
// });

// URL of the website with the currency rates
const url = 'https://mironline.ru/support/list/kursy_mir/';

const currencies = [
    "Казахстанский тенге",
    "Узбекский сум",
    "Армянский драм",
    "Таджикский сомони",
    "Кыргызский сом",
    "Армянский драм",
    "Белорусский рубль",
    "Вьетнамский донг",
]

// Export the execute function
exports.execute = (bot, msg) => {
    // Get the chat ID
    const chatId = msg.chat.id;

    // Send a message to the chat
    bot.sendMessage(chatId, "Выберите валюту, по которой хотите получать уведомление:", {
        "reply_markup": {
            "keyboard": [
                ["Казахстанский тенге"],
                ["Узбекский сум"],
                ["Армянский драм"],
                ["Таджикский сомони"],
                ["Кыргызский сом"],
                ["Армянский драм"],
                ["Белорусский рубль"],
                ["Вьетнамский донг"]
            ]
        }
    });

    let userCurrency = "";
    let userRate = "";

    bot.on('message', (msg) => {
        const userText = msg.text.toString();

        if (currencies.includes(userText)) {
            userCurrency = userText;
            bot.sendMessage(chatId, "Укажите курс, при достижении которого бот должен прислать уведомление");
        } else if (Number(userText.replace(",", "."))) {
            userRate = userText;
            bot.sendMessage(chatId, `При достижении валютой \"${userCurrency}\" курса \"${userRate}\" будет отправлено соответствующее уведомление`);
        }
    });

    // Make a request to the URL
    function rateRequest() {
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                // Load the HTML response into cheerio
                const $ = cheerio.load(html);

                // Use cheerio to find the elements containing the currency rates
                const rates = $('tbody tr');

                // Iterate over the rates and extract the currency code and rate
                rates.each((i, element) => {
                    const code = $(element).find('td p[style*=\"text-align: left\"]').text().trim();
                    const rate = $(element).find('td p[style*=\"text-align: center\"]').text().trim();

                    if (code && rate && code === userCurrency && rate <= userRate) {
                        bot.sendMessage(chatId, `${code}: ${rate}`);
                    }
                });
            } else {
                bot.sendMessage(chatId, 'I can\'t parse message from nspk');
            }
        });
    }
    // schedule.scheduleJob('10 11 * * *', rateRequest);
    schedule.scheduleJob('0/5 * * * * *', rateRequest);
};
