const Canvas = require('canvas');
const fs = require("fs");

const avatarValidate = async (imagePath, side) => {
    try {
        const canvas = Canvas.createCanvas(side, side);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        const circle = {
            x: side / 2,
            y: side / 2,
            radius: side / 2,
        }

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(imagePath);
        context.save();
        context.translate(0, 0);
        if (avatar.height == avatar.width)
            context.scale(side / avatar.height, side / avatar.width);
        else if (avatar.height <= avatar.width)
            context.scale(side / avatar.height, side / avatar.height);
        else
            context.scale(side / avatar.width, side / avatar.width);

        context.drawImage(avatar, 0, 0);
        context.restore();

        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("avatar.png", buffer);
    } catch (error) {
        console.error(error);
    }
}

avatarValidate(process.argv[2], 512);