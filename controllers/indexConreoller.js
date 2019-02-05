const moment = require('moment');
const pageWatcher = require('../services/pageWatcher');

exports.getWebpage = async (req, res) => {
    const isSelling = pageWatcher.getStatus();
    res.render('index', {
        title: isSelling
            ? 'There are some tickets on '
            : 'There is no tickets avaliable on',
        url: 'https://msk.kassir.ru/koncert/metallica',
        time: moment().format('LLL')
    });
};
