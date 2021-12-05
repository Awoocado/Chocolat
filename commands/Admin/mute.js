const Eris = require("eris-additions")(require("eris"));
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let role = message.guild.roles.find(x=>x.name=="Silenciado");
  let perms = message.member.hasPermission("manageMessages");
  let args2 = args.join(" ");
  let razon = args2.split(" ").slice(1).join(" ");
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);

  if (!perms && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.").then(m => setTimeout(() => m.delete(), 6000));
  if (!message.guild.me.hasPermission("manageRoles") && !message.guild.me.hasPermission("manageChannels"))return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar los roles y modificar canales.\nNecesito tener los permisos `Administrar Roles` y `Administrar Canales` activados.").then(m => m.delete({timeout: 6000}));
  if (!args2) return message.channel.createMessage(":x: | Debes mencionar a un usuario, aunque si deseas crear primero el rol, usa la variante `create` después del comando.").then(m => setTimeout(() => m.delete(), 8000));
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  if (args2 === "create") {
    let check = message.guild.roles.find(x=>x.name=="Silenciado");
    if (check) return message.channel.createMessage(":x: | El rol **Silenciado** ya está creado y los canales están configurados. No hace falta crearlo de nuevo.").then(m => setTimeout(() => m.delete(), 6000));
    message.guild.createRole({
        name: "Silenciado",
        color: 0x747474,
        position: (message.guild.me.highestRole.position - 1)
    }).then(role => {
      let canales = message.guild.channels;
      let rol = message.guild.roles.get(role.id);

      canales.forEach(k => k.editPermission(rol.id, 1024, 2048, "role"));
      message.channel.createMessage(":white_check_mark: | El rol **Silenciado** ha sido creado correctamente. Los canales también fueron configurados.").then(m => setTimeout(() => m.delete(), 8000));
      });
    return;
    }
  if (!user) return message.channel.createMessage(":x: | Debes mencionar a un usuario.").then(m => setTimeout(() => m.delete(), 6000));
  if (message.guild.members.get(user.id).roles.find(x=>message.guild.roles.get(x).name=='Silenciado')) return message.channel.createMessage(':x: | El usuario ya está silenciado.').then(m => setTimeout(() => m.delete(), 6000))  
  if (message.content.includes(message.author.id))return message.channel.createMessage(":x: | No puedes silenciarte a ti mismo.").then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage("P-pero yo quiero responder a los comandos de todos... ¿p-por qué me quieres silenciar? :c").then(m => setTimeout(() => m.delete(), 6000));

    if (!role) {
      message.guild.createRole({
          name: "Silenciado",
          color: 0x747474,
          position: (message.guild.me.highestRole.position - 1)
      }).then(role => {
       let canales = message.guild.channels;
       let rol = message.guild.roles.get(role.id);

       canales.forEach(k => k.editPermission(rol.id, 1024, 2048, "role"));
        message.channel.createMessage("El rol **Silenciado** no fue encontrado. El rol se creó automáticamente por " +client.user.username +" y los canales fueron configurados.").then(m => setTimeout(() => m.delete(), 6000))
        message.guild.members.get(user.id).addRole(role.id).catch(console.error);
      })  
    }
  if (role) message.guild.members.get(user.id).addRole(role.id).catch(console.error);
        const embed = new Eris.Embed()
            .title(":mute: Usuario silenciado")
            .description(`El usuario **${user.tag}** ha sido silenciado.\n\`ID: ${user.id}\``);
        if (!razon) embed.field("Razón:", `Sin razón.`);
        else embed.field("Razón:", `${razon}`);
            embed.field("Admin/mod responsable:",`${message.author.tag}`);
            embed.timestamp();
            embed.color(0xffb400);

        if (!message.guild.channels.get(o)) message.channel.createMessage({ embed }) 
        else message.guild.channels.get(o).createMessage({ embed });
  }
exports.config = {
  command: "mute",
  category: "Comandos ADMIN/MOD",
  permissions: "Administrar Mensajes.",
  description: "Silencia al usuario mencionado. La razón del silencio es opcional. Puedes escribir 'create' para crear el rol y configurar los canales sin tener que silenciar a alguien.",
  usage: "{prefix}mute <@usuario> [razón] | {prefix}mute create",
  example: "{prefix}mute @MathError#6880 | {prefix}mute @MathError#6880 Usuario molesto. | {prefix}mute create\n\n1. *{prefix}mute @usuario*: Este silenciará al usuario mencionado, sin razón.\n2. *{prefix}mute @usuario razón*: Este silenciará al usuario mencionado, incluyendo la razón especificada.\n3. *{prefix}mute create*: Este creará el rol **Silenciado** y configurará los canales.",  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
