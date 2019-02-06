const pageWatcher = require('../services/pageWatcher');
const { reqOptions } = require('../configs/metallica-config');
exports.getWebpage = async (req, res) => {
    const isSelling = pageWatcher.getStatus();
    const time = pageWatcher.getTime();
    res.render('index', {
        title: isSelling
            ? 'There are some tickets on '
            : 'There is no tickets avaliable on',
        url: `https://${reqOptions.hostname}${reqOptions.path}`,
        time
    });
};
