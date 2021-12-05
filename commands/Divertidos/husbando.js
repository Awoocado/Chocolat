const Eris = require("eris-additions")(require("eris"));
const husbandos = require('../../data/husbandos.json');
const total = Object.keys(husbandos).length;
const ss = require("string-similarity");

exports.run = async (client, message, args) => {

  let argumento = args.join(" ");
  let husbando, index, text;  if (!argumento) {
    index = Math.floor(Math.random() * total);
    husbando = husbandos[index];
    text = `💝 ¿**${husbando.name}**? `;
  } else if (!isNaN(argumento)) {
    if (argumento > total || argumento < 1) return message.channel.createMessage(':x: | Número de husbando inválido. Actualmente hay ' + total + ' husbandos registrados. Elige un número entre 1 y ' + total).then(m => setTimeout(() => m.delete(), 8000))
    index = argumento;
    husbando = husbandos[index];
    text = `💝 Acá está el husbando número: **${index}**!`;
  } else {
    let busqueda = ss.findBestMatch(argumento, Object.values(husbandos).map(q => q.name));
    if (busqueda.bestMatch.rating < 0.50) return message.channel.createMessage(':x: | Husbando no encontrado en la base de datos. Asegúrate que estés escribiendo el nombre correctamente.\nEn caso de que no se encuentre de ninguna forma, **puedes sugerir el husbando en el Servidor de Soporte** para que sea agregado en la próxima actualización.').then(m => setTimeout(() => m.delete(), 6000))
    index = busqueda.bestMatchIndex;
    husbando = Object.values(husbandos)[index];
    text = `💝 Acá está el husbando número: **${index + 1}**!`;
  };

  let embed = new Eris.Embed();
  embed.author(husbando.name, husbando.image);
  embed.description(husbando.origin);
  embed.image(husbando.image);

  if (isNaN(argumento)) embed.footer(`Número: ${index + 1}`);
  else embed.footer(`Número: ${index}`);
  embed.color(Math.floor(Math.random() * 0xffffff));

  message.channel.createMessage({content : text, embed : embed}  ).then(async ms => {
    await ms.addReaction('👍');
    await ms.addReaction('👎');
  });
};

exports.config = {
  command: 'husbando',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Puntúa un husbando aleatoriamente o escribe un número para ver cuál husbando fue asignado a ese número. También puedes optar por escribir el nombre del husbando para buscarlo directamente. Actualmente hay **' + total + '** husbandos registrados.',
  usage: '{prefix}husbando [Número/Nombre]',
  example: '{prefix}husbando | {prefix}husbando 256 | {prefix}husbando Sora\n\n1. *{prefix}husbando*: Este enviará un husbando aleatoriamente de los **' + total + '** registrados.\n2. *{prefix}husbando Número*: Este enviará el husbando asignado al número colocado.\n3. *{prefix}husbando Nombre*: Este buscará el nombre especificado en la base de datos de Husbandos.',
  aliases: ['husband', 'h'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
