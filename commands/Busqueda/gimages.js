const Eris = require("eris-additions")(require("eris"));
const GoogleImages = require('google-images');
const ReactionHandler = require('eris-reactions');
const gclient = new GoogleImages('','');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(":x: | Debes escribir términos para buscar.").then(m => setTimeout(() => m.delete(), 6000));
  if (filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    return message.channel.createMessage(':x: | Evite introducir palabras no deseadas en la búsqueda.').then(m => setTimeout(() => m.delete(), 6000))
  }
  let m = await message.channel.createMessage(":arrows_counterclockwise: Buscando...");
  gclient.search(args.join(' '), {safe: 'medium'}).then(async images => {
    if (!images) return message.channel.createMessage(':x: | No se han encontrado resultados para su búsqueda.').then(m => setTimeout(() => m.delete(), 6000));
    else m.edit('');

    let img1 = images[0].url;
    let img2 = images[1].url;
    let img3 = images[2].url;
    let img4 = images[3].url;
    let img5 = images[4].url;

    let pages = [img1, img2, img3, img4, img5];
    let page = 1;

    const embed = new Eris.Embed()
      .author("Resultado de búsqueda de Imágenes para: '" + args.join(' ') + "'", `http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png`)
      .color(Math.floor(Math.random() * 0xffffff))
      .image(pages[page - 1])
      .footer(`Página ${page} de ${pages.length}`)
    m.edit({ embed });

    await m.addReaction('⏪');
    await m.addReaction('⏩');
    
    const backwards = new ReactionHandler.continuousReactionStream(m, (userID) => userID === message.author.id, false, { maxMatches: 20, time: 360000 });
    const forwards = new ReactionHandler.continuousReactionStream(m, (userID) => userID === message.author.id, false, { maxMatches: 20, time: 360000 });

    backwards.on('reacted', r => {
      if (r.emoji.name !== '⏪') return;
      if (page === 1) return;
      page--;
      const embed = new Eris.Embed().author("Resultado de búsqueda de Imágenes para: '" + args.join(' ') + "'", `http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png`).color(Math.floor(Math.random() * 0xffffff));
      embed.image(pages[page - 1]);
      embed.footer(`Página ${page} de ${pages.length}`);
      m.edit({ embed });
    });

    forwards.on('reacted', r => {
      if (r.emoji.name !== '⏩') return;
      if (page === pages.length) return;
      page++;
      const embed = new Eris.Embed().author("Resultado de búsqueda de Imágenes para: '" + args.join(' ') + "'", `http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png`).color(Math.floor(Math.random() * 0xffffff));
      embed.image(pages[page - 1]);
      embed.footer(`Página ${page} de ${pages.length}`);
      m.edit({ embed });
    });

  }).catch(error => {
    if (error === "HTTPError: Response code 403 (Forbidden)") return message.channel.createMessage(':x: | Los pedidos por día de este comando han acabado. Espera hasta el día siguiente para poder usar el comando de nuevo.')
    return message.channel.createMessage('Ha ocurrido un error al tratar de buscar imágenes.\nEs posible que los pedidos por día de este comando hayan acabado.')
  });
};

exports.config = {
  command: 'gimages',
  category: 'Comandos de Búsqueda',
  permissions: 'Ninguno',
  description: 'Busca imágenes en Google Imágenes. Puedes hacer click en las reacciones que aparecen abajo del Embed para navegar entre los resultados.\n**NOTA IMPORTANTE**: Por día solo se puede usar el comando 100 veces aplicado a todos los servidores, debido a que la API que el bot usa es una limitada que solo admite 100 pedidos por día, ofrecida por Google Cloud Platform para usuarios no pagos. Para extender los pedidos por día, se debe comprar una API que admita mucho más pedidos, y eso no es precisamente barato. Lamentamos los inconvenientes.',
  usage: '{prefix}gimages <términos>',
  example: '{prefix}gimages Aviones de Guerra\n\nEsto buscará imágenes de aviones de guerra.',
  aliases: ['images', 'img'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 25000
};