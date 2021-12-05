const db = require('quick.db');
const config = require("../config.json");
const servers = new db.table("servers")

exports.run = async (client, message) => {
  if (message.author.client || !message.channel.guild) return;
  if (message.author.bot === true) return;
  if(!message.guild.prefix) message.guild.prefix = db.fetch(`guildPrefix_${message.guild.id}`) || config.prefix
  const prefixRegex = new RegExp("^<@(|!|\\?)" + client.user.id + ">\\sprefix\\s*");
  if (!message.channel.memberHasPermission(client.user.id, 'sendMessages')) return;
  
  if (prefixRegex.test(message.content)) {
    if (!message.member.hasPermission('administrator')) return message.channel.createMessage('Mi prefijo para este servidor es: `' + message.guild.prefix + '`\nNecesitas ser administrador del servidor para reiniciarlo.').then(m => setTimeout(() => m.delete(), 9000));
    let author1 = message.author.id;
    await message.channel.createMessage('**Mi prefix para este servidor es: `' + message.guild.prefix + '`**\n¿Desea reiniciarlo? \nResponda con **"Sí"** en caso de ser así.').then(m => setTimeout(() => m.delete(), 20000));
    const msgs = await message.channel.awaitMessages((res) => author1 == res.author.id, {"maxMatches": 1, "time": 20000});
    if (!msgs.length || !['y', 'yes', 's', 'sí', 'si'].includes(msgs[0].content.toLowerCase())) return message.channel.createMessage('Comando cancelado.').then(m => setTimeout(() => m.delete(), 6000));
    message.channel.createMessage('**El prefijo ha sido establecido a: `' + config.prefix + '`.**\nSi necesita más ayuda, visite el servidor del soporte del bot, puede conseguir la invitación en el comando de ayuda.').then(m => setTimeout(() => m.delete(), 6000));
    message.guild.prefix = config.prefix
    return db.set(`guildPrefix_${message.guild.id}`, config.prefix);
  };
  if (!message.content.startsWith(message.guild.prefix)) return;

  const cont = message.content.slice(message.guild.prefix.length).split(" ");
  const args = cont.slice(1);
  const cmd = client.commands.get(cont[0].toLowerCase()) || client.commands.get(client.aliases.get(cont[0].toLowerCase()));
  if (!cmd) return;
  message.author.blacklisted = db.fetch(`userBlackList_${message.author.id}`) || false
  if(message.author.blacklisted) return message.channel.createMessage(message.author.mention+', estás en la lista negra, no puedes utlizar ningún comando. Puedes intentar apelar en https://forms.gle/q7eAhCRCKBFva7Bn7').then(m => setTimeout(() => m.delete(), 6000));

  if(message.guild.ignoredchannels == undefined) message.guild.ignoredchannels= (servers.fetch(`${message.guild.id}`) || {ignoredchannels:[]}).ignoredchannels
  
  const mod = db.fetch(`modRole_${message.guild.id}`);
  if (message.member.roles.find(x=>message.guild.roles.get(x).id==mod) || message.member.hasPermission("administrator"));
  else if (message.guild.ignoredchannels.includes(message.channel.id)) return;
  const disabled = db.fetch(`${cmd.config.command}comDis_${message.guild.id}`)
  if (disabled) return message.channel.createMessage('Comando deshabilitado.').then(m => setTimeout(() => m.delete(), 6000));
  if(message.author.cooldown>= message.timestamp && message.author.lastcmd == cmd.config.command){
    return message.channel.createMessage(message.author.mention+`, ¡tienes que esperar **${Math.floor(cmd.config.cooldown/1000)} segundos** antes de usar nuevamente este comando!`).then(m => setTimeout(() => m.delete(), cmd.config.cooldown));
  }
  message.author.cooldown = message.timestamp+ cmd.config.cooldown
  message.author.lastcmd = cmd.config.command
  

  cmd.run(client, message, args);
};
