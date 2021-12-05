const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  let userbot = message.mentions[0];
  if (!userbot) return message.channel.createMessage(':x: | Debes mencionar a un bot.').then(m => setTimeout(() => m.delete(), 6000))
  if (!userbot.bot) return message.channel.createMessage(':x: | El usuario mencionado no es un bot.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes('384199982129086464')) return message.channel.createMessage(':x: | No puedes obtener la invitación de este bot.').then(m => setTimeout(() => m.delete(), 6000))

  const embed = new Eris.Embed().title('Link de invitación de ' + userbot.tag).description(`:link: **https://discordapp.com/oauth2/authorize?client_id=${userbot.id}&permissions=8&scope=bot**`).thumbnail(userbot.avatarURL).field('Nombre', `${userbot.username}#${userbot.discriminator}`, true).field('ID', `${userbot.id}`, true).field('Permisos de Invitación', 'Administrador', true).field('Pedido por', `<@${message.author.id}>`, true).color(0x7aa30b);
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'botinvite',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Extrae el enlace de invitación del bot mencionado. El enlace de invitación tiene habilitado el permiso "Administrador".',
  usage: '{prefix}botinvite <@bot>',
  example: '{prefix}botinvite @Ouka#0883\n\nEsto te dará el enlace de invitación del bot mencionado.',
  aliases: ['binv'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};