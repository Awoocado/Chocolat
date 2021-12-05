const filters = require('../../data/filters.json');
exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Escriba algo para repetir.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  }
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  message.channel.createMessage(`${args.join(' ')}`);
};

exports.config = {
  command: 'say',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: '{botname} repetirá lo que dices y eliminará tu mensaje. Si el mensaje tuyo permanece después de ejecutar el comando, puede deberse a lo siguiente:\n1. Lag en Discord: En la mayoría de casos se debe por lag en Discord. Para ti todavía se verá el mensaje y éste no se puede eliminar de ninguna forma, pero para los demás ya fue eliminado. Se soluciona esto presionando CTRL + R o reiniciando la APP de Discord si andas en teléfono.\n2. {botname} carece de permisos: Para que ella pueda borrar tu mensaje, es necesario que tenga el permiso `Administrar Mensajes` activado.',
  usage: '{prefix}say <texto>',
  example: '{prefix}say Holiis~ uwu\n\nEsto hará que {botname} repita lo que escribiste y elimine tu mensaje.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
