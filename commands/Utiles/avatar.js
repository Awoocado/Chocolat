const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  if (!args[0]) {
    let avatar = message.author.avatarURL;
    if (!avatar) return message.channel.createMessage(':x: | No tienes una foto de perfil asignada.').then(m => setTimeout(() => m.delete(), 6000));
    const embed = new Eris.Embed().author(`Avatar de ${message.author.tag}`).description(`[Avatar URL](${message.author.avatarURL})`).image(`${avatar}`).color(Math.floor(Math.random() * 0xffffff));
    return message.channel.createMessage({ embed });
  }

  let usuariosserver = new Eris.Collection();
  message.guild.members.forEach(q => usuariosserver.set(q.user.id, q.user));
  let img = message.mentions[0] || usuariosserver.find(q => q.username == args.join(" ")) || !isNaN(args[0]) ? usuariosserver.get(args[0]) : undefined
  try {
    if (!img && !isNaN(args[0])) img = await client.users.fetch(args[0]);
    if (!message.mentions[0] == false) img = message.mentions[0];
    if (!usuariosserver.find(q => q.username == args.join(" ")) == false) img = usuariosserver.find(q => q.username == args.join(" "));
    if (!img) return message.channel.createMessage(":x: | Usuario no encontrado.");
    if (img.avatarURL === null) message.channel.createMessage(':x: | El usuario mencionado no tiene avatar.').then(m => setTimeout(() => m.delete(), 6000))
    else {
      const embed = new Eris.Embed().author(`Avatar de ${img.tag}`).description(`[Avatar URL](${img.avatarURL})`).image(`${img.avatarURL}`).color(Math.floor(Math.random() * 0xffffff)).footer(`Pedido por: ${message.author.username}`);
      message.channel.createMessage({ embed });
    };
  } catch {
    message.channel.createMessage(":x: | Usuario no encontrado.");
  }
};

exports.config = {
  command: 'avatar',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Muestra el avatar tuyo o del usuario mencionado. También puedes colocar la ID del usuario el cual quieras ver el avatar.',
  usage: '{prefix}avatar [@usuario/ID]',
  example: '{prefix}avatar | {prefix}avatar @MathError#6880\n\n1. *{prefix}avatar*: Muestra tu propio avatar.\2. *{prefix}avatar @usuario*: Esto mostrará el avatar del usuario mencionado.',
  aliases: ['picture', 'pp'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};