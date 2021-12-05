const Wiki = require('wikijs').default;
const filters = require('../../data/filters.json');
const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Escribe términos para buscar en Wikipedia').then(m => setTimeout(() => m.delete(), 6000));
  if (filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p))) {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    return message.channel.createMessage(':x: | Evite introducir palabras no deseadas en la búsqueda.').then(m => setTimeout(() => m.delete(), 6000))
  }
  Wiki({apiUrl: 'https://es.wikipedia.org/w/api.php'}).page(args.join(' ')).then(async page=>{
  
  let sum= await page.summary()
  let sumText = sum.toString().split('\n');
  let paragraph = sumText.shift();
  if (!paragraph) return message.channel.createMessage(":x: | No se encontró información del término.").then(m => setTimeout(() => m.delete(), 6000));
  
  const embed = new Eris.Embed()
    .author("Resultado de la búsqueda de Wikipedia", `https://cdn.discordapp.com/attachments/624729248921419808/738203826422546462/Wikipedia.png`)
    .description(`${paragraph}\n\n**Más información:** `+page.raw.fullurl)
    .color(0xEDEDED)

  await message.channel.createMessage({ embed });
  }).catch(e=>message.channel.createMessage(":x: | No se encontraron resultados.").then(m => setTimeout(() => m.delete(), 6000)))
}

exports.config = {
  command: 'wiki',
  category: 'Comandos de Búsqueda',
  permissions: 'Ninguno',
  description: 'Busca términos en Wikipedia Español.',
  usage: '{prefix}wiki <términos>',
  example: '{prefix}wiki El Imperio Romano.\n\nEsto buscará el artículo de "El Imperio Romano" en Wikipedia Español.',
  aliases: ['wk'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 20000
};
