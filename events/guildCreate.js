const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, guild, message) => {
  let guilds = await client.guilds.size;
  let users = await client.users.size;

  const embed = new Eris.Embed()
  .title(':white_check_mark: ¡Me han invitado a un nuevo servidor!')
  .field('Nombre', `${guild.name}`, true)
  .field('ID', `${guild.id}`, true)
  .field('Miembros', `${guild.memberCount}`, true)
  .field('Dueño', `**${guild.members.get(guild.ownerID).user.tag}**`, true)
  .field('Servidores actuales', `${guilds}`, true)
  .field('Usuarios actuales', `${users}`, true)
  .field('Shard', guild.shard.id+1)
  .thumbnail(guild.iconURL || guild.dynamicIconURL)
  .color(0x40c72c)
  .timestamp()
  
  client.executeWebhook('', '', {embeds: [embed]});
}
