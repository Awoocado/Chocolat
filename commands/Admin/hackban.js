const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  const member = args[0];
  let razon = args.slice(1).join(` `);
  
  if (!message.member.hasPermission("banMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Bloquear Miembros` activado.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("banMembers")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para banear usuarios.\nNecesito tener el permiso `Bloquear Miembros` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if (!member) return message.channel.createMessage(':x: | Debes escribir la ID a banear.').then(m => setTimeout(() => m.delete(), 6000))
  if (!razon) razon = `Hackban.`;
  if (member === client.user.id) return message.channel.createMessage('Oye, no me banees :c Y-yo no me quiero ir y no poder regresar...').then(m => setTimeout(() => m.delete(), 6000))
  if (member === message.author.id) return message.channel.createMessage(':x: | No puedes banearte a ti mismo.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();

  let user = client.users.get(member);
  let user2 = message.guild.members.get(member);
    if (!user) return await message.channel.createMessage(':x: | El usuario no está en mi base de datos, o no es un usuario válido.').then(m => setTimeout(() => m.delete(), 6000))
    if (user2) user = user2;
    await message.channel.createMessage(`¿Estás seguro que quieres banear a **${user.tag} (${user.id})**? **(Sí/No)**`).then(m => setTimeout(() => m.delete(), 30000));
    let author1 = message.author.id;
    const msgs = await message.channel.awaitMessages((res) => author1 == res.author.id, {"maxMatches": 1, "time": 20000});
    if (!msgs.length || !['y', 'yes', 's', 'sí', 'si'].includes(msgs[0].content.toLowerCase())) return message.channel.createMessage('Comando cancelado.').then(m => setTimeout(() => m.delete(), 6000));

    await client.banGuildMember(`${message.guild.id}`, `${user.id}`, 0, `${razon}`);
    const embed = new Eris.Embed()
      .title(":no_entry_sign: Usuario Baneado")
      .description(`El usuario **${user.tag}** fue baneado del servidor.\n\`ID: ${user.id}\``)
      .field("Razón:", `${razon}`)
      .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
      .timestamp()
      .color(0xFA3131)
    if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
    else message.guild.channels.get(o).createMessage({ embed });
};

exports.config = {
  command: 'hackban',
  category: 'Comandos ADMIN/MOD',
  permissions: 'Bloquear Miembros',
  description: 'Banea al usuario proporcionando la ID. El usuario no necesariamente tiene que estar en el servidor. Pero, el usuario debe estar en la base de datos de {botname}. Si no sabes cómo obtener la ID, puedes hacer lo siguiente:\n1.- Ve a "Ajustes de Usuario".\n2.- Ve al apartado de "Apariencia"\n3.- Habilita la opción "Modo Desarrollador."\n4.- Click derecho al usuario y luego "Copiar ID".',
  usage: '{prefix}hackban <id> [razón]',
  example: '{prefix}hackban 375044947046563841 Usuario Raid.\n\nEsto baneará al usuario indicado con esa ID.',
  aliases: ['hb'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 25000
};