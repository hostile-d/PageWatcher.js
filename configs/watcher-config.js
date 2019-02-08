const UPDATE_INTERVAL = msInMin(5);
const SUCCESS_TEXT = encodeURIComponent('✅ There are some tickets 🎫');

module.exports = {
    UPDATE_INTERVAL,
    SUCCESS_TEXT
};

function msInMin(min) {
    return Number.parseFloat(min) * 60 * 1000;
}
