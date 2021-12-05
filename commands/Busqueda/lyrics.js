const Eris = require("eris-additions")(require("eris"));
const ReactionHandler = require('eris-reactions');
const lyr = require('lyrics-fetcher');

exports.run = async (client, message, args) => {
  let args2 = args.join(' ');
  let msg = args2.split("-");
  let artist = msg[0];
  let song = msg[1];

  if (!artist) return message.channel.createMessage(':x: | Debes espeficar artista y nombre.\nEjemplo: {prefix}lyrics EPICA - Wings of Freedom.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000));
  if (!song) return message.channel.createMessage(':x: | Debes especificar el nombre de la canción.').then(m => setTimeout(() => m.delete(), 6000));

  lyr.fetch(artist, song, async function (err, lyrics) {
    if (err) {
      return message.channel.createMessage(':x: | Ha ocurrido un error al intentar buscar la letra.\nDetalles del error: `' + err + '`')
    } else {
      if (lyrics === "Sorry, We don't have lyrics for this song yet.") return message.channel.createMessage(':x: | No se ha encontrado la letra de la canción que solicita.').then(m => setTimeout(() => m.delete(), 6000));
      if (lyrics.length > 2048) {
        let lyrics2 = lyrics.slice(0, 2048);
        let lyrics3 = lyrics.slice(2049, 4096);
        let pages = [lyrics2, lyrics3];
        let page = 1;

        const embed = new Eris.Embed()
          .title(':musical_note: Letra de ' + song)
          .color(Math.floor(Math.random() * 0xffffff))
          .footer(`Página ${page} de ${pages.length}`)
          .description(pages[page - 1])
        let m = await message.channel.createMessage({ embed })

        await m.addReaction('⏪');
        await m.addReaction('⏩');
        
        const backwards = new ReactionHandler.continuousReactionStream(m, (userID) => userID === message.author.id, false, { maxMatches: 20, time: 360000 });
        const forwards = new ReactionHandler.continuousReactionStream(m, (userID) => userID === message.author.id, false, { maxMatches: 20, time: 360000 });

        backwards.on('reacted', r => {
          if (r.emoji.name !== '⏪') return;
          if (page === 1) return;
          page--;
          const embed = new Eris.Embed().title(':musical_note: Letra de ' + song).color(Math.floor(Math.random() * 0xffffff));
          embed.description(pages[page - 1]);
          embed.footer(`Página ${page} de ${pages.length}`);
          m.edit({ embed });
        });

        forwards.on('reacted', r => {
          if (r.emoji.name !== '⏩') return;
          if (page === pages.length) return;
          page++;
          const embed = new Eris.Embed().title(':musical_note: Letra de ' + song).color(Math.floor(Math.random() * 0xffffff));
          embed.description(pages[page - 1]);
          embed.footer(`Página ${page} de ${pages.length}`);
          m.edit({ embed });
        });
      } else {
        const embed = new Eris.Embed()
          .title(':musical_note: Letra de ' + song)
          .color(Math.floor(Math.random() * 0xffffff))
          .description(lyrics)
        message.channel.createMessage({ embed });
      };
    };
  });
};

exports.config = {
  command: 'lyrics',
  category: 'Comandos de Búsqueda',
  permissions: 'Ninguno',
  description: 'Busca la letra de alguna canción. Si la letra de una canción es larga, el resultado se dividirá en páginas de un Embed. Puedes navegar en dichas páginas haciendo click en las reacciones que aparecen abajo del embed. El uso del guión (-) para separar Artista y Nombre es obligatorio.',
  usage: '{prefix}lyrics <Artista> - <Título>',
  example: '{prefix}lyrics EPICA - Wings of Freedom\n\nEsto buscará la letra de la canción "Wings of Freedom" de EPICA.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 20000
};