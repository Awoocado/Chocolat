const Eris = require("eris-additions")(require("eris"));
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  }
  let text = args.slice(1).join(' ');
  let color = args[0];
  if (!color) return message.channel.createMessage(':x: | Coloque un color en código hexadecimal sin el "#". Si quiere un color al azar escriba "R"\n Ejemplo: {prefix}esay 648c0d Verde'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 8000))
  if (!text) return message.channel.createMessage(':x: | Debes escribir el mensaje del embed.\nEjemplos:\n{prefix}esay FFF000 ¡Hola, especifiqué un color!\n{prefix}esay RANDOM ¡Hola, puse un color aleatorio!'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 10000))

  if (color == 'RANDOM') {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    const embed = new Eris.Embed().description(text).color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  } else if (color.length == (6)) {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    const embed = new Eris.Embed().description(text).color(parseInt(color.replace('#', ''), 16))
    message.channel.createMessage({ embed });
  } else {
    message.channel.createMessage(':x: | Debes especificar un código hexadecimal válido.').then(m => setTimeout(() => m.delete(), 6000))
  };
};

exports.config = {
  command: 'esay',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Repite lo que dices en un mensaje Embed con un color hexadecimal que le especifiques o aleatorio y elimina tu mensaje. Es obligatorio colocar el color del embed.\nSi el mensaje tuyo permanece después de ejecutar el comando, puede deberse a lo siguiente:\n1. Lag en Discord: En la mayoría de casos se debe por lag en Discord. Para ti todavía se verá el mensaje y éste no se puede eliminar de ninguna forma, pero para los demás ya fue eliminado. Se soluciona esto presionando CTRL + R o reiniciando la APP de Discord si andas en teléfono.\n2. {botname} carece de permisos: Para que ella pueda borrar tu mensaje, es necesario que tenga el permiso `Administrar Mensajes` activado.',
  usage: '{prefix}esay <colorhexadecimal/RANDOM> <texto>',
  example: '{prefix}esay RANDOM Probando, probando uwu. (Para color aleatorio)\n{prefix}esay ffffff ¡Gris!. (Para colores específicos)',
  aliases: ['embedsay'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
