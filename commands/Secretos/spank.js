const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];;
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();

  if (!user) {
    return message.channel.createMessage(":x: | Debes mencionar a un usuario.").then(m => setTimeout(() => m.delete(), 6000))
  };
  if (message.content.includes(message.author.id)) {
    return message.channel.createMessage(message.author.mention+", ¿cómo te vas a dar unas a ti mismo?").then(m => setTimeout(() => m.delete(), 6000))
  };
  if (message.content.includes(client.user.id)) {
    return message.channel.createMessage(message.author.mention+", no, a mí no, yo soy una buena persona D':").then(m => setTimeout(() => m.delete(), 6000))
  };

  const embed = new Eris.Embed().description('**' + message.author.username + '** le da unas nalgadas a **' + user.username + '**').image(gifs.spank[Math.floor(gifs.spank.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 10/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'spank',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Dale unas nalgadas a quien lo amerite.',
  usage: '{prefix}spank <@usuario>',
  example: '{prefix}spank @Avocado#5212',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};