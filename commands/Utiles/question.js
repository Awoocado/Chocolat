const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Agrege una pregunta para la encuesta.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed()
    .author('Encuesta')
    .description('**' + args.join(' ') + '**')
    .field('Opción 1', '\u2705 Sí', true)
    .field('Opción 2', '\u274c No', true)
    .color(Math.floor(Math.random() * 0xffffff))
    .timestamp()
  let m = await message.channel.createMessage({ embed })
  await m.addReaction("\u2705")
  await m.addReaction("\u274c")
  
}

exports.config = {
  command: 'question',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Genera una encuesta simple de 2 opciones (Sí y No).',
  usage: '{prefix}question <pregunta>',
  example: '{prefix}question ¿Le gustaría un cambio en el servidor?\n\nEste generará una encuesta simple de opciones "Sí" y "No", con la pregunta especificada.',
  aliases: ['q'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};