const Eris = require("eris-additions")(require("eris"));
const config = require('./config.json');
const pack = require('./package.json');
const Base = require('eris-sharder').Base
const DBL = require("dblapi.js");
const dbl = new DBL(config.DBLtoken);
const fs = require('fs'),
  path = require('path')

class Class extends Base {
  constructor(bot) {
    super(bot)

    this.bot.editStatus('online', {
      name: `${config.prefix}help | v${pack.version} | ♥ ${config.prefix}donate | ${config.prefix}support`
    })
    this.bot.events = new Eris.Collection();
    this.bot.commands = new Eris.Collection();
    this.bot.aliases = new Eris.Collection();

    getAllFiles('./commands').forEach(async c => {
      const p = require(c)
      this.bot.commands.set(p.config.command, p)
      if (p.config.aliases) if (p.config.aliases[0]) p.config.aliases.forEach(a => this.bot.aliases.set(a, p.config.command))
    })

    getAllFiles('./events').forEach(e => {
      let n = path.basename(e, '.js')
      let run = require(e).run.bind(null, this.bot)
      this.bot.events.set(n, run)
      this.bot.on(n, run)
    })

    this.bot.reloadCommands = () => {
      this.bot.commands = new Eris.Collection();
      this.bot.aliases = new Eris.Collection()
    
      getAllFiles("./commands").forEach(async c => {
        delete require.cache[require.resolve(c)]
        const p = require(c);
        this.bot.commands.set(p.config.command, p);
        if (p.config.aliases) if (p.config.aliases[0]) p.config.aliases.forEach(a => this.bot.aliases.set(a, p.config.command));
      })
      return true
    }
  }

  launch() {}
}

const getAllFiles = (d, a = []) => {
  fs.readdirSync(d).forEach(f => (fs.statSync(`${d}/${f}`).isDirectory() ? (a = getAllFiles(`${d}/${f}`, a)) : a.push(path.join(__dirname, d, '/', f))))
  return a
}

module.exports = Class
