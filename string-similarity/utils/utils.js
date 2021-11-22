const fs = require('fs-extra')

const filterFunc = (src, dest) => {
    // your logic here
    // it will be copied if return true
}

fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc })