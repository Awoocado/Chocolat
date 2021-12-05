const db = require('quick.db');
const config =require('../../config.json')

exports.run = async (client, message, args) => {
  let [option, id] = args.join(' ').split(" ");
  let reason = args.join(' ').split(" ").slice(2).join(" ");
  
  let trustedstaff = ["192756779573051392", "398658092021055511", "241775896518721536", "288143032375574538", "419631170074968076","224619540263337984", "460489146922958849"];
  if (!trustedstaff.includes(message.author.id)) return message.channel.createMessage(':x: | No tienes acceso a este comando.\nNecesitas ser `Staff de Confianza de ' + client.user.username + '` para usar este comando.').then(m => setTimeout(() => m.delete(), 6000));

  if (!option) return message.channel.createMessage(':x: | Debes poner lo que quieras hacer, la ID y una razón.\nEjemplo: {prefix}userblacklist add 192756779573051392 Mal uso de Bugreport.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  if (!id) return message.channel.createMessage(':x: | Introduzca una ID de un usuario.').then(m => setTimeout(() => m.delete(), 6000));
  if (reason.length < 1) return message.channel.createMessage(':x: | Debes añadir una razón a la sanción.').then(m => setTimeout(() => m.delete(), 6000));
  //else reason = `${reason}`.replace(/,/gi, " ");
  
  if (option === 'add') {
    let userm = await client.getDMChannel(id).catch(e => message.channel.createMessage('La ID no es válida.').then(m => setTimeout(() => m.delete(), 6000)));
    const listed = db.fetch(`userBlackList_${id}`);
    
    if (`${userm}`.includes('[object Object]')) return;
    if (id === listed) return message.channel.createMessage(':x: | El usuario **<@'+ id +'> ('+id+')** ya está en la lista negra.').then(m => setTimeout(() => m.delete(), 6000));
    if (trustedstaff.includes(id)) {
      message.channel.createMessage(':x: | No se puede incluir las IDs del Staff de Confianza en la lista negra.\nSe reportará tu acción con el Staff.').then(m => setTimeout(() => m.delete(), 6000));
      client.getDMChannel('398658092021055511').then(m => m.createMessage(':warning: **| Cuidado**\nEl usuario **'+message.author.tag+'** `('+message.author.id+')` '+message.author.mention+' ha intentado hacer uso del comando UBL de mala manera.\nPretendió añadir a **'+id+'** <@'+id+'> a la lista negra.\n**Razón:** '+reason));
      return;
    };
    
    db.set(`userBlackList_${id}`, id);
    await message.channel.createMessage('El usuario **<@'+ id +'> ('+id+')** ha sido añadido a la lista negra. Ese usuario no será capaz de usar comandos.\n**Razón:** '+reason);
    
  } else if (option === "remove") {
    let user = db.fetch(`userBlackList_${id}`);
    let userm = await client.getDMChannel(id).catch(e => message.channel.createMessage('La ID no es válida.').then(m => setTimeout(() => m.delete(), 6000)));
    if (`${userm}`.includes('[object Object]')) return;
    if (!user) return message.channel.createMessage(':x: | El usuario **<@'+ id +'> ('+id+')** no está en la lista negra.').then(m => setTimeout(() => m.delete(), 6000));
    
    db.delete(`userBlackList_${user}`);
    await message.channel.createMessage('El usuario **<@'+ id +'> ('+id+')** ha sido removido de la lista negra.\n**Razón:** '+reason);
  } else message.channel.createMessage(':x: | Debe poner una razón válida. (add/remove)');
};

exports.config = {
  command: 'userblacklist',
  category: 'Comandos de Desarrollador',
  permissions: 'Desarrollador',
  description: 'Añade o borra una ID de la lista negra. Esta lista negra hará que el usuario no pueda usar el bot.\nOpciones:\n-**add**: Agrega una ID.\n-**remove**: Retira una ID',
  usage: '{prefix}userblacklist <add/remove> <id> <razón>',
  example: '{prefix}userblacklist | Para añadir: {prefix}userblacklist add 394204192401562284 Mal uso de bugreport, para remover: {prefix}userblacklist remove 39428502914053146 Apelación exitosa.',
  aliases: ['ubl', 'blacklist'],
  developerOnly: true,
  allowedToDisable: false,
  visible: false,
  cooldown: 0
};