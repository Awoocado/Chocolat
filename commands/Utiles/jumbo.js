const Eris = require("eris-additions")(require("eris"));
const request = require('request');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  let emoji = args.join('');
  let args2 = args.join(' ').split('--').slice(0);
  class Util {
    static parseEmoji(text) {
    if (text.includes('%')) text = decodeURIComponent(text);
    if (!text.includes(':')) return { animated: false, name: text, id: null };
    const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/); if (!m) return null;
    return { animated: Boolean(m[1]), name: m[2], id: m[3] || null };
    }
  }

  if (!emoji) return message.channel.createMessage(":x: | Escribe un emoji para ampliarlo. Si desea obtener también el enlace, coloque `--url` después del emoji.").then(m => setTimeout(() => m.delete(), 6000))

  let emojiparse = (Util.parseEmoji(emoji));
  if (!emojiparse.id) return message.channel.createMessage(":x: | Debe introducir un emoji válido. Tampoco se pueden ampliar los emojis de Discord.").then(m => setTimeout(() => m.delete(), 6000))
  if (args2.includes("url")) {
    const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).title(emojiparse.name);
    if (emojiparse.animated == true) {
      embed.description("[URL de la imagen](https://cdn.discordapp.com/emojis/" + emojiparse.id + ".gif)");
      embed.image("https://cdn.discordapp.com/emojis/" + emojiparse.id + ".gif");
    }else {
      embed.description("[URL de la imagen](https://cdn.discordapp.com/emojis/" + emojiparse.id + ".png)").image("https://cdn.discordapp.com/emojis/" + emojiparse.id + ".png")
    };
    return message.channel.createMessage({ embed });
  };
  
  if (emojiparse.animated == true) {
    let url = "https://cdn.discordapp.com/emojis/" + emojiparse.id + ".gif";
    request({ url, encoding: null }, (err, resp, buffer) => {
      if (err) return message.channel.createMessage(':x: | Ocurrió un error al intentar generar la imagen.\nDetalles del error: `'+err+'`').then(m => setTimeout(() => m.delete(), 6000));
      message.channel.createMessage(undefined, {file: buffer, name: "emoji.gif"});
  });
  } else {
    let url = "https://cdn.discordapp.com/emojis/" + emojiparse.id + ".png";
    request({ url, encoding: null }, (err, resp, buffer) => {
      if (err) return message.channel.createMessage(':x: | Ocurrió un error al intentar generar la imagen.\nDetalles del error: `'+err+'`').then(m => setTimeout(() => m.delete(), 6000));
      message.channel.createMessage(undefined, {file: buffer, name: "emoji.png"});
  });
  }
  
};

exports.config = {
  command: "jumbo",
  category: "Comandos Útiles",
  permissions: 'Ninguno',
  description: "Obtén la imagen más grande del emoji proporcionado. También puede tener el enlace de descarga de la imagen poniendo `--url` al final del comando.\n__Nota:__ Los emojis de Discord no se pueden expandir.",
  usage: '{prefix}jumbo <emoji> [--url]',
  example: '{prefix}jumbo :sadpotato: | {prefix}jumbo :sadpotato: --url\n\n1. *{prefix}jumbo emoji*: Esto enviará la imagen del emoji más grande.\n2. *{prefix}jumbo emoji --url*: Esto enviará la imagen del emoji más grande, y también adjuntará el enlace del mismo.',
  aliases: ['emoji'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};