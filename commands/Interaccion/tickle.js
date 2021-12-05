const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['-Le hace cosquillas- >u< espero dejarte sin aliento **{nombre}**', '-tickle tickle- ¡Ríete o no te dejaré **{nombre}**', '>:D recibe mi castigo de miles de cosquillas **{nombre}**'];
  let r2 = ['**{nombre}** le hace cosquillas a **{otro}** uwu', '**{otro}** está en apuros porque **{nombre}** no para de darle cosquillas >u<', '**{nombre}** le da miles de cosquillas a **{otro}**'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes hacerte cosquillas a ti mismo...').then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`N-no me hagas cosquillas >.< **${message.author.username}**`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('tickle').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.tickle[Math.floor(Math.random() * gifs.tickle.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.tickle[Math.floor(Math.random() * gifs.tickle.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'tickle',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno.',
  description: 'Hazle cosquillas al usuario mencionado, o deja que {botname} te haga cosquillas :D/',
  usage: '{prefix}tickle [@usuario]',
  example: '{prefix}tickle | {prefix}tickle @MathError#6880\n\n1. *{prefix}tickle*: {botname} te hará cosquillas.\n2. *{prefix}tickle @usuario*: Hazle cosquillas al usuario mencionado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
}
