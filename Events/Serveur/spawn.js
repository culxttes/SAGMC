import pkg from 'prismarine-chat';
import { statSync } from "fs";
import { datestring } from "../../Utils/datestring.js";

function is_fc_hub(client, scoreboard) {
    const ChatMessage = pkg(client.bot.version);
    const len = scoreboard.items.length
    const value = ['', '   www.funcraft.net', 'Boutique et Forum sur', '']
    for (let i = 0; i < 4; ++i) {
        const item = new ChatMessage(scoreboard.items[len - i - 1].name).toString()
        if (item != value[i]) {
            return false;
        }
    }
    return true
}

export default{
    name: "spawn",
    once: false,

    async execute(client) {
        // mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view

        await new Promise(resolve => client.bot.once('message', resolve))
        if (!is_fc_hub(client, client.bot.scoreboard.sidebar)) {
            return;
        }
        console.log(' --- THE BOT IS IN THE SERVER HUB --- ');
        await new Promise(r => setTimeout(r, 30000));
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