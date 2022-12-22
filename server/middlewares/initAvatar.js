const fs = require('fs')
const path = require('path')

async function initAvatar(userId) {
    console.log(userId)
    const result = fs.copyFileSync(
        path.join(__dirname,'../public/avatar/default.jpg'),
        path.join(__dirname,`../public/avatar/${userId}.jpg`)
    )

    return result
}

module.exports = initAvatar