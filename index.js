// module.exports = async function App(context) {
//   await context.sendText('Hello World');
// };




const Block = require('./models').blocks;
const Payload = require('./models').payloads;
const { QueryTypes } = require('sequelize');

module.exports = async function App(context) {
    if(context.event.isText) {
        return HandleText;
    }
    if (context.event.isImage) {
        return HandleImage;
    }
    if (context.event.isAudio) {
        return HandleAudio;
    }
    if (context.event.isVideo) {
        return HandleVideo;
    }
    if (context.event.isFile) {
        return HandleFile;
    }
    if (context.event.isLocation) {
        return HandleLocation;
    }
    if (context.event.isDelivery) {
        return HandleDelivery;
    }
    if (context.event.isRead) {
        return HandleRead;
    }

    if (context.event.isLikeSticker) {
        await context.sendText('Good to know you like us!');
    }

    if (context.event.isPayload) {
        const page_id = context.event.pageId;
        if(context.event.payload === "GET_STARTED") {
            var block = await Block.findOne({ where : {page_id: page_id, name: "GET_STARTED"} });
            var payloads = await Payload.findAll({ where: {block_id: block.id } });
            for(payload of payloads) {
                HandlePayload(context, payload.payload_type, payload.body)
            }
        } else {
            var payloads = await Payload.findAll({ where: {block_id: context.event.payload } });
            console.log(payloads);
            for(payload of payloads) {
                HandlePayload(context, payload.payload_type, payload.body)
            }
        }
    }
};

async function HandlePayload(context, message_type, payload) {
    var body = JSON.parse(payload);
    if(message_type === "GALLERY") {
        await context.sendGenericTemplate([
            body[0]
        ]);
    }

    if(message_type === "TEXT") {
        if("buttons" in body[0]) {
            await context.sendButtonTemplate( body[0].title, body[0].buttons );
        } else {
            await context.sendText(body[0].title);
        }
    }
}

async function HandleText(context) {
    const page_id = context.event.pageId;
    var block = await Block.findOne({ where : {page_id: page_id, name: "DEFAULT"} });
    await context.sendText(`received the text: ${context.event.text}`);
    var payloads = await Payload.findAll({ where: {block_id: block.id } });
    for(payload of payloads) {
        HandlePayload(context, payload.payload_type, payload.body)
    }

}

async function HandleImage(context) {
  await context.sendText(`received the image: ${context.event.image.url}`);
}

async function HandleAudio(context) {
  await context.sendText(`received the audio: ${context.event.audio.url}`);
}

async function HandleVideo(context) {
  await context.sendText(`received the video: ${context.event.video.url}`);
}

async function HandleFile(context) {
  await context.sendText(`received the file: ${context.event.file.url}`);
}

async function HandleLocation(context) {
  const { coordinates } = context.event.location;
  await context.sendText(
    `received the location: lat: ${coordinates.lat}, long: ${coordinates.long}`
  );
}

async function HandleDelivery(context) {
  await context.sendText(`Watermark: ${context.event.delivery.watermark}`);
}

async function HandleRead(context) {
  await context.sendText(`Watermark: ${context.event.read.watermark}`);
}
