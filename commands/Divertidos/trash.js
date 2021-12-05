const Canvas = require('canvas');
const pixelUtil = require('pixel-util');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];

  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario.').then(m => setTimeout(() => m.delete(), 6000))
  let Image = Canvas.Image,
  canvas = Canvas.createCanvas(479, 536),
  ctx = canvas.getContext('2d');  
  const img1 = await pixelUtil.createBuffer('./data/img/trash.png');
  let img = new Image;
  img.src = img1;
  ctx.drawImage(img, 0, 0, 479, 536);
  const img3 = await pixelUtil.createBuffer('https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png');
  let img2 = new Image;
  img2.src = img3;
  function drawImageR(image, x, y, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y);
    ctx.rotate(rotation);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
  } 
  drawImageR(img2, 230, 150, 1.1, 12.75);
  drawImageR(img2, 330, 488, 0.19, 15.38); 

   message.channel.createMessage(undefined, { file: canvas.toBuffer() , name: 'trash.png' });
};

exports.config = {
  command: 'trash',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Admite que el usuario mencionado es basura. **NOTA:** Por favor usar este comando con criterios de diversión **y no para ofender a los demás**. Si te sientes ofendido por el uso de este comando, puedes desactivarlo con `{prefix}disable trash` si eres Administrador.\n~~Cortesía: WEEZ API.~~ Nos vemos Weez... Gracias por todos esos +1,800,000 usos.',
  usage: '{prefix}trash <@usuario>',
  example: '{prefix}trash @MathError#6880\n\nEsto enviará una imagen generada admitiendo que el usuario mencionado es basura.',
  aliases: ['garbage'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};