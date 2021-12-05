const booru = require('booru');
const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(":x: | No puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000));
  // if (!args.join(' ')) return message.channel.createMessage(':x: | Ingrese un tag para usar correctamente el comando. Si quiere ver una lista de tags use el comando: `{prefix}konachan tags`'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000));
  if (args.join(' ') == 'tags') {
    const embed = new Eris.Embed()
      .title('Tags de Konachan')
      .description('Estos son **algunos** tags de Konachan que podrás usar de la siguiente manera `{prefix}konachan <tag>`:\n\n**ass\nbow\nblush\nbreast\ncensored\ncunnilingus\ncum\nclose\nflat_chest\nfellatio\nfingering\nnipples\nnude\npanties\npenis\npussy\nrealistic\nsex\nuncensored\nyuri**'.replace(/{prefix}/gi, require('../../config.json').prefix))
      .footer('También puedes combinar los tags para obtener mejores resultados.')
      .color(Math.floor(Math.random() * 0xffffff))
    return message.channel.createMessage({ embed })
  };

  booru.search('kc', [args.join(' ')], {
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
        message.channel.createMessage(`:x: | Ocurrió un error al tratar de pedir imágenes a Konachan.`);
      } else {
        //This means I messed up. Whoops.
        message.channel.createMessage(`:x: | Ocurrió un error al tratar de pedir imágenes a Konachan.`);
      };
    });
};

exports.config = {
  command: "konachan",
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Busca 3 imágenes aleatorias en Konachan.com. Puedes incluir tags de búsqueda para obtener mejores resultados. Escribe `tags` para ver la lista de tags NSFW disponibles.',
  usage: '{prefix}konachan [Tag]',
  example: '{prefix}konachan | {prefix}konachan uncensored | {prefix}konachan tags\n\n1. *{prefix}konachan*: Buscará 3 imágenes aleatorias de Konachan.com, de cualquier tag. (Tienden a ser imágenes SFW)\n2. *{prefix}konachan tag*: Esto buscará 3 imágenes aleatorias que tengan el tag especificado.\n3. *{prefix}konachan tags*: Mostrará la lista de tags NSFW disponibles. Se recomienda combinar tags para mejores resultados.',
  aliases: ['kon', 'kchan'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 10000
};