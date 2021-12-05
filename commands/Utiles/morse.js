const morse = require('morsify');
const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  
  let option = args[0];
  let text = args.slice(1).join(' ');

  if (!option) return message.channel.createMessage(':x: | Debes especificar si vas a cifrar `en` o descifrar `de` un código morse.\n> Ejemplo: {prefix}morse en Hola, estoy cifrando a código morse.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 8000))
  if (!text) return message.channel.createMessage(':x: | Debes escribir el texto a cifrar, o el código morse a descifrar.').then(m => setTimeout(() => m.delete(), 6000))

  let embed = new Eris.Embed()
  .author("Traductor de código Morse", `https://cdn.discordapp.com/attachments/624729248921419808/738219185951473824/images.png`)
  .color(0xEDEDED);

  if (option === 'en') {
    const encoded = morse.encode(text);
    embed.field(`Texto a cifrar:`, `\`${text}\``)
    embed.field(`Texto cifrado:`, `\`${encoded}\``)
    message.channel.createMessage({embed});
  } else if (option === 'de') {
    const decoded = morse.decode(text);
    embed.field(`Texto a decifrar:`, `\`${text}\``)
    embed.field(`Texto decifrado:`, `\`${decoded}\``)
    message.channel.createMessage({embed});
  } else {
    message.channel.createMessage(`:x: | Opción incorrecta. Debes especificar si vas a cifrar \`en\` o descifrar \`de\` un código morse.`).then(m => setTimeout(() => m.delete(), 6000))
  };
};

exports.config = {
  command: 'morse',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Traduce un código morse, o convierte un texto en código morse.\nOpciones:\n1.- `en`: Cifra un texto a código morse.\n2.- `de`: Descifra un código morse a texto.',
  usage: '{prefix}morse <en/de> <texto>',
  example: '{prefix}morse de ----- .---- .---- .---- ----- .---- .---- .---- / ----- .---- .---- ----- ----- .---- ----- .---- / ----- .---- .---- ----- .---- ----- ----- .---- / ----- .---- .---- .---- ----- ----- .---- ----- / ----- .---- .---- ----- ----- .---- ----- ----- | {prefix}morse en Hola, estoy cifrando a código morse.\n\n1. *{prefix}morse de código*: Esto traducirá de código morse a idioma entendible.\n2. *{prefix}morse en texto*: Esto cifrará el texto a código morse.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 10000
}; 