const fs = require('fs')
const pack = require('../../package.json');
const config = require('../../config.json')


exports.run = async (client, message, args) => {
  if(!message.guild.me.hasPermission("attachFiles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.").then(m => setTimeout(() => m.delete(), 6000))
  let version = args[0] || pack.version
  if (version == "list") return fs.readdir('./data/logversiones/', (err, files) => {
    if (err) return message.channel.createMessage(':x: | Ocurrió un error al tratar de leer las versiones en la carpeta `./data/logversiones/`\nDetalles del error: `'+err+'`.');
    let f = files.join(" \n");
    var fn = "";
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      fn = fn + "\n> ○ " + f.slice(0, f.lastIndexOf(".txt"));
    }
    message.channel.createMessage("**Lista de versiones**" + fn + "\n Si desea ver una nota específica, use el comando como el siguiente ejemplo: `{prefix}release 3.0.0`.".replace(/{prefix}/gi, config.prefix));
  });
  fs.access(`./data/logversiones/${version}.txt`, fs.F_OK, (err) => {
    if (err) return message.channel.createMessage(":x: | La versión especificada no existe. Vea las versiones disponibles con `{prefix}release list`.".replace(/{prefix}/gi,config.prefix)).then(m => setTimeout(() => m.delete(), 6000))

    //if (err) return message.channel.createMessage('Detalles del error: `'+err+'`');
    let mss= ""
    if (version == pack.version) mss = `**Versión: ${version} (Versión actual)**\nSi desea ver otras versiones use: \`{prefix}release list\` y luego coloque la versión que desee ver.`.replace(/{prefix}/gi, config.prefix);
    else mss = `**Versión: ${version}**\nSi desea ver otras versiones use: \`{prefix}release list\` y luego coloque la versión que desee ver.`.replace(/{prefix}/gi,config.prefix);
    message.channel.createMessage(mss, {file: fs.readFileSync(`./data/logversiones/${version}.txt`, 'utf8'), name: `${version}.txt`});
  });
};

exports.config = {
  command: 'release',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Observa los cambios de actualización. Puedes también ver los cambios de actualización de versiones anteriores.',
  usage: '{prefix}release [versión/list]',
  example: '{prefix}release 3.0.0 | {prefix}release list\n\n1. *{prefix}release versión*: Muestra los cambios de la actualización especificada.\n2. *{prefix}release list*: Muestra la lista de versiones disponible.',
  aliases: ['version', 'changelog'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};