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
  }

  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000))

  if (!args.join(' ')) return message.channel.createMessage(':x: | Escribe la utilidad de su licencia.').then(m => setTimeout(() => m.delete(), 6000))
  if (args.join(' ').length > 26) return message.channel.createMessage(':x: | Excedió el límite de caracteres permitidos (26).').then(m => setTimeout(() => m.delete(), 6000))

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear() + 2;
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  var Image = Canvas.Image,
    canvas = Canvas.createCanvas(400, 225),
    ctx = canvas.getContext('2d');
  //https://cdn.discordapp.com/attachments/604911557276729366/633091979235819560/Licencia10.png
  const img1 = await pixelUtil.createBuffer('./data/img/licencia.png');
  let img = new Image;
  img.src = img1;
  ctx.drawImage(img, 0, 0, 400, 225);

  const img3 = await pixelUtil.createBuffer('https://cdn.discordapp.com/avatars/' + message.author.id + '/' + message.author.avatar + '.png');
  let img2 = new Image;
  img2.src = img3;
  ctx.drawImage(img2, 8, 7, 70, 73);
  ctx.font = "14px Console";
  ctx.fillText(`${message.author.username}.`, 130, 66);
  ctx.fillText(`#${message.author.discriminator}.`, 155, 97);
  ctx.fillText(`${message.author.id}.`, 195, 125);
  ctx.fillText(`${dd + '/' + mm + '/' + yyyy}`, 307, 168);
  ctx.fillText(`${args.join(' ')}.`, 108, 196);
  ctx.fillStyle = "#FF0000";
  ctx.fillText(`0${Math.round(Math.random() * 1000000)}`, 91, 168);

  message.channel.createMessage(undefined, { file: canvas.toBuffer(), name: 'Chocolicense.png' });
};

exports.config = {
  command: "license",
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Crea una licencia apropiada para cualquier momento. La utilidada de la licencia tiene un límite de 26 caracteres.',
  usage: '{prefix}license <texto>',
  example: '{prefix}license Conducir\n\nEste generará una imagen de una licencia con el texto especificado.',
  aliases: ['lcs'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 10000
};
