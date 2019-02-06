let botToken = null;
if (process.env.BOT_TOKEN) {
    botToken = process.env.BOT_TOKEN;
} else {
    throw new Error('There is no process.env.BOT_TOKEN');
}

const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=-284006908`;

module.exports = telegramUrl;
