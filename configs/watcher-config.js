const SUCCESS_UPDATE_INTERVAL = msInMin(5);
const FAIL_UPDATE_INTERVAL = msInMin(60);
const SUCCESS_TEXT = encodeURIComponent('✅ There are some tickets 🎫');
const FAIL_TEXT = encodeURIComponent('#UATMode 🚫 There are no tickets');

module.exports = {
    SUCCESS_UPDATE_INTERVAL,
    FAIL_UPDATE_INTERVAL,
    SUCCESS_TEXT,
    FAIL_TEXT
};

function msInMin(min) {
    return Number.parseFloat(min) * 60 * 1000;
}
