const Jimp = require('jimp');
const GIFEncoder = require('gifencoder');

exports.run = async (client, message, args) => {
  
  let user = message.mentions[0];
  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.mentions[0]) user = message.author;
  let avatarurl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;

 const options = {
    size: 256,
    frames: 8
  };
  const base = new Jimp(options.size, options.size);
  Jimp.read(avatarurl).then(function (avatar) {
    Jimp.read('https://media.discordapp.net/attachments/414868965479940096/447622254063255555/triggered.png?width=360&height=68').then(function (text) {
      Jimp.read('https://media.discordapp.net/attachments/414868965479940096/447622345314533382/red.png?width=270&height=270').then(function (tint) {

        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);

        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;

        stream.on('data', buffer => buffers.push(buffer));
        stream.on('end', () => {
          try {
            message.channel.createMessage(undefined, {
                file: Buffer.concat(buffers),
                name: 'triggered.gif'
            });
          } catch (e) {
            message.channel.createMessage(`:x: | Ocurrió un error al ejecutar el comando.\nEs posible que la imagen no se haya logrado a generar correctamente. O no tenga los permisos para publicarla.`)
          };
        });

        for (let i = 0; i < options.frames; i++) {
          temp = base.clone();

          if (i === 0) {
            temp.composite(avatar, -16, -16);
          } else {
            temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
          };

          temp.composite(tint, 0, 0);

          if (i === 0) {
            temp.composite(text, -10, 200);
          } else {
            temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
          };

          frames.push(temp.bitmap.data);
        };

        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
          encoder.addFrame(frame);
        };
        encoder.finish();

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
      }).catch(error => {
        return message.channel.createMessage(':x: | Ocurrió un error al ejecutar el comando.\nEs posible que la imagen no se haya logrado a generar correctamente o no tenga los permisos suficientes para publicarla.');
      });
    }).catch(error => {
      return message.channel.createMessage(':x: | Ocurrió un error al ejecutar el comando.\nEs posible que la imagen no se haya logrado a generar correctamente o no tenga los permisos suficientes para publicarla.');
    });
  }).catch(error => {
    return message.channel.createMessage(':x: | Ocurrió un error al ejecutar el comando.\nEs posible que la imagen no se haya logrado a generar correctamente o no tenga los permisos suficientes para publicarla.');
  });
};

exports.config = {
  command: 'triggered',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Desencadena el avatar de un usuario o el tuyo propio. Recuerda tener activado el permiso de "Adjuntar Archivos" para que el comando funcione.\n~~Cortesía: WEEZ API.~~ Nos vemos Weez... Gracias por todos esos +1,800,000 usos.',
  usage: '{prefix}triggered',
  example: '{prefix}triggered @MathError#6880\n\nEsto enviará un gif con el avatar del usuario mencionado en movimiento.',
  aliases: ['rage'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};