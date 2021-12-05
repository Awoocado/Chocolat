const request = require('request');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(message.author.mention+', escriba una descripción corta del logro.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  }
  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  let args2 = args.join(' ');
  let [title, contents] = args2.split("/");
  if (!contents)[title, contents] = ['Logro desbloqueado', title];
  let rnd = Math.floor((Math.random() * 39) + 1);
  if (title.length > 22 || contents.length > 22) return message.channel.createMessage(":x: | Excediste el máximo de caracteres permitidos (22).").then(m => setTimeout(() => m.delete(), 6000));
  let url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  request({ url, encoding: null }, (err, resp, buffer) => {
    if (err) return message.channel.createMessage(':x: | Ocurrió un error al intentar generar la imagen.\nDetalles del error: `'+err+'`').then(m => setTimeout(() => m.delete(), 6000));
    message.channel.createMessage(undefined, { file: buffer, name: 'machievement.jpg' });
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
});
  /*Jimp.read(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`, (err, imgedited) =>{
    if (err) throw err;
      imgedited.getBuffer(Jimp, (err, buffer) => {
        if (err) return message.channel.createMessage(':x: | Ocurrió un error al intentar generar la imagen.\nDetalles del error: `'+err+'`')
        
      });
  });*/
};

exports.config = {
  command: 'machievement',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Genera un logro al estilo Minecraft. La descripción del logro es obligatoria. El título y texto del logro tienen un límite de 22 caracteres. El uso del separador "/" es obligatorio.',
  usage: '{prefix}machievement [título]/<descripción>',
  example: '*Sin título*\n{prefix}machievement Enviar 100 mensajes.\n*Con título*\n{prefix}machievement 150 comandos/Usar 150 comandos.\n\n1. *{prefix}machievement texto*: Envía una imagen generada de un logro de Minecraft, con título predeterminado.\n2. *{prefix}machievement título/texto*: Envía una imagen generada de un logro de Minecraft, con título y texto especificados.',
  aliases: ['mach'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};
