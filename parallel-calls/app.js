
// input -> URL

const { determineFileSize } = require("./modules/determine-file-size/app");
const { getNetworkDownloadSpeed } = require("./determine-network-speed/app");

// find file size by requesting and calculating the data size of the response

// network speed divided by file size

// wrap the callback in retry

// wrap it in the runThisTaskLater

// run function according to the network speed parallelly
(async function () {
    const { bps: networkSpeed } = await getNetworkDownloadSpeed();
    const fileSize = await determineFileSize();

    const approxConcurrencyLimit = Math.ceil(fileSize / networkSpeed);

    console.log("approxConcurrencyLimit", approxConcurrencyLimit)

})();

// while (funcs.length) {
//     // 100 at a time
//     await Promise.all( funcs.splice(0, 100).map(f => f()) )
//   }


// function retry(fn, n) {
//     let promise;
//     for (let i = 0; i < n; i++) {
//       if (!promise) promise = fn();
//       else promise = promise.catch(() => fn());
//     }
//     promise.catch(() => {
//       throw new Error(`Failed retrying ${n} times`);
//     });
//     return promise;
//   }