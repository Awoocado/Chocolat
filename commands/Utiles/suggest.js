const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let channel;
  let featch = db.fetch(`suggestChannel_${message.guild.id}`);
  if (!message.guild.channels.get(featch)) return message.channel.createMessage(':x: | El canal de sugerencias no ha sido establecido.').then(m => setTimeout(() => m.delete(), 6000))
  channel = message.guild.channels.get(featch);
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir el contenido de la sugerencia.').then(m => setTimeout(() => m.delete(), 6000))
  

  const embed = new Eris.Embed()
    .author(message.author.tag, message.author.avatarURL)
    .title('Nueva sugerencia')
    .description(args.join(' '))
    .footer(`Sugerencia para ${message.guild.name}`)
    .color(0x06adf0)
  const m = await channel.createMessage({ embed });
  await m.addReaction('⬆');
  await m.addReaction('⬇');
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
};

exports.config = {
  command: 'suggest',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Envía una sugerencia al canal de sugerencias del servidor. Antes de enviar una sugerencia, el canal de sugerencias debe estar establecido. Si eres el Administrador, ejecuta el comando `{prefix}setsuggestions #canal` para establecer el canal de sugerencias.',
  usage: '{prefix}suggest <argumentos>',
  example: '{prefix}suggest Sugiero que hayan más canales de música.\n\nEsto enviará la sugerencia al canal establecido.\n**Nota:** No confundir con `{prefix}botsuggestion`. Estas sugerencias son internas para cada servidor, no son sugerencias para el bot.',
  aliases: ['sgg'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};