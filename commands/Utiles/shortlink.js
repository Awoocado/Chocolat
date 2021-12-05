const isgd = require("isgd");

exports.run = async (client, message, args) => {
  let args2 = args.join(" ");
  let text = args2.split(" ");
  let link = text[0];
  let custom = text[1];

  if (!link) return message.channel.createMessage(":x: | Debes colocar un enlace para acortar.").then(m => setTimeout(() => m.delete(), 6000));

  if (!custom) {
    isgd.shorten(link, res=> {
      if (res.startsWith("Error:")) return message.channel.createMessage(":x: | Enlace inválido. Asegúrate de que lo estás escribiendo correctamente.").then(m => setTimeout(() => m.delete(), 6000));
      message.channel.createMessage(`:link: | Link acortado: **<${res}>**`);
    });
  } else {
    isgd.custom(link, custom, res => {
      if (res.startsWith("Error:")) return message.channel.createMessage(`:link: | Link acortado: **${res}**`);
      message.channel.createMessage(`:link: | Link acortado con etiqueta: **<${res}>**`);
    });
  }
};

exports.config = {
  command: "shortlink",
  category: "Comandos Útiles",
  permissions: "Ninguno",
  description:
    "Acorta un enlace. {botname} te enviará un enlace más corto del original. También puedes incluir una etiqueta para el enlace.",
  usage: "{prefix}shortlink <link> [título]",
  example:
    "{prefix}shortlink https://Chocolatbot.weebly.com/comandos.html | {prefix}shortlink https://chocolatbot.weebly.com/comandos.html Comandos\n\n1. *{prefix}shortlink enlace*: Este enviará el enlace acortado con un código por defecto.\n2. *{prefix}shortlink enlace etiqueta*: Este enviará el enlace acortado con la etiqueta especificada.",
  aliases: ["link"],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};
