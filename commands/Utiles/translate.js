const Eris = require("eris-additions")(require("eris"));
const translate = require('@vitalets/google-translate-api');
exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes especificar el idioma a traducir.\n__Modo de uso:__ {prefix}translate <idioma>/<texto>.\n__Ejemplo:__ {prefix}translate es/Hello, how are you?.\nConsulta la lista de idiomas con: `{prefix}translate languages`.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000))
  
  let args2 = args.join(' ');
  let text = args2.split("/");

  if (args2 == "languages") {
    const embed = new Eris.Embed()
      .author('Lenguajes', 'https://lh3.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA')
      .description('Estos son los lenguajes admitidos, están ordenados según su nombre. Para su uso en el comando **debes usar el abreviado** que corresponda al idioma que deseas traducir algo, ejemplo: `{prefix}translate es/I like chocolate` = Me gusta el chocolate.'.replace(/{prefix}/gi, require('../../config.json').prefix))
      .field('A - K', 'auto: Automatic\naf: Afrikaans\nsq: Albanian\nam: Amharic\nar: Arabic\nhy: Armenian\naz: Azerbaijani\neu: Basque\nbe: Belarusian\nbn: Bengali\nbs: Bosnian\nbg: Bulgarian\nca: Catalan\nceb: Cebuano\nny: Chichewa\nzh-CN: Chinese (Simplified)\nzh-TW: Chinese (Traditional)\nco: Corsican\nhr: Croatian\ncs: Czech\nda: Danish\nnl: Dutch\nen: English\neo: Esperanto\net: Estonian\ntl: Filipino\nfi: Finnish\nfr: French\nfy: Frisian\ngl: Galician\nka: Georgian\nde: German\nel: Greek\ngu: Gujarati\nht: Haitian Creole\nha: Hausa\nhaw: Hawaiian\nhe: Hebrew\niw: Hebrew\nhi: Hindi\nhmn: Hmong\nhu: Hungarian\nis: Icelandic\nig: Igbo\nid: Indonesian\nga: Irish\nit: Italian\nja: Japanese\njw: Javanese\nkn: Kannada\nkk: Kazakh\nkm: Khmer\nko: Korean\nku: Kurdish (Kurmanji)\nky: Kyrgyz',true)
      .field('L - Z', '\nlo: Lao\nla: Latin\nlv: Latvian\nlt: Lithuanian\nlb: Luxembourgish\nmk: Macedonian\nmg: Malagasy\nms: Malay\nml: Malayalam\nmt: Maltese\nmi: Maori\nmr: Marathi\nmn: Mongolian\nmy: Myanmar (Burmese)\nne: Nepali\nno: Norwegian\nps: Pashto\nfa: Persian\npl: Polish\npt: Portuguese\npa: Punjabi\nro: Romanian\nru: Russian\nsm: Samoan\ngd: Scots Gaelic\nsr: Serbian\nst: Sesotho\nsn: Shona\nsd: Sindhi\nsi: Sinhala\nsk: Slovak\nsl: Slovenian\nso: Somali\nes: Spanish\nsu: Sundanese\nsw: Swahili\nsv: Swedish\ntg: Tajik\nta: Tamil\nte: Telugu\nth: Thai\ntr: Turkish\nuk: Ukrainian\nur: Urdu\nuz: Uzbek\nvi: Vietnamese\ncy: Welsh\nxh: Xhosa\nyi: Yiddish\nyo: Yoruba\nzu: Zulu',true)
      .color(5213173);
    return message.channel.createMessage({ embed });
  };

  translate(text[1], {to: text[0].toLowerCase()}).then(res => {
    const embed = new Eris.Embed()
      .author("Traductor de idiomas", `https://lh3.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA`)
      .field("Texto a traducir:", '> ' + text[1] + '')
      .field("Texto traducido:", '> ' + res.text + '')
      .footer('Consulta los idiomas disponibes con: {prefix}translate languages'.replace(/{prefix}/gi, require('../../config.json').prefix))
      .color(5213173);
    message.channel.createMessage({ embed });
  }).catch(e => message.channel.createMessage(':x: | El idioma que colocaste no existe. Verifica la lista de idiomas aceptados e intente de nuevo. Este problema también puede ser ocasionado por exceder el límite de carácteres permitidos.'));
};

exports.config = {
  command: 'translate',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Traduce un texto. Debes colocar el abreviado del idioma a traducir y luego el texto, separados por un "/". Puedes colocar `languages` después del comando para ver la lista de idiomas disponibles.',
  usage: '{prefix}translate <idioma>/<texto> [languages]',
  example: '{prefix}translate es/Hello, how are you? | {prefix}translate languages\n\n1. *{prefix}translate idioma/texto*: Esto traducirá el texto al idioma especificado.\n2. *{prefix}translate languages*: Esto mostrará la lista de lengüajes disponibles.',
  aliases: ['tr'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};