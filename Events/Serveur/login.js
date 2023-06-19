export default{
    name: "login",
    once: false,

    async execute(client) {
        console.log("\x1b[32m", "\x1b[4m", `${client.bot.username} is connected to ${client.config.host} in ${client.bot.version}`, "\x1b[0m");
        for (const regexobj of client.config.regex){
            client.bot.chatAddPattern(new RegExp(regexobj.regex), regexobj.name, regexobj.host);
        }

        client.bot.anti_afk = setInterval(async () => {
            client.bot.setControlState('forward', true);
            console.log(" --- ANTI AFK (forward) --- ");
            await new Promise(r => setTimeout(r, 1000));
            client.bot.setControlState('forward', false);
            client.bot.setControlState('back', true);
            console.log(" --- ANTI AFK (back) --- ");
            await new Promise(r => setTimeout(r, 1000));
            client.bot.setControlState('back', false);
        }, 180000)
    }
}