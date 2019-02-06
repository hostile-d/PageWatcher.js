const https = require('https');
const cheerio = require('cheerio');
const { reqOptions, domSelector } = require('../configs/metallica-config');
class PageWatcher {
    constructor() {
        this.status = null;
        this._init();
    }

    _init() {
        setInterval(() => {
            this._loadPage();
        }, 3000);
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

        req.on('error', e => {
            console.error(e);
        });
        req.end();
    }

    _parseBody(body) {
        const $ = cheerio.load(body);
        this.status = $(domSelector).length > 0;
    }
}
const PageWatcherInstance = new PageWatcher();
module.exports = PageWatcherInstance;
