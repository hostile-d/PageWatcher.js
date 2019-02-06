const moment = require('moment');
const pageWatcher = require('../services/pageWatcher');
const { reqOptions } = require('../configs/metallica-config');
exports.getWebpage = async (req, res) => {
    const isSelling = pageWatcher.getStatus();
    res.render('index', {
        title: isSelling
            ? 'There are some tickets on '
            : 'There is no tickets avaliable on',
        url: `${reqOptions.hostname}${reqOptions.path}`,
        time: moment().format('LLL')
    });
};
