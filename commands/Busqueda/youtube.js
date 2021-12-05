const Eris = require("eris-additions")(require("eris"));
const search = require('youtube-search');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir términos para buscar en Youtube.').then(m => setTimeout(() => m.delete(), 6000));
  message.channel.createMessage(':arrows_counterclockwise: Buscando...').then(m => {
    search(args.join(' '), {
      maxResults: 4,
      key: ''
    }, (err, res) => {
      if (err) return message.channel.createMessage(':x: | Ocurrió un error al tratar de buscar vídeos en Youtube.');
      if (!res) return message.channel.createMessage(":x: | No se han encontrado resultados para su búsqueda.").then(m => setTimeout(() => m.delete(), 6000));
      else m.edit('');

      let link1 = `${res[0].title}\n${res[0].link}`;
      let link2 = `${res[1].title}\n${res[1].link}`;
      let link3 = `${res[2].title}\n${res[2].link}`;
      let link4 = `${res[3].title}\n${res[3].link}`;

      const embed = new Eris.Embed()
        .author("Resultados de búsqueda de Youtube para: '" + args.join(' ') + "'", 'https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-256.png')
        .field("Resultado 1", link1)
        .field("Resultado 2", link2)
        .field("Resultado 3", link3)
        .field("Resultado 4", link4)
        .color(Math.floor(Math.random() * 0xffffff))
      m.edit({ embed });
    });
  });
};

exports.config = {
    command: 'youtube',
    category: 'Comandos de Búsqueda',
    permissions: 'Ninguno',
    description: 'Busca vídeos en Youtube y devuelve los enlaces como resultado.',
    usage: '{prefix}youtube <términos>',
    example: '{prefix}youtube Hola Soy German Los Profesores\n\nEsto buscará en Youtube vídeos relacionados con "Hola Soy German Los Profesores" y mostrará los resultados.',
    aliases: ['yt'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 20000
};