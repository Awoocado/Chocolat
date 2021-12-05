const db = require('quick.db');
exports.run = async (client, message, args) => {
  const mod = db.fetch(`modRole_${message.guild.id}`);
  const amount = args.length == 1 ? parseInt(message.content.split(" ")[1]): parseInt(message.content.split(" ")[2]);
  const user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  if (!message.member.hasPermission("manageMessages") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.");
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages')) return message.channel.createMessage(":x: | No tengo los permisos necesarios para borrar mensajes.\nNecesito tener el permiso `Administrar Mensajes` activado.").then(m => setTimeout(() => m.delete(), 6000));
  if (!amount) return message.channel.createMessage(":x: | Debes especificar la cantidad de mensajes a eliminar.").then(m => setTimeout(() => m.delete(), 6000));
  if (!amount && !user) return message.channel.createMessage(":x: | Debes mencionar a un usuario y especificar la cantidad de mensajes a eliminar de dicho usuario.\nO bien, solo especificar la cantidad.").then(m => setTimeout(() => m.delete(), 6000));
  if (amount > 100) return message.channel.createMessage(message.author.mention+", :x: | Solo se pueden borrar un máximo de 100 mensajes.").then(m => setTimeout(() => m.delete(), 6000));
  if (amount < 2) return message.channel.createMessage(message.author.mention+", :x: | Solo se pueden borrar un mínimo de 2 mensajes.").then(m => setTimeout(() => m.delete(), 6000));


  message.channel.getMessages(amount).then(messages => {
    if (user) {
      const filterBy = user.id ? user.id : client.user.id;
      messages = messages.filter(m => m.author.id === filterBy);
  };
    let purge = messages.map(e => e.id);
    message.channel.deleteMessages(purge).catch(error => {
      message.channel.createMessage(':x: | Error al ejecutar el comando. Puede que entre los mensajes que usted desea borrar, hayan mensajes con más de 14 días de antigüedad que no pueden ser borrados, o posiblemente no tenga los permisos para eliminar estos mensajes.').then(m => setTimeout(() => m.delete(), 6000));
    });
  });
};

exports.config = {
  command: "purge",
  category: "Comandos ADMIN/MOD",
  permissions: "Administrar mensajes.",
  description: "Elimina una gran cantidad de mensajes. O elimina una gran cantidad de un usuario en específico. La cantidad mínima es de 2 mensajes y la cantidad máxima es de 100. Además, los mensajes que tengan más de 2 semanas de antigüedad no podrán ser eliminados usando este comando.",
  usage: "{prefix}purge [@usuario] <cantidad>",
  example: "*Sin usuario*\n{prefix}purge 100\n*Con usuario*\n{prefix}purge @MathError#6880 100\n\n1. *{prefix}purge cantidad*: Este borrará la cantidad especificada de mensajes de todos los usuarios.\n2. *{prefix}purge @usuario cantidad*: Este borrará la cantidad de mensajes especificada del usuario mencionado.",
  aliases: ["prune", "clean"],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
