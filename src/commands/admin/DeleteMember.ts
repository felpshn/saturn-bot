import { Message, MessageEmbed } from 'discord.js';
import { Bot } from '../..';

import { handleMemberDeletion } from '../../services/DeleteMemberService';

async function run (bot: Bot, msg: Message, args: string[]) {
  const targetMember = msg.mentions.members?.first();
  if (!targetMember) return msg.reply('You need to tag someone!');

  const embed = new MessageEmbed();
  embed
    .setAuthor(`SATURN Database Manager`, bot.user?.avatarURL()!)
    .setDescription(`**» ${targetMember} REGISTRY HAS BEEN DELETED.**\n*Database was updated at ${msg.createdAt}.*`)
    .setTimestamp(new Date())
    .setFooter('MongoDB', 'https://pbs.twimg.com/profile_images/1234528105819189248/b6F1hk_6_400x400.jpg')
    .setColor('#6E76E5');

  try {
    await handleMemberDeletion(msg.author, targetMember)
      .then(() => msg.channel.send({ embed }));
  } catch (err) {
    console.error(err);
    msg.reply('Member is not registered in database!');
  }
}

export default {
  name: '.del',
  help: 'Deletes a member from database',
  permissionLvl: 1,
  run
};
