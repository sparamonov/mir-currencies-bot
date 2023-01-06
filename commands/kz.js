// Import the libraries
const request = require('request');
const cheerio = require('cheerio');

// URL of the website with the currency rates
const url = 'https://mironline.ru/support/list/kursy_mir/';
// Export the execute function
exports.execute = (bot, msg) => {
    // Get the chat ID
    const chatId = msg.chat.id;

    // Send a message to the chat
    // bot.sendMessage(chatId, 'Fetching the current rates of currencies...');

    // Make a request to the URL
    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            // Load the HTML response into cheerio
            const $ = cheerio.load(html);

            // Use cheerio to find the elements containing the currency rates
            const rates = $('tbody tr');

            // Iterate over the rates and extract the currency code and rate
            rates.each((i, element) => {
                const code = $(element).find('td p[style*=\"text-align: left\"]').text().trim();
                const rate = $(element).find('td p[style*=\"text-align: center\"]').text().trim();

                if (code === 'Казахстанский тенге' && rate) {
                    bot.sendMessage(chatId, `${code}: ${rate}`);
                }
            });
        } else {
            bot.sendMessage(chatId, 'I can\'t parse message from nspk');
        }
    });
};
