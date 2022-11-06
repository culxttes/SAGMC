import { statSync } from "fs";
import { datestring } from "../../Utils/datestring.js";

export default{
    name: "login",
    once: false,

    async execute(client) {
        console.log("\x1b[32m", "\x1b[4m", `${client.bot.username} is connected to ${client.config.host} in ${client.bot.version}`, "\x1b[0m");
        for (const regexobj of client.config.regex){
            client.bot.chatAddPattern(new RegExp(regexobj.regex), regexobj.name, regexobj.host);
        }

        await new Promise(resolve => { client.bot.once('message', () => {resolve()})})
        client.bot.anti_afk = setInterval(async () => {
            client.bot.setControlState('forward', true);
            await new Promise(r => setTimeout(r, 1000));
            client.bot.setControlState('forward', false);
            client.bot.setControlState('back', true);
            await new Promise(r => setTimeout(r, 1000));
            client.bot.setControlState('back', false);
        }, 90000)

        console.log(" --- TRYING CONNECT ON FREECUBE --- ");
        let success;
        do {
            await new Promise(resolve => {setTimeout(resolve, 10000)});
            const stats = statSync("./Utils/join.js");
            success = await (await import(`../../Utils/join.js#${stats.mtimeMs}`)).default(client, null, "FREECUBEA");
        } while (!success)
        client.bot.chat("/fc tp A303600");
        console.log(`${datestring()} /fc tp A303600`)
    }
}