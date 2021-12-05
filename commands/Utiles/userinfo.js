const Eris = require("eris-additions")(require("eris"));
const dateformat = require('dateformat');
const datediff = require('date-diff');
exports.run = async (client, message, args) => {
  let member = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : message.author);
  if (!member) member = message.author;
  member = message.guild.members.get(member.id);
  let roles = member.roles.map(e => message.guild.roles.get(e).mention);
  let joined = new datediff(Date.now(), member.joinedAt);
  let created = new datediff(Date.now(), member.createdAt);
  if (roles.length < 1) roles = ['Ninguno'];
  const status = {
    online: 'Conectado.',
    idle: 'Ausente.',
    dnd: 'No molestar.',
    offline: 'Desconectado/Invisible.',
    streaming: 'Transmitiendo.'
  };


  const embed = new Eris.Embed()
    .thumbnail(member.avatarURL)
    .author(member.tag, member.avatarURL)
    .field("ID", `${member.id}`, true)
    .field("Nombre y Discriminador", `${member.tag}`)
    .field('Apodo', `${member.nick || 'Ninguno.'}`, true)
    .field("Creación de la cuenta", `${dateformat(member.createdAt, "***mmmm dS, yyyy***, en ***dddd***, ***h:MM:ss TT, Z***")}. Eso fue hace ${Math.round(created.days())} días.`, true)
    .field("Fecha de Ingreso", `${dateformat(member.joinedAt, "***mmmm dS, yyyy***, en ***dddd***, ***h:MM:ss TT, Z***")}. Eso fue hace ${Math.round(joined.days())} días`, true)
    .field('Estado', status[member.status] || status.offline , true)
    .field("Roles", roles.join(', '))
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });

};

exports.config = {
  command: 'userinfo',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Muestra información detallada de ti o del usuario mencionado.',
  usage: '{prefix}userinfo [@usuario]',
  example: '{prefix}userinfo | {prefix}userinfo @MathError#6880\n\n1. *{prefix}userinfo*: Muestra información detallada de ti.\n2. *{prefix}userinfo @usuario*: Muestra información detallada del usuario mencionado.',
  aliases: ['user'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};