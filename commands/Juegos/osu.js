const Eris = require("eris-additions")(require("eris"));
const osu = require('node-osu');
var osuApi = new osu.Api('');
exports.run = async (client, message, args) => {
  let ur = args.slice(1).join(' ');
  let md = args[0];
  if (args == null) return;

  if (!md) return message.channel.createMessage(':x: | Debes especificar el modo de juego y el usuario.\n> **Modos:** std (Standard), taiko (Taiko), ctb (Catch the Beat), mania (Mania)').then(m => setTimeout(() => m.delete(), 8000))
  if (!ur) return message.channel.createMessage(':x: | Debes escribir el usuario a buscar.').then(m => setTimeout(() => m.delete(), 6000))

  if (md === "std") md = 0;
  else if (md === "taiko") md = 1;
  else if (md === "ctb") md = 2;
  else if (md === "mania") md = 3;
  else return message.channel.createMessage(':x: | Introduzca una modalidad de juego correcta. (std / taiko / ctb / mania)\n Ejemplo: `{prefix}osu std Cookiezi`'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000));
  osuApi.getUser({
    u: ur,
    m: md
  }).then(user => {
    let titlem;
    if (md === 0) titlem = "osu!standard";
    if (md === 1) titlem = "osu!taiko";
    if (md === 2) titlem = "osu!ctb (Catch The Beat)";
    if (md === 3) titlem = "osu!mania";

    const embed = new Eris.Embed()
      .title('Estadísticas de ' + titlem + ' para: ' + user.name)
      .url(`https://osu.ppy.sh/u/${user.id}`)
      .field('ID', `${user.id}`, true)
      .field('País', `${user.country} :flag_${user.country.toLowerCase()}:`, true)
      .field('PP', `${user.pp.raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, true)
      .field('Rank global', `#${user.pp.rank.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, true)
      .field('Rank nacional', `#${user.pp.countryRank.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, true)
      .field('Precisión', `${user.accuracyFormatted}`, true)
      .field('Nivel', `${user.level}`, true)
      .field('Puntuación ranked', `${user.scores.ranked.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, true)
      .field('Puntuación total', `${user.scores.total.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, true)
      .field('Jugadas', `${user.counts.plays.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, true)
      .color(0xe91f96)
      .thumbnail(`http://a.ppy.sh/${user.id}`);
    message.channel.createMessage({ embed });
  }).catch(err => {
    if (err == "Error: Not found") message.channel.createMessage(":x: | El usuario especificado no existe.").then(m => setTimeout(() => m.delete(), 6000))
    else if (err == "TypeError: Cannot read property 'replace' of null") message.channel.createMessage(':x: | El usuario no ha jugado en esa modalidad del juego.')
    else message.channel.createMessage(':x: | Se produjo un error al intentar buscar al usuario.\nEs posible que el usuario no se haya encontrado correctamente.');
  });
};

exports.config = {
  command: 'osu',
  category: 'Comandos de Juegos',
  permissions: 'Ninguno',
  description: 'Busca las estadísticas de un usuario del juego "osu!". Debes escribir el modo de juego y el nombre de usuario a buscar.\nModos de juego: std (osu!standard), taiko (osu!taiko), ctb (osu!Catch the beat) y mania (osu!mania)',
  usage: '{prefix}osu <modo> <usuario>',
  example: '{prefix}osu std Cookiezi\nEsto buscará al jugador de osu!standard "Cookiezi" y te mostrará sus estadísticas.',
  aliases: ['welcomtuos', 'circles'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};