const fetch = require('node-fetch');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir algún mensaje para transformarlo en caracteres "ASCII".').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  }
  if (args.join(' ').length > 30) return message.channel.createMessage(':x: | Excediste el máximo de caracteres permitidos (30).').then(m => setTimeout(() => m.delete(), 6000))

  fetch(`http://artii.herokuapp.com/make?text=${args.join(' ')}`)
    .then(ascii => ascii.text())
    .then(body => {
      if (body.length > 1999) return message.channel.createMessage(':x: | La respuesta excedió los 2000 caracteres. Intenta con un mensaje más corto.').then(m => setTimeout(() => m.delete(), 6000))
      return message.channel.createMessage(`\`\`\`${body}\`\`\``)
    })
    .catch(e => message.channel.createMessage('Ocurrió un error al intentar convertir el mensaje. Es posible que hayas usado algún caracter especial.\nEs posible que el texto no se haya logrado a generar correctamente.'))
}

exports.config = {
  command: 'ascii',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Repite tu mensaje en forma "ASCII". Los carecteres especiales, como vocales acentuadas o la letra Ñ no son soportadas por el conversor.\nEl mensaje solo puede admitir un máximo de 30 caracteres.',
  usage: '{prefix}ascii <mensaje>',
  example: '{prefix}ascii Hola que tal.\n\nEsto convertirá el "Hola que tal" en caracteres ASCII.',
  aliases: ['ii'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
}
