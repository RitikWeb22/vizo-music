const { toFile } = require("@imagekit/nodejs")

const ImageKit = require("@imagekit/nodejs").default


const imagekit = new ImageKit({
    privateKey:process.env.IMAGE_KIT_KEY
})

async function uploadFile({buffer,fileName,folder=""}) {
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(buffer)),
        fileName:fileName,
        folder
    })
    return file
}

module.exports ={uploadFile}