const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, guild, message) => {
  let guilds = await client.guilds.size;
  let users = await client.users.size;
  db.delete(`guildPrefix_${guild.id}`);

  const embed = new Eris.Embed()
  .title(':x: ¡Me sacaron de un servidor!')
  .field('Nombre', `${guild.name}`, true)
  .field('ID', `${guild.id}`, true)
  .field('Servidores actuales', `${guilds}`, true)
  .field('Usuarios actuales', `${users}`, true)
  .field('Shard', guild.shard.id+1)
  .thumbnail(guild.iconURL || guild.dynamicIconURL)
  .color(0xd32222)
  .timestamp()
  client.executeWebhook('', '', {embeds: [embed]});
}
