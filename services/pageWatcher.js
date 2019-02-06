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
        }, 0000);
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

        const token = '669688833:AAEr1hz0F9lhOKkZqg_65SrcCSeY4MAapq8';
        const recipient = 'hostile_d' ;


        const req = https.request({
            hostname: 'api.telegram.org',
            path:
                `/bot${token}/sendMessage?chat_id=${recipient}&text=${this.status}`,
            method: 'GET'
        }).on('error', e => {
            console.error(e);
        });
    }
}
const PageWatcherInstance = new PageWatcher();
module.exports = PageWatcherInstance;
