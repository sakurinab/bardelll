const { Client, Message } = require("discord.js");
const ms = require("ms");
const cnvTime = require("../../functions/timelyTime");
const cfg = require("../../settings/config");
const razbitNumber = require("../../functions/razbitNumber");

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err;
        if(res){
            if(Date.now() < res.timely) return bot.panel(`Ещё не время, потерпи немного`, `ты часто используешь ежедневную награду\nПриходи через **${cnvTime(res.timely)}**, чтобы получить ${bot.values.crown}`);
            res.crown += cfg.timelyReward;
            res.timely = parseInt(Date.now() + ms(cfg.timelyCooldown));
            res.save();
            bot.panel(" Ежедневная награда ", `ежедневные бесплатные ${razbitNumber(cfg.timelyReward)}${bot.values.crown}\nПриходи через **12ч.**, я буду ждать`);
        }
    })
}