const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("manageMessages")) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.').then(m => setTimeout(() => m.delete(), 8000));
  let id = args[0];
  let color = args[1];
  let texto = args.slice(2).join(' ');
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();

  if (!id) return message.channel.createMessage(':x: | Coloque la ID del embed de ' + client.user.username + ' que desea editar. Use el siguiente formato: `{prefix}editembed <ID de un mensaje del bot> <colorhexadecimal>/<RANDOM> <Nuevo mensaje>`.'.replace(/{prefix}/gi,config.prefix)).then(m => setTimeout(() => m.delete(), 8000));
  if (!color) return message.channel.createMessage(':x: | Coloque un color hexadecimal o escriba "RANDOM".\nEjemplos:\nRandom - `{prefix}editembed 667936906201399296 RANDOM ¡Color aleatorio!`\nEspecífico - `{prefix}editembed 667936906201399296 FFF000 ¡Color específico!`'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 10000));
  if (!texto) return message.channel.createMessage(':x: | Escriba el nuevo contenido del mensaje a editar.').then(m => setTimeout(() => m.delete(), 6000));
  if (color == 'RANDOM') {
    const embed = new Eris.Embed()
      .description(texto)
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.getMessage(id).then(m => m.edit({ embed })).catch(e => message.channel.createMessage(':x: | Debe de especificar una **ID** del mensaje del bot válida, o asegurarse de estar en el canal del mensaje.').then(m => setTimeout(() => m.delete(), 6000)));
    return;
  } else
  if (color.length == (6)) {
    const embed = new Eris.Embed()
      .description(texto)
      .color(parseInt(color, 16))
    message.channel.getMessage(id).then(m => m.edit({ embed })).catch(e=> message.channel.createMessage(':x: | Debe de especificar una **ID** del mensaje del bot válida.'));
  } else {
    return message.channel.createMessage(':x: | Debe de especificar un código hexadecimal válido. Recuerde no incluir "#" en este.').then(m => setTimeout(() => m.delete(), 6000));
  };
};

exports.config = {
  command: 'editembed',
  category: 'Comandos ADMIN/MOD',
  permissions: 'Administrar mensajes',
  description: 'Edita el contenido de un embed mandado por el bot. Se debe incluir el color en código hexadecimal. Si no sabes cómo obtener la ID, puedes hacer lo siguiente:\n1.- Ve a "Ajustes de Usuario".\n2.- Ve al apartado de "Apariencia"\n3.- Habilita la opción "Modo Desarrollador."\n4.- Click derecho al mensaje y luego "Copiar ID".',
  usage: '{prefix}editembed <ID de un mensaje embed del bot> <colorhexadecimal/RANDOM> <Nuevo mensaje>',
  example: 'Para colocarlo con el color que deseas: {prefix}editembed 552213217410285578 FFF000 probando uwu\n Para colocarlo con un color aleatorio: {prefix}editembed 552213217410285578 RANDOM probando uwu.',
  aliases: ['edite'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
