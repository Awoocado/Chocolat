const config = require("./config.json");
const Eris = require("eris-additions")(require("eris"));
const fs = require("fs"),
  path = require("path"),
  fetch = require("node-fetch");

const bot = new Eris(config.token, {
  compress: false,
  disableEvents: [],
  allowedMentions: { roles: false, everyone: false, users: true },
  guildSubscriptions: true,
  largeThreshold: 50,
  messageLimit: 10,
  defaultImageFormat: 'png',
  defaultImageSize: 1024,
  intents: 14087,
});


bot.events = new Eris.Collection();
bot.commands = new Eris.Collection();
bot.aliases = new Eris.Collection();

const getAllFiles = (d, a = []) => {
  fs.readdirSync(d).forEach(f => (fs.statSync(`${d}/${f}`).isDirectory() ? (a = getAllFiles(`${d}/${f}`, a)) : a.push(path.join(__dirname, d, "/", f))));
  return a;
};

getAllFiles("./commands").forEach(async c => {
  const p = require(c);
  bot.commands.set(p.config.command, p);
  if (p.config.aliases) if (p.config.aliases[0]) p.config.aliases.forEach(a => bot.aliases.set(a, p.config.command));
});

getAllFiles("./events").forEach(e => {
  let n = path.basename(e, ".js");
  let run = require(e).run.bind(null, bot);
  bot.events.set(n, run);
  bot.on(n, run);
});

fetch(`https://discordapp.com/api/v7/gateway/bot`, {
  method: "GET",
  headers: { Authorization: `Bot ${config.token}` },
})
  .then(res => {
    if (res.ok) return res.json();
    throw res;
  })
  .then(console.log);

client.connect();
