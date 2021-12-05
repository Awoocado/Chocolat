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
  if (!args.join(' ')) return message.channel.createMessage(':x: | Escribe el texto del logro.').then(m => setTimeout(() => m.delete(), 6000));
  if (args.join(' ').length > 40) return message.channel.createMessage(':x: | Excediste el máximo de caracteres permitidos (40).').then(m => setTimeout(() => m.delete(), 6000))
if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let Image = Canvas.Image,
  canvas = Canvas.createCanvas(680, 167),
  ctx = canvas.getContext('2d');
  const img1 = await pixelUtil.createBuffer('./data/img/achi.png');
  let img = new Image;
  img.src = img1;
  ctx.drawImage(img, 0, 0, 680, 167);
  ctx.font = "22px Console";
  ctx.fillStyle = "#cfcdcb";
  ctx.fillText(`${args.join(' ')}`, 149, 92);
  message.channel.createMessage(undefined, { file: canvas.toBuffer(), name: 'achievement.png' })
}

exports.config = {
  command: 'achievement',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Genera un logro al estilo clásico de XBOX. El texto solo puede admitir un máximo de 40 caracteres.\n~~Cortesía: WEEZ API.~~ Nos vemos Weez... Gracias por todos esos +1,800,000 usos.',
  usage: '{prefix}achievement <texto>',
  example: '{prefix}achievement Sin internet por 1 año.\n\nEsto generará un logro al estilo clásico de XBOX con el texto especificado.',
  aliases: ['ach'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 20000
}
