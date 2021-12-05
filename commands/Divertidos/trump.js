const Canvas = require('canvas');
const pixelUtil = require('pixel-util');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  };
  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes poner un mensaje para que sea aprobado por Donald Trump.').then(m => setTimeout(() => m.delete(), 6000))
  if (args.join(' ').length > 30) return message.channel.createMessage(':x: | Excediste el máximo de caracteres permitidos (30).').then(m => setTimeout(() => m.delete(), 6000))
  let Image = Canvas.Image,
  canvas = Canvas.createCanvas(600, 450),
  ctx = canvas.getContext('2d');
  const img1 = await pixelUtil.createBuffer('./data/img/trump.png');
  let img = new Image;
  img.src = img1;
  ctx.drawImage(img, 0, 0, 600, 450);
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split('-zY-.');
    let line = '';

    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
  ctx.font = "28px Console";
  ctx.rotate(.11);
  wrapText(ctx, args.join(' ').replace(/[^\dA-Za-zñáéíóúäëïöü]/g, ' ').replace(/(.{8})/g, '$1-zY-.').trim(), 430, 160, 11, 30);
  message.channel.createMessage(undefined, {file: canvas.toBuffer(), name:'trump.png'});
};

exports.config = {
  command: 'trump',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Redacta una ley para que Trump lo apruebe. El contenido de la ley tiene un límite de 30 caracteres.\n~~Cortesía: WEEZ API.~~ Nos vemos Weez... Gracias por todos esos +1,800,000 usos.',
  usage: '{prefix}trump <texto>',
  example: '{prefix}trump Internet gratis para todos en Latinoamérica.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};
