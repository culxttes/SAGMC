import join from "../../Utils/join.js"

export default{
    name: "login",
    once: false,

    async execute(client) {
        console.log("\x1b[32m", "\x1b[4m", `${client.bot.username} is connected to ${client.config.host} in ${client.bot.version}`, "\x1b[0m");
        for (const regexobj of client.config.regex){
            client.bot.chatAddPattern(new RegExp(regexobj.regex), regexobj.name, regexobj.host);
        }

        await new Promise(resolve => { client.bot.once('message', () => {resolve()})})
        client.bot.anti_afk = setInterval( () => {
            client.bot.setControlState('forward', true);
            console.log(" --- ANTI AFK (forward) --- ");
            setTimeout( () => {
                client.bot.setControlState('forward', false);
                console.log(" --- ANTI AFK (back) --- ");
                client.bot.setControlState('back', true);
                setTimeout( () => {
                    client.bot.setControlState('back', false);
                }, 1000);
            }, 1000);
        }, 180000);

        console.log(" --- TRYING CONNECT ON FREECUBE --- ");
        join(client, null, "FREECUBEA")
        //client.bot.clickWindow(36, 0, 0).catch(err => {});
        //await new Promise(resolve => { client.bot.once('windowOpen', resolve);})
        //await new Promise(resolve => setTimeout(resolve, 1000));
        //client.bot.clickWindow(4, 0, 0).catch(err => {});
        //await new Promise(resolve => { client.bot.once('windowOpen', resolve);})
        //await new Promise(resolve => setTimeout(resolve, 1000));
        //client.bot.clickWindow(11, 0, 0).catch(err => {});
        //await new Promise(resolve => { client.bot.once('join_mod', resolve);})
        //await new Promise(resolve => setTimeout(resolve, 1000));
        //client.bot.chat("/fc tp A303600");
        //console.log(`${datestring()} /fc tp A303600`)
    }
}