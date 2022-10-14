import pkg from 'prismarine-chat';
import { datestring } from "../../Utils/datestring.js";

export default{
    name: "boss_bar",
    once: false,
    hideEvent: true,

    async execute(packet, packetMeta, client) {
        if (packet.action !== 0) return;
        const ChatMessage = pkg(client.bot.version);
        const title = new ChatMessage(JSON.parse(packet.title)).toString();
        if (title != "Tu es sur le lobby AFK") return;
        console.log(`\x1b[31m${datestring()} --- Tu es sur le lobby AFK ---\x1b[0m`);
        client.bot.chat("/fc tp a303600");
        await new Promise(resolve => client.bot.once("message", resolve()));
        client.bot.chat("/fc tp a303600");
    }

}