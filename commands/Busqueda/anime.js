const Eris = require("eris-additions")(require("eris"));
const Anime = require('malapi').Anime;
const translate = require('@vitalets/google-translate-api');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes poner el nombre del anime a buscar en MyAnimeList.').then(m => setTimeout(() => m.delete(), 6000));

  message.channel.createMessage(':arrows_counterclockwise: Buscando...').then(async m => { 
    Anime.fromName(args.join(' ')).then(async anime => {
      if (!anime) return m.edit(':x: | No se han encontrado resultados para su búsqueda.').then(m => setTimeout(() => m.delete(), 6000));
      else m.edit(' ');
      let text = anime.synopsis
      translate(anime.synopsis, {
        to: 'es'
      }).then(trans => {
        let animeT = anime.title.replace(/\s/g, " ").trim();
        let ai1 = animeT.length;
        let ai2 = animeT.lastIndexOf('           E');
        const embed = new Eris.Embed()
          .title(animeT.slice(0,(-1 * (ai1 - ai2))))
          .url(anime.detailsLink)
          .field('Episodios', `${anime.episodes}`, true)
          .field('Tipo', `${anime.type}`, true)
          .field('Estado', `${anime.status}`, true)
          .field('Géneros', `${anime.genres.join(', ')}`, true)
          .field('Puntuación MAL', `${anime.statistics.score.value}/10`, true)
          .field('Fecha de transmisión', `${anime.aired}`, true)
          .field('Estudio de animación', `${anime.studios}`, true)
          .footer(trans.text)
          .color(Math.floor(Math.random() * 0xffffff))
        m.edit({ embed });
      }).catch(e => {
        let animeT = anime.title.replace(/\s/g, " ").trim();
        let ai1 = animeT.length;
        let ai2 = animeT.lastIndexOf('           E');
        const embed = new Eris.Embed()
        .title(animeT.slice(0,(-1 * (ai1 - ai2))))
        .url(anime.detailsLink)
        .field('Episodios', `${anime.episodes}`, true)
        .field('Tipo', `${anime.type}`, true)
        .field('Estado', `${anime.status}`, true)
        .field('Géneros', `${anime.genres.join(', ')}`, true)
        .field('Puntuación MAL', `${anime.statistics.score.value}/10`, true)
        .field('Fecha de Transmisión', `${anime.aired}`, true)
        .field('Estudio de animación', `${anime.studios}`, true)
        .footer(anime.synopsis)
        message.channel.createMessage({ embed })
        return message.channel.createMessage('Ocurrió un error al tratar de traducir la sinopsis Se estará mostrando el resultado en inglés.')
      });
    }).catch(e2=>message.channel.createMessage('Ocurrió un error durante la ejecución del comando.'))
  }).catch(e3=>message.channel.createMessage('Ocurrió un error durante la ejecución del comando.'))
};

exports.config = {
  command: 'anime',
  category: 'Comandos de Búsqueda',
  permissions: 'Ninguno',
  description: 'Busca Animes en MyAnimeList.net. Si el servicio de traducción falla, el resultado se mostrará en inglés.',
  usage: '{prefix}anime <anime>',
  example: '{prefix}anime Log Horizon\n\nEste buscará el anime "Log Horizon" en MyAnimeList.net',
  aliases: ['ani'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 25000
};