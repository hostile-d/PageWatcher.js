const https = require('https');
const cheerio = require('cheerio');
const mailer = require('./mailer');

class PageWatcher {
    constructor() {
        this.status = null;
        this.reqOptions = {
            hostname: 'msk.kassir.ru',
            port: 443,
            path: '/koncert/metallica',
            method: 'GET'
        };
        this.domSelector = '.buy-block';
        this._init();
    }

    _init() {
        setInterval(() => {
            this._loadPage();
        }, 30000);
    }

    getStatus() {
        return this.status;
    }

    _loadPage() {
        const req = https.request(this.reqOptions, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                this._parseBody(body);
            });
        });

        req.on('error', e => {
            console.error(e);
        });
        req.end();
    }

    _parseBody(body) {
        const $ = cheerio.load(body);
        this.status = $(this.domSelector).length > 0;
        mailer(
            this.status
                ? 'There are some tickets on '
                : 'There is no tickets avaliable on'
        );
    }
}
const PageWatcherInstance = new PageWatcher();
module.exports = PageWatcherInstance;
