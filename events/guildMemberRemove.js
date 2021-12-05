const db = require('quick.db')

exports.run = async (client, user, message) => {
  if (!message.guild.id) return;
  let i = db.fetch(`messageChannel_${message.guild.id}`);
  if (!message.guild.channels.get(i)) return;
  if (!message.guild.channels.get(i).memberHasPermission(client.user.id, 'sendMessages')) return;
  if (!message.guild.channels.get(i).memberHasPermission(client.user.id, 'readMessages')) return;
  let o = db.fetch(`leaveMessage_${message.guild.id}`)
  
  if (!o) return;
  else message.guild.channels.get(i).createMessage(
    o.replace(/{user}/mgi, message.user.tag)
    .replace(/{members}/mgi, message.guild.memberCount)
    .replace(/{server}/mgi, message.guild.name)
    .replace(/{userid}/mgi, message.user.id)
  ) 
}

function embed(channel, user, deleteTimer){
  channel.createMessage(user).then(msg => {
    if (!isNaN(deleteTimer)){
      msg.delete(deleteTimer)
    }
  })
}
