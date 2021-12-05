const gifs = require('../../data/gif.json');
const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  let r2 = ['**{nombre}** pateó a **{otro}** :c', '**{otro}** está recibiendo una paliza de **{nombre}**', '**{nombre}** le ha dado una patada fuerte a **{otro}** >n<'];

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no creo que te puedas patear a ti mismo, sería absurdo.');
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+", ¿e-eh? ¿po-por qué me quieres patear? ¿te hice algo malo? :'C");
  if (!user) return message.channel.createMessage('¡No soy violenta! Mejor menciona a un usuario para patearlo.');
  const embed = new Eris.Embed().image(gifs.kickbutts[Math.floor(gifs.kickbutts.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  message.channel.createMessage({ embed });
  };

exports.config = {
  command: 'kickbutts',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Patéale el trasero al usuario mencionado.',
  usage: '{prefix}kickbutts <@usuario>',
  example: '{prefix}kickbutts @MathError#6880\n\nEsto hará que le patees el trasero al usuario mencionado.',
  aliases: ['knock'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};