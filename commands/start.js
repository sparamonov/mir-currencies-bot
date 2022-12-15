// Export the execute function
exports.execute = (bot, msg) => {
    // Get the chat ID and user's name
    const chatId = msg.chat.id;
    const userName = msg.from.first_name;

    // Send a message to the chat
    bot.sendMessage(chatId, `Hello ${userName}! I am a bot that can provide you with information about the current rates of currencies. Use the /rates command to get it.`);
};
