const config = require('../../config.json')
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("manageMessages")) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.').then(m => setTimeout(() => m.delete(), 6000))
  let id = args[0];
  let texto = args.slice(1).join(' ');
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();

  if (!id) return message.channel.createMessage(':x: | Coloque la ID del mensaje de ' + client.user.username + ' que desea editar. Use el siguiente formato: `{prefix}editsay <ID de un mensaje del bot> <Nuevo mensaje>`.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000))
  if (!texto) return message.channel.createMessage(':x: | Escriba el nuevo contenido del mensaje a editar.').then(m => setTimeout(() => m.delete(), 6000))
  if (id.lenght = 18) message.channel.getMessage(id).then(m => m.edit(texto)).catch(e => message.channel.createMessage(':x: | Debe de especificar una **ID** del mensaje del bot válida.').then(m => setTimeout(() => m.delete(), 6000)));
};

exports.config = {
  command: 'editsay',
  category: 'Comandos ADMIN/MOD',
  permissions: 'Administrar mensajes',
  description: 'Edita el contenido de un mensaje enviado por el bot. Si no sabes cómo obtener la ID, puedes hacer lo siguiente:\n1.- Ve a "Ajustes de Usuario".\n2.- Ve al apartado de "Apariencia"\n3.- Habilita la opción "Modo Desarrollador."\n4.- Click derecho al mensaje y luego "Copiar ID".',
  usage: '{prefix}editsay <ID de un mensaje del bot> <Nuevo mensaje>',
  example: '{prefix}editsay 552213217410285578 probando uwu.',
  aliases: ['edits'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};