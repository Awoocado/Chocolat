exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  let exception = '224619540263337984'
  let exception2 = '658131567356411905'
  let exception3 = '409147750161317891';

  if (exception == message.author.id) {
    if (!user) return message.channel.createMessage('**' + message.author.username + ',** has recibido un :avocado: de **' + client.user.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :avocado:');
    if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes darte un :avocado: a ti mismo. Para eso te lo comes y ya e.e');
    if (message.content.includes(client.user.id)) return message.channel.createMessage('O-oh, gracias por el :avocado: n.n/ **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :avocado:');
    message.channel.createMessage('**' + user.username + ',** has recibido un :avocado: de **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :avocado:');
  } else if (exception2 == message.author.id) {
    if (!user) return message.channel.createMessage('**' + message.author.username + ',** has recibido un :gift: con 10 :chocolate_bar: de **' + client.user.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :gift:');
    if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', mmm, parece que no deberías autoregalarte eso, ¡busca a alguien a quién regalarlo! >u<');
    if (message.content.includes(client.user.id)) return message.channel.createMessage('O-oh, gracias por el gran regalo :gift: n.n/ **' + message.author.username + '**\n\nTen te comparto un chocolate (づ｡◕‿‿◕｡)づ:･ﾟ✧ :chocolate_bar:');
    message.channel.createMessage('**' + user.username + ',** has recibido un :gift: con 10 :chocolate_bar: de **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :gift:');
  } else if (exception3 == message.author.id) {
    if (!user) return message.channel.createMessage('**' + message.author.username + ',** has recibido un :mate: de **' + client.user.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :mate:');
    if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', mmm, no, ¡tienes que compartir tu :mate:! >u<');
    if (message.content.includes(client.user.id)) return message.channel.createMessage('O-oh, gracias por el matecito :mate: n.n/ **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :mate:');
    message.channel.createMessage('**' + user.username + ',** has recibido un :mate: de **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :mate:');
  } else {
    if (!user) return message.channel.createMessage('**' + message.author.username + ',** has recibido una :cookie: de **' + client.user.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie:');
    if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes darte una galleta a ti mismo. Para eso te la comes y ya e.e');
    if (message.content.includes(client.user.id)) return message.channel.createMessage('O-oh, gracias por la galleta :cookie: n.n/ **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie:');
    if (user.id == '224619540263337984') return message.channel.createMessage('**' + user.username + ',** has recibido un :avocado: de **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :avocado:'); //¿Esta línea no está de más? Ya la excepción está arriba.
    message.channel.createMessage('**' + user.username + ',** has recibido una :cookie: de **' + message.author.username + '**\n\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie:');
  };
};

exports.config = {
  command: 'cookie',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Regala una galleta al usuario mencionado, o deja que {botname} te dé una galleta.',
  usage: '{prefix}cookie [@usuario]',
  example: '{prefix}cookie | {prefix}cookie @MathError#6880\n\n1. *{prefix}cookie*: Recibe una galleta de {botname}.\n2. *{prefix}cookie @usuario*: Esto hará que le regales una galleta al usuario mencionado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};