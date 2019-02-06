const https = require('https');
const cheerio = require('cheerio');
const moment = require('moment');
const { reqOptions, domSelector } = require('../configs/metallica-config');
const telegramUrl = require('../configs/telegram-config');
const {
    SUCCESS_UPDATE_INTERVAL,
    FAIL_UPDATE_INTERVAL,
    SUCCESS_TEXT,
    FAIL_TEXT
} = require('../configs/watcher-config');

class PageWatcher {
    constructor() {
        this.foundTickets = null;
        this.lastUpdated = null;
        this.sinceLastMessage = 0;
        this.successEndpoint = `${telegramUrl}&text=${SUCCESS_TEXT}`;
        this.failureEndpoint = `${telegramUrl}&text=${FAIL_TEXT}`;
        this._init();
    }

    getStatus() {
        return this.foundTickets;
    }

    getTime() {
        return this.lastUpdated;
    }

    _init() {
        this._setCurrentTime();
        setInterval(() => {
            this.sinceLastMessage += SUCCESS_UPDATE_INTERVAL;
            this._loadPage();
        }, SUCCESS_UPDATE_INTERVAL);
    }

    _loadPage() {
        const req = https.request(reqOptions, res => {
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                this._setCurrentTime();
                this._parseBody(body);
            });
        });

        req.on('error', err => {
            console.error(err.message);
        });
        req.end();
    }

    _parseBody(body) {
        const $ = cheerio.load(body);
        this.foundTickets = $(domSelector).length > 0;

        const sendFalse = this.sinceLastMessage >= FAIL_UPDATE_INTERVAL;

        if (this.foundTickets) {
            this._sendMessage(this.successEndpoint);
        } else if (!this.foundTickets && sendFalse) {
            this._sendMessage(this.failureEndpoint);
        }
    }

    _sendMessage(url) {
        const req = https.get(url, res => {
            res.on('data', data => {
                if (data.ok) {
                    this.sinceLastMessage = 0;
                }
            });
        });
        req.on('error', err => {
            console.error(err.message);
        });
    }

    _setCurrentTime() {
        this.lastUpdated = moment().format('LLL');
    }
}
const PageWatcherInstance = new PageWatcher();
module.exports = PageWatcherInstance;
