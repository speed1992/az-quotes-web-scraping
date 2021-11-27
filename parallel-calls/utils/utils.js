const { determineFileSize } = require("./modules/determine-file-size/app");
const { getNetworkDownloadSpeed } = require("./determine-network-speed/app");

function getConcurrencyLimit() {
    const { bps: networkSpeed } = await getNetworkDownloadSpeed();
    const fileSize = await determineFileSize();

    const approxConcurrencyLimit = Math.ceil(fileSize / networkSpeed);

    console.log("approxConcurrencyLimit", approxConcurrencyLimit)

    return approxConcurrencyLimit;

}

export function retry(fn, n) {
    let promise;
    for (let i = 0; i < n; i++) {
        if (!promise) promise = fn();
        else promise = promise.catch(() => fn());
    }
    promise.catch(() => {
        throw new Error(`Failed retrying ${n} times`);
    });
    return promise;
}

module.exports.getConcurrencyLimit = getConcurrencyLimit