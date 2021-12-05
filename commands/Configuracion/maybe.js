const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let perms = message.member.hasPermission('manageMessages');
  if (!perms) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.').then(m => setTimeout(() => m.delete(), 6000));
  let id = args[0];
  let text = args.slice(1).join(' ');
  const featch = db.fetch(`suggestChannel_${message.guild.id}`);
  if (!message.guild.channels.get(featch)) return message.channel.createMessage(':x: | El canal de sugerencias no ha sido establecido.').then(m => setTimeout(() => m.delete(), 6000));
  let channel = message.guild.channels.get(featch);
  if (!id) return message.channel.createMessage(':x: | Debes poner la ID del mensaje.').then(m => setTimeout(() => m.delete(), 6000));
  if (isNaN(id)) return message.channel.createMessage(':x: | La ID solo debe contener números.').then(m => setTimeout(() => m.delete(), 6000));
  if (!text) return message.channel.createMessage(':x: | Debes escribir la razón por la cual dejas esta sugerencia en potencial.').then(m => setTimeout(() => m.delete(), 6000));

  channel.getMessage(id).then(msg=>{
    if (!msg) return message.channel.createMessage(':x: | La ID del mensaje es incorrecta.').then(m => setTimeout(() => m.delete(), 6000));
    const embed = new Eris.Embed()
      .author(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
      .title('Sugerencia potencial.')
      .description(msg.embeds[0].description)
      .field('Razón dada por ' + message.author.tag, text)
      .color(0xf0d900)
      .footer('Sugerencia para ' + message.guild.name)
      if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      msg.edit({ embed }).catch(e=>message.channel.createMessage(':x: | Ocurrió un error al intentar editar el mensaje.\nEs posible que no tenga los suficientes permisos para realizar dicha acción.'))
    }).catch(e=>message.channel.createMessage(":x: | No se encontró el mensaje").then(m=>m.delete({timeout: 6000 })))
};

exports.config = {
  command: 'maybe',
  category: 'Comandos de Configuración',
  permissions: 'Administrar Mensajes',
  description: 'Deja una sugerencia como potencial. Para dejar una sugerencia como potencial, deberás obtener la ID del mensaje.\nSi no sabes cómo obtener la ID, puedes hacer lo siguiente:\n1.- Ve a "Ajustes de Usuario".\n2.- Ve al apartado de "Apariencia"\n3.- Habilita la opción "Modo Desarrollador."\n4.- Click derecho al mensaje y luego "Copiar ID".',
  usage: '{prefix}maybe <ID>/<razón>',
  example: '{prefix}maybe 477262961694736417 Tu sugerencia entrará en discusión.\n\nEsto marcará la sugerencia como potencial colocando quién la dejó como potencial y la razón del porqué se marcó como potencial.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};