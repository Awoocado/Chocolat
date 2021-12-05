const Eris = require("eris-additions")(require("eris"));
const get = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes poner el nombre de algún manga para buscar.').then(m => setTimeout(() => m.delete(), 6000));
  message.channel.createMessage(':arrows_counterclockwise: Buscando...').then(async m => {
    try {
      const res = await get('https://kitsu.io/api/edge/manga?filter[text]=' + encodeURIComponent(args.join(' ')));
      const body = await res.json();
      if (!body.data.length) return m.edit(':x: | No se han encontrado resultados para su búsqueda.').then(m => setTimeout(() => m.delete(), 6000));
      else m.edit('');
      const manga = body.data[0].attributes;
      translate(manga.synopsis, {
        to: 'es'
      }).then(trans => {
        const embed = new Eris.Embed()
          .title(manga.canonicalTitle)
          .url(`https://kitsu.io/manga/${manga.slug}`)
          .field('Tipo', manga.subtype.toUpperCase(), true)
          .field('Volúmenes', `${manga.volumeCount || '???'}`, true)
          .field('Episodios', `${manga.chapterCount || '???'}`, true)
          .field('Estado', `${manga.status.toUpperCase()}`, true)
          .field('Fecha de Publicación', `${manga.startDate ? new Date(manga.startDate).toDateString() : '???'} - ${manga.endDate ? new Date(manga.endDate).toDateString() : '???'}`, true)
          .field('Rango de Popularidad', `#${manga.popularityRank}`, true)
          .footer(trans.text)
          .thumbnail(manga.posterImage.original)
          .color(Math.floor(Math.random() * 0xffffff))
        m.edit({ embed });
      }).catch(error => {
        const embed = new Eris.Embed()
        .title(manga.canonicalTitle)
        .url('https://kitsu.io/manga/'+manga.slug)
        .field('Tipo', manga.subtype.toUpperCase(), true)
        .field('Volúmenes', `${manga.volumeCount || '???'}`, true)
        .field('Episodios', `${manga.chapterCount || '???'}`, true)
        .field('Estado', manga.status.toUpperCase(), true)
        .field('Fecha de Publicación', `${manga.startDate ? new Date(manga.startDate).toDateString() : '???'} - ${manga.endDate ? new Date(manga.endDate).toDateString() : '???'}`, true)
        .field('Rango de popularidad', '#'+manga.popularityRank, true)
        .footer(manga.synopsis)
        .thumbnail(manga.posterImage.original)
        .color(Math.floor(Math.random() * 0xffffff))
        message.channel.createMessage({ embed })
        console.log(error);
        return message.channel.createMessage('Ocurrió un error al tratar de traducir la sinopsis Se estará mostrando el resultado en inglés.')
      });
    } catch (error) {
      console.log(error);
      return m.edit('Ha ocurrido un error al buscar el manda.')
    };
  });
};

exports.config = {
  command: 'manga',
  category: 'Comandos de Búsqueda',
  permissions: 'Ninguno',
  description: 'Busca mangas en Kitsu.io. Si el servicio de traducción falla, mostrará el resultado en Inglés.',
  usage: '{prefix}manga <nombre del manga>',
  example: '{prefix}manga Yume Nikki\n\nEsto buscará el manga "Yume Nikki" en Kitsu.io',
  aliases: ['man'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 20000
};