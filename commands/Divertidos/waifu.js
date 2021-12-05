const Eris = require("eris-additions")(require("eris"))
const waifus = require('../../data/waifus.json');
const total = Object.keys(waifus).length
const ss = require("string-similarity")
 
exports.run = async (client, message, args) => {
  let argumento = args.join(" ");
  let percentage = Math.random();
  if (percentage < 0.01) {
    const weefi = [
      'https://gfycat.com/KindheartedContentIberianmidwifetoad',
      'http://i.imgur.com/U25HMyz.gifv',
      'http://i.imgur.com/0xhBPbR.gif',
      'Yo soy tu waifu, ¿sí? ... Ahora ámame.',
      'Las waifus no existen... Acepta la realidad, te quedarás solo.',
      'https://media.giphy.com/media/2PW8oTlHnVaZa/giphy.gif',
      'https://thumbs.gfycat.com/BiodegradableWillingIchneumonfly-max-1mb.gif',
      'https://i.makeagif.com/media/10-19-2015/PyKTt9.gif',
      'https://i.imgur.com/hn0YsNQ.gif',
      'https://media.giphy.com/media/xUA7aVR8tUqIHdAjPa/giphy.gif',
      'http://i0.kym-cdn.com/photos/images/original/001/203/473/1cd.gif',
      'https://media1.tenor.com/images/0e6d6a8f61b84b1ea6cdb13522a39753/tenor.gif?itemid=5237833',
      'https://i.imgur.com/5XuI7W8.gif',
      'http://i.imgur.com/usJbYkw.gif'
    ];
    return message.channel.createMessage(weefi[Math.round(Math.random() * (weefi.length - 1))]);
  };

  let waifu, index, text;
  if (!argumento) {
    index = Math.floor(Math.random() * total);
    waifu = waifus[index];
    text = `💝 ¿**${waifu.name}**? `;
  } else if (!isNaN(argumento)) {
    if (argumento > total || argumento < 1) return message.channel.createMessage(':x: | Número de Waifu inválido. Actualmente hay ' + total + ' Waifus registradas. Elige un número entre 1 y ' + total).then(m => setTimeout(() => m.delete(), 6000));
    index = argumento;
    waifu = waifus[index];
    text = `💝 Acá está la waifu número: **${index}**!`;
  } else {
    let busqueda = ss.findBestMatch(argumento, Object.values(waifus).map(q => q.name));
    if (busqueda.bestMatch.rating < 0.50) return message.channel.createMessage(':x: | Waifu no encontrada en la base de datos. Asegúrate que estés escribiendo el nombre correctamente.\nEn caso de que no se encuentre de ninguna forma, **puedes sugerir la waifu en el Servidor de Soporte** para que sea agregada en la próxima actualización.').then(m => setTimeout(() => m.delete(), 6000));
    index = busqueda.bestMatchIndex;
    waifu = Object.values(waifus)[index];
    text = `💝 Acá está la waifu número: **${index + 1}**!`;
  };

  let embed = new Eris.Embed();
  embed.author(waifu.name, waifu.image);
  embed.description(waifu.origin);
  embed.image(waifu.image);
  if (isNaN(argumento)) embed.footer(`Número: ${index + 1}`);
  else embed.footer(`Número: ${index}`);
  embed.color(Math.floor(Math.random() * 0xffffff));

  message.channel.createMessage({content : text, embed : embed}  ).then(async ms => {
    await ms.addReaction('👍');
    await ms.addReaction('👎');
  });
};

exports.config = {
  command: 'waifu',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Puntúa una waifu aleatoriamente o escribe un número para ver cuál waifu fue asignada a ese número. También puedes optar por escribir el nombre de la waifu para buscarla directamente. Actualmente hay **' + total + '** waifus registradas.',
  usage: '{prefix}waifu [número/nombre]',
  example: '{prefix}waifu | {prefix}waifu 256 | {prefix}waifu Rias Gremory\n\n1. *{prefix}waifu*: Este enviará una waifu aleatoriamente de las **' + total + '** registradas.\n2. *{prefix}waifu Número*: Este enviará la waifu asignada al número colocado.\n3. *{prefix}waifu Nombre*: Este buscará el nombre especificado en la base de datos de Waifus.',
  aliases: ['w', 'wife'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
