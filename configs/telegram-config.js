const telegramUrl = `https://api.telegram.org/bot${
    process.env.BOT_TOKEN
}/sendMessage?chat_id=-284006908`;

module.exports = telegramUrl;
