const sharp = require('sharp')

const imageMetadata = async () => {
  const metadata = await sharp('./took-modified512.png').metadata()

  console.log(metadata)
}

imageMetadata()
