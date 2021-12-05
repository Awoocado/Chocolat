const Eris = require("eris-additions")(require("eris"));
const ReactionHandler = require('eris-reactions');
const giphy = require('giphy-api')('');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes especificar términos para buscar.').then(m => setTimeout(() => m.delete(), 6000));
  if (filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    return message.channel.createMessage(':x: | Evite introducir palabras no deseadas en la búsqueda.').then(m => setTimeout(() => m.delete(), 6000))
  }
  message.channel.createMessage(':arrows_counterclockwise: Buscando...')
    .then(m => {
      giphy.search({
        q: args.join(' '),
        limit: 5
      }, async function (err, res) {
        if (err) return message.channel.createMessage('Ocurrió un error en la búsqueda de gifs.\nDetalles del error: `'+err+'`.');
        if (!res.data) return m.edit(':x: | No se han encontrado resultados para su búsqueda.').then(m => setTimeout(() => m.delete(), 6000));
        if (!res.data[0]) return m.edit(':x: | No se han encontrado resultados para su búsqueda.').then(m => setTimeout(() => m.delete(), 6000));
        else m.edit('');

        let key1 = res.data[0].url.substr(res.data[0].url.lastIndexOf('-') + 1);
        let url1 = `https://media.giphy.com/media/${key1}/giphy.gif`;
        let key2 = res.data[1].url.substr(res.data[1].url.lastIndexOf('-') + 1);
        let url2 = `https://media.giphy.com/media/${key2}/giphy.gif`;
        let key3 = res.data[2].url.substr(res.data[2].url.lastIndexOf('-') + 1);
        let url3 = `https://media.giphy.com/media/${key3}/giphy.gif`;
        let key4 = res.data[3].url.substr(res.data[3].url.lastIndexOf('-') + 1);
        let url4 = `https://media.giphy.com/media/${key4}/giphy.gif`;
        let key5 = res.data[4].url.substr(res.data[4].url.lastIndexOf('-') + 1);
        let url5 = `https://media.giphy.com/media/${key5}/giphy.gif`;
        let pages = [url1, url2, url3, url4, url5];
        let page = 1;

        const embed = new Eris.Embed()
          .author("Resultado de búsqueda de Gifs para: '" + args.join(' ') + "'", `https://icdn4.digitaltrends.com/image/api_giphy_logo-1200x630-c-ar1.91.png`)
          .image(pages[page - 1])
          .color(Math.floor(Math.random() * 0xffffff))
          .footer(`Página ${page} de ${pages.length}`)
        m.edit({ embed })
        
        await m.addReaction('⏪');
        await m.addReaction('⏩');
        
        const backwards = new ReactionHandler.continuousReactionStream(m, (userID) => userID === message.author.id, false, { maxMatches: 20, time: 360000 });
        const forwards = new ReactionHandler.continuousReactionStream(m, (userID) => userID === message.author.id, false, { maxMatches: 20, time: 360000 });

        backwards.on('reacted', r => {
          if (r.emoji.name !== '⏪') return;
          if (page === 1) return;
          page--;
          const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).author("Resultado de búsqueda de Gifs para: '" + args.join(' ') + "'", `https://icdn4.digitaltrends.com/image/api_giphy_logo-1200x630-c-ar1.91.png`);
          embed.image(pages[page - 1]);
          embed.footer(`Página ${page} de ${pages.length}`);
          m.edit({ embed });
        });

        forwards.on('reacted', r => {
          if (r.emoji.name !== '⏩') return;
          if (page === pages.length) return;
          page++;
          const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).author("Resultado de búsqueda de Gifs para: '" + args.join(' ') + "'", `https://icdn4.digitaltrends.com/image/api_giphy_logo-1200x630-c-ar1.91.png`);
          embed.image(pages[page - 1]);
          embed.footer(`Página ${page} de ${pages.length}`);
          m.edit({ embed });
        });
      });
    });
};

exports.config = {
  command: 'giphy',
  category: 'Comandos de Búsqueda',
  permissions: 'Ninguno',
  description: 'Busca gifs en Giphy. Puedes hacer click en las reacciones que aparecen abajo del Embed para navegar entre los resultados.',
  usage: '{prefix}giphy <términos>',
  example: '{prefix}giphy Anime Hug\n\nEsto buscará gifs de abrazos en el anime. La búsqueda no tiene porqué ser en inglés.',
  aliases: ['gif'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 20000
};
