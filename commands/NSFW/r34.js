const booru = require('booru');
exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(":x: | No puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000));
  
  booru.search('r34', [args.join(' ')], {
      limit: 3,
      random: true
    })
    .then(images => {
      //Log the direct link to each image
      for (let image of images) {
        message.channel.createMessage(image.file_url)
      }
    }).catch(err => {
      if (err.name === 'booruError') {
        //It's a custom error thrown by the package
        message.channel.createMessage(`:x: | Ocurrió un error al tratar de pedir imágenes a rule34.xxx.`);
      } else {
        //This means I messed up. Whoops.
        message.channel.createMessage(`:x: | Ocurrió un error al tratar de pedir imágenes a rule34.xxx.`);
      };
    });
};

exports.config = {
  command: "r34",
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Busca una imagen hentai en rule34.xxx. Puedes incluir tags de búsqueda para obtener mejores resultados.',
  usage: '{prefix}r34 [Tag]',
  example: '{prefix}r34 | {prefix}r34 pokemon\n\n1. *{prefix}r34*: Enviará 3 imágenes aleatorias de rule34.xxx\n2. *{prefix}r34 tag:* Enviará 3 imágenes aleatorias con el tag especificado.',
  aliases: ['rule34'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 10000
};