const Eris = require("eris-additions")(require("eris"));
const Pokedex = require('pokedex-api');
const translate = require('@vitalets/google-translate-api');
const pokedex = new Pokedex({
  userAgent: 'Chocolat/v2.8.0 (https://Chocolatbot.weebly.com/, v3.0.0)',
  version: 'v3.0.0'
});
exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir el nombre del Pokémon a buscar.').then(m => setTimeout(() => m.delete(), 6000))
  pokedex.getPokemonByName(encodeURIComponent(args.join(' '))).then(async pokemon => {
    translate(pokemon[0].description, {
      to: 'es'
    }).then(trans => {
      const embed = new Eris.Embed()
        .author('Información del Pokémon ' + pokemon[0].name, 'https://img.rankedboost.com/wp-content/uploads/2016/07/Pokemon-Go-Pok%C3%A9dex-300x229.png')
        .description(trans.text)
        .field('Tipo(s)', pokemon[0].types.join(', '), true)
        .field('Altura', pokemon[0].height, true)
        .field('Peso', pokemon[0].weight, true)
        .field('Generación', `${pokemon[0].gen} Generación.`, true)
        .field('Inicial', pokemon[0].starter ? 'Sí.' : 'No.', true)
        .field('Legendario', pokemon[0].legendary ? 'Sí.' : 'No.', true)
        .field('Místico', pokemon[0].mythical ? 'Sí.' : 'No.', true)
        .field('Mega Evolución', pokemon[0].mega ? 'Sí.' : 'No.', true)
        .field('Línea evolutiva', pokemon[0].family.evolutionLine.join(', '), true)
        .field('Habilidades normales', pokemon[0].abilities.normal.join(', '), true)
        .field('Habilidades ocultas', pokemon[0].abilities.hidden.join(', ') || 'Ninguna.', true)
        .thumbnail(pokemon[0].sprite)
        .image(pokemon[0].sprite)
        .color(Math.floor(Math.random() * 0xffffff));
      message.channel.createMessage({ embed });
    }).catch(error => {
      const embed = new Eris.Embed()
      .author('Información del Pokémon' + pokemon[0].name, 'https://img.rankedboost.com/wp-content/uploads/2016/07/Pokemon-Go-Pok%C3%A9dex-300x229.png')
      .description(pokemon[0].description)
      .field('Tipo(s)', pokemon[0].types.join(', '), true)
      .field('Altura', pokemon[0].height, true)
      .field('Peso', pokemon[0].weight, true)
      .field('Generación', `${pokemon[0].gen} Generación.`, true)
      .field('Inicial', pokemon[0].starter ? 'Sí.' : 'No.', true)
      .field('Legendario', pokemon[0].legendary ? 'Sí.' : 'No.', true)
      .field('Místico', pokemon[0].mythical ? 'Sí.' : 'No.', true)
      .field('Mega Evolución', pokemon[0].mega ? 'Sí.' : 'No.', true)
      .field('Línea evolutiva', pokemon[0].family.evolutionLine.join(', '), true)
      .field('Habilidades normales', pokemon[0].abilities.normal.join(', '), true)
      .Field('Habilidades ocultas', pokemon[0].abilities.hidden.join(', ') || 'Ninguna.', true)
      .thumbnail(pokemon[0].sprite)
      .image(pokemon[0].sprite)
      .color(Math.floor(Math.random() * 0xffffff));
      message.channel.createMessage({ embed });
      message.channel.createMessage('Ocurrió un error al traducir la descripción del Pokémon. Se estará mostrando el resultado en Inglés.');
    })
  }).catch(e => message.channel.createMessage(':x: | Ocurrió un error al intentar buscar al Pokémon.\nEs posible que la imagen no se haya logrado a cargar correctamente.'));
};

exports.config = {
  command: 'pokedex',
  category: 'Comandos de Juegos',
  permissions: 'Ninguno',
  description: 'Busca información detallada de algún Pokémon.',
  usage: '{prefix}pokedex <Nombre del Pokémon>',
  example: '{prefix}pokedex Haxorus\n\nEsto buscará toda la información concerniente al Pokémon "Haxorus".',
  aliases: ['pkd', 'pdex'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};