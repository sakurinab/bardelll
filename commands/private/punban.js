const { Client, Message } = require("discord.js")
const getChannel = require("../../functions/getChannel")
const getMemb = require("../../functions/getMember")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            let ch = getChannel(message, res.room)
            let perms = ch ? ch.permissionsFor(message.member).has("MANAGE_CHANNELS") : false
            if(!perms) return bot.panel(null, `Вы не находитесь в своей приватной комнате`, null, null, "panel", null, 15)
            let memb = getMemb(message, args[0])
            if(!memb) return bot.panel(null, "Укажите пользователя", null, null, "panel", null, 15)
            if(memb == message.member) return bot.panel(null, "Укажите пользователя", null, null, "panel", null, 15)
            if(ch.permissionsFor(memb).has("CONNECT")) return
            ch.updateOverwrite(memb, {
                CONNECT: true
            })
            bot.panel(null, `Вы успешно разблокировали ${memb.user} в своей приватной комнате`, null, null, "panel")
        }
    })
}