const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  let color = message.content.split(/\s+/g).slice(1).join(" ");

  if (!color) {
    var genColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
    if (genColour.length < 7) genColour = '#a3c' + Math.round(Math.random() * 1000);
    const embed = new Eris.Embed()
      .color(parseInt(genColour.slice(1), 16))
      .image(`https://dummyimage.com/500/${genColour.slice(1)}/&text=%20`)
      .footer(genColour);
    return message.channel.createMessage({ embed });
  };
  if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length === 7 && color < 16777215)) {
    let colorint = parseInt(color.slice(1), 16);
    const embed = new Eris.Embed()
      .color(colorint)
      .image(`https://dummyimage.com/500/${color.slice(1)}/&text=%20`)
      .footer(color);
    return message.channel.createMessage({ embed });
  } else {
      return message.channel.createMessage(":x: | El código hexadecimal es incorrecto. No olvide incluir el \"#\", ejemplo: #3869e7").then(m => setTimeout(() => m.delete(), 6000))
  };
};

exports.config = {
    command: 'hexcolor',
    category: 'Comandos Útiles',
    permissions: 'Ninguno',
    description: 'Obtén una vista previa de un código de color hexadecimal. U obtén un código de color hexadecimal aleatorio.',
    usage: '{prefix}hexcolor [#código]',
    example: '{prefix}hexcolor | {prefix}hexcolor #FF0000\n\n1. *{prefix}hexcolor*: Esto mostrará un color aleatorio, incluyendo su código hexadecimal.\n2. *{prefix}hexcolor #código*: Esto mostrará el color correspondiente al código colocado.',
    aliases: ['hex', 'color'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 10000
};