const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r2 = ['**{nombre}** mató a **{otro}** D\':', '**{nombre}** acabó con la vida de **{otro}** >n<', '**{otro}** ha muerto por culpa de **{nombre}**'];
  let user = message.mentions[0];
  let exception = ['398658092021055511'];
  const embed = new Eris.Embed().image(gifs.kill[Math.floor(gifs.kill.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  if (message.content.includes(client.user.id)) return message.channel.createMessage('N-no quiero morir... -mira a <@' + message.author.id + '> con miedo-');
  if (!user) return message.channel.createMessage("M-menciona a alguien... -con miedo-").then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
    if (exception.includes(message.author.id) && user.id == message.author.id) embed.description("**" + message.author.username + "** se mató a él mismo D:"); //El suicide barato (?)
else if (user.id == message.author.id) return message.channel.createMessage("No lo deberías hacer... De hecho no te lo permitiré, valórate >u< Mucha gente ha de quererte mucho.").then(m => setTimeout(() => m.delete(), 6000));
    else if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'kill',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Mata al usuario mencionado D\':',
  usage: '{prefix}kill <@usuario>',
  example: '{prefix}kill @MathError#6880\n\nEsto hará que mates al usuario mencionado.',
  aliases: ['slay'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
