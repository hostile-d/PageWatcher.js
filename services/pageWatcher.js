const https = require('https');
const cheerio = require('cheerio');

const { reqOptions, domSelector } = require('../configs/metallica-config');
const telegramUrl = require('../configs/telegram-config');

const TRUE_UPDATE_INTERVAL = 300000;
const FALSE_UPDATE_INTERVAL = 1200000;
class PageWatcher {
    constructor() {
        this.status = null;
        this.timeFromLastFalseStatus = 0;
        this.successEndpoint = `${telegramUrl}&text=There%20are%20some%20tickets`;
        this.failureEndpoint = `${telegramUrl}&text=There%20is%20no%20tickets`;
        this._init();
    }

    _init() {
        setInterval(() => {
            this._loadPage();
            this.timeFromLastFalseStatus += TRUE_UPDATE_INTERVAL;
        }, TRUE_UPDATE_INTERVAL);
    }

    getStatus() {
        return this.status;
    }

    _loadPage() {
        const req = https.request(reqOptions, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                this._parseBody(body);
            });
        });

        req.on('error', e => {});
        req.end();
    }

    _parseBody(body) {
        const $ = cheerio.load(body);
        this.status = $(domSelector).length > 0;

        let url = null;

        console.log(this.status);
        if (this.status) {
            url = this.successEndpoint;
        } else if (
            !this.status &&
            this.timeFromLastFalseStatus > FALSE_UPDATE_INTERVAL
        ) {
            url = this.failureEndpoint;
            this.timeFromLastFalseStatus = 0;
        } else {
            return;
        }
        https.get(url).on('error', err => {
            console.log('Error: ' + err.message);
        });
    }
}
const PageWatcherInstance = new PageWatcher();
module.exports = PageWatcherInstance;
