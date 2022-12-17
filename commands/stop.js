const schedule = require('node-schedule');

exports.execute = (bot, msg) => {
    schedule.gracefulShutdown();

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Уведомления остановлены:(");
};

