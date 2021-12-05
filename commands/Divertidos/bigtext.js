const indicators = require('../../data/indicators.js');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  }
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir algún mensaje para transformarlo en "Indicadores Regionales".').then(m => setTimeout(() => m.delete(), 6000))
  if (args.join(' ').length > 40) return message.channel.createMessage(':x: | Excediste el máximo de caracteres permitidos (40).').then(m => setTimeout(() => m.delete(), 6000))

  const indicatorPhrase = [];

  for (const char of args.join(' ')) indicators.includes(char.toLowerCase()) ? indicatorPhrase.push(`:regional_indicator_${char.toLowerCase()}:`) : indicatorPhrase.push(char);

  if (indicatorPhrase.join(' ').length > 1999) return message.channel.createMessage(':x: | La respuesta excedió los 2000 caracteres. Intenta con un mensaje más corto.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  message.channel.createMessage(indicatorPhrase.join(' '));
};

exports.config = {
  command: 'bigtext',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Repite tu texto en forma de Indicadores Regionales. Los indicadores regiones son emotes por defecto de Discord los cuales representan letras y números.\nEl mensaje solo puede admitir un máximo de 30 caracteres.',
  usage: '{prefix}bigtext <texto>',
  example: '{prefix}bigtext Hey que tal todo.\n\nEsto convertirá el mensaje "Hey que tal todo" en Indicadores Regionales (emotes).',
  aliases: ['text', 'bt'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
