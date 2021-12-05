const db = require('quick.db');

exports.run = async (client, user, message) => {
  let r = db.fetch(`autoRole_${message.guild.id}`);
  let i = db.fetch(`messageChannel_${message.guild.id}`);

  if (!r || r.toLowerCase(r) == 'none');
  else if (!message.guild.me.hasPermission("manageRoles"));
  else if (message.guild.roles.get(r) && message.guild.roles.get(r).addable) message.guild.members.get(message.user.id).addRole(r);
  if (!message.guild.channels.get(i)) return;
  if (!message.guild.channels.get(i).memberHasPermission(client.user.id, 'sendMessages')) return;
  if (!message.guild.channels.get(i).memberHasPermission(client.user.id, 'readMessages')) return;
  
  let o = db.fetch(`joinMessage_${message.guild.id}`)
  if (!o) return;
  else message.guild.channels.get(i).createMessage(
	o.replace(/{user}/mgi, message.user.mention)
	 .replace(/{members}/mgi, message.guild.memberCount)
   .replace(/{usern}/mgi, message.user.tag)
   .replace(/{server}/mgi, message.guild.name)
   .replace(/{userid}/mgi, message.user.id))
}

