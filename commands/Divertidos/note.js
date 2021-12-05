const Jimp = require('jimp');
const filters = require('../../data/filters.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) {
    if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
      return message.channel.createMessage(':x: | El texto del logro no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
    }
  }
  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir el texto que se mostrará en la nota.').then(m => setTimeout(() => m.delete(), 6000));
  if (args.join(' ').length > 10) return message.channel.createMessage(':x: | Excediste el máximo de caracteres permitidos (10)').then(m => setTimeout(() => m.delete(), 6000));
  else {
      Jimp.read("https://cdn.discordapp.com/attachments/373002380616138752/381978115351773185/5050591-White-paper-sheet-and-motley-pins-on-wood-texture-vector-CMYK--Stock-Vector.jpg", (err, imgedited) =>{

        if (err) throw err;
        imgedited.resize(300, 250);
        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) =>{
          imgedited.print(font, 60, 50, `${args.join(' ')}`, 240);

          imgedited.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if (err) return message.channel.createMessage(':x: | Ocurrió un error al intentar generar la imagen.\nDetalles del error: `'+err+'`')
            message.channel.createMessage(undefined, { file: buffer, name: `${Date.now()}-${message.author.id}.png` });
          });
        });
      });
    };
};

exports.config = {
  command: 'note',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Genera una imagen de una nota y la envía al canal. El texto de la nota tiene un límite de 40 caracteres.',
  usage: '{prefix}note <texto>',
  example: '{prefix}note Actualizar a Chocolat. Att: Noname7612.\n\nEsto generará una imagen de una nota con el texto especificado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};
