
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if(!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para crear roles.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if(!args.join(' ')) return message.channel.createMessage("Especifique qué paleta de colores desea añadir, actualmente son 3:\n- Normal.\n- Pastel.\n- Oscuro.\n Si quiere añadir una de esas 3, use el comando como este ejemplo: `{prefix}addcoloroles Normal`".replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 8000));
  
  let owo;
  if(args == 'Oscuro')owo = [{ name: 'Rojo Oscuro', color:0x8A0101},{ name:'Rosa Oscuro', color:0x8A0137},{ name:'Morado Oscuro', color:0x86018A},{ name:'Azul Oscuro', color:0x01018A},{ name:'Cian Oscuro', color:0x018A8A},{ name:'Verde Oscuro', color:0x098A01},{ name:'Amarillo Oscuro', color:0x8A8A01},{ name:'Naranja Oscuro', color:0x8F5B00}];
  else if(args == 'Normal')owo = [{ name:'Negro', color:0x010101},{ name:'Gris', color:0x6e6e6e},{ name:'Blanco', color:0xffffff},{ name:'Rosa', color:0xff0040},{ name:'Morado', color:0xa901db},{ name:'Azul', color:0x0101df},{ name:'Cian', color:0x00ffff},{ name:'Verde', color:0x01df01},{ name:'Amarillo', color:0xd7df01},{ name:'Naranja', color:0xdf3a01},{ name:'Rojo', color:0xdf0101},{ name:'Pantone', color:0xdf0174},{ name:'Fucsia', color:0xdf01a5},{ name:'Magenta', color:0xdf01d7},{ name:'Violeta', color:0x7401df},{ name:'Púrpura', color:0x5b01df},{ name:'Cielo', color:0x01a9db},{ name:'Aquamarina', color:0x01dfa5},{ name:'Lima', color:0xa5df00},{ name:'Mostaza', color:0xdba901},{ name:'Caoba', color:0xdf7401}];
  else if(args == 'Pastel')owo = [{ name:'Rosa Pastel', color:0xFFA9CF},{ name:'Morado Pastel', color:0xF3A9FF},{ name:'Azul Pastel', color:0xA9B7FF},{ name:'Cian Pastel', color:0xA9FFF8},{ name:'Verde Pastel', color:0xA9FFAA},{ name:'Amarillo Pastel', color:0xF8FFA9},{ name:'Naranja Pastel', color:0xFFE1A9},{ name:'Rojo Pastel', color:0xFFA9A9}];
  else return message.channel.createMessage(':x: | Paleta de color no encontrada. Fíjate que estés escribiendo el nombre de la paleta correctamente.').then(m => setTimeout(() => m.delete(), 6000))
  
  const exists = owo.map(c=>c.name).some(r=>message.guild.roles.map(q=>q.name).includes(r)); 
  if(exists) return message.channel.createMessage(`:x: | Los roles ya se han creado o siguen creándose, **no hay ninguno más por añadir o están añadiéndose aún.** Si no es así, prueba **borrando** cualquier rol con los nombres: **"${owo.map(c=>c.name).join(`", "`)}"** y vuelve a usar el comando.`).then(m => setTimeout(() => m.delete(), 8000))
  
  let tiempo = 15000;
  message.channel.createMessage('Creando roles de colores...\nEl proceso puede tardar aproximadamente **5 minutos**.');
  for(const i in owo){setTimeout(()=>message.guild.createRole({name:owo[i].name,color:owo[i].color,position:1}),i*tiempo)}
  setTimeout(() => {message.channel.createMessage('Roles creados con éxito.')}, tiempo*owo.length)
};

exports.config = {
  command: "addcoloroles",
  category: "Comandos ADMIN/MOD",
  permissions: "Administrar Roles",
  description: "Crea roles de colores para la interfaz de roles. Debes especificar qué paleta de color quieres que contengan los roles.\n**Paletas actuales:**\n- Normal: Crea roles con colores sólidos.\n- Oscuro: Crea roles con colores oscuros.\n- Pastel: Crea roles con colores pasteles.",
  usage: '{prefix}addcoloroles <paleta de color>',
  example: '{prefix}addcoloroles Pastel\n\nEsto agregará roles de color pastel al servidor.',
  aliases: ['addcr', 'coloroles'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
};