const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let user = args[0];
  let razon = args.slice(1).join(` `);

  if (!message.member.hasPermission("banMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Bloquear Miembros` activado.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("banMembers")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para desbanear usuarios.\nNecesito tener el permiso `Bloquear Miembros` activado.").then(m => setTimeout(() => m.delete(), 6000))
  
  if (!user) return message.channel.createMessage(':x: | Debes especificar la ID del usuario baneado.').then(m => setTimeout(() => m.delete(), 6000))
  if (!razon) razon = 'Ninguna.';

  const banned = await message.guild.getBan(user).catch(e => {
    if(e) return message.channel.createMessage(`"${user}" No se encuentra en la lista de baneados.`).then(m => setTimeout(() => m.delete(), 6000));
  });
  if (!banned.user) return;
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  message.guild.unbanMember(user).catch(e => console.log(e));
  const embed = new Eris.Embed()
    .title(':white_check_mark: Usuario Desbaneado')
    .field('Se ha removido el ban al usuario:', '**' + banned.user.tag + '**\n `ID: '+banned.user.id+'`')
    .field('Razón:', `${razon}`)
    .field('Admin/Mod responsable', `${message.author.tag}`)
    .color(0x2DE100)
    .timestamp()
  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
  else message.guild.channels.get(o).createMessage({ embed })
};

exports.config = {
  command: "unban",
  category: 'Comandos ADMIN/MOD',
  permissions: 'Banear miembros',
  description: 'Desbanea la ID mencionada. Si no sabes cómo obtener la ID, puedes hacer lo siguiente:\n1.- Ve a "Ajustes de Usuario".\n2.- Ve al apartado de "Apariencia"\n3.- Habilita la opción "Modo Desarrollador."\n4.- Click derecho al usuario y luego "Copiar ID".',
  usage: '{prefix}unban <ID> [razón]',
  example: '{prefix}unban 375044947046563841 Apelación\n\nEste desbaneará la ID especificada con la razón "Apelación".',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};