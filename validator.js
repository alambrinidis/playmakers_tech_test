const Canvas = require('canvas');

const avatarValidate = async (imagePath, side) => {
    try {
        const canvas = Canvas.createCanvas(side, side);
        const avatar = await Canvas.loadImage(imagePath);
        const context = canvas.getContext('2d');
        const radius = (side / 2) * 4;
        const center = ((side * side) / 2);
        context.drawImage(avatar, 0, 0, side, side);

        if (avatar.height != side || avatar.width != side) {
            console.log("Wrong dimensions: avatar has te be 512x512");
            return false;
        }
        const pixelData = context.getImageData(0, 0, side, side).data;
        for (x = 12; x < (side * 4) - 4; x = x + 4) {
            for (y = 3; y < side * 4; y = y + 4) {
                if ((y > Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) + radius || y < -(Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2))) + radius) && pixelData[y] != 0) {
                    console.log("Invalid avatar: non transparent pixel in position:", Math.round(x / 4), "x", Math.round(y / 4));
                    return false;
                }
            }
        }
        console.log("Success: avatar is valid");
    } catch (error) {
        console.error(error);
    }
}

avatarValidate(process.argv[2], 512);