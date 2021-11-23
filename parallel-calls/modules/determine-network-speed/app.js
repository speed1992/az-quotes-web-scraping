const NetworkSpeed = require('network-speed');
const testNetworkSpeed = new NetworkSpeed();

async function getNetworkDownloadSpeed() {
    const baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
    const fileSize = 500;
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSize);
    console.log(speed.bps)
    return speed;
}

module.exports.getNetworkDownloadSpeed = getNetworkDownloadSpeed