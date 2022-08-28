import { datestring } from "../../Utils/datestring.js";
import { statSync } from "fs";

export default{
    name: "server_restart",
    once: false,

    async execute(client) {
        let success;
        do {
            await new Promise(resolve => {setTimeout(resolve, 30000)});
            const stats = statSync("./Utils/join.js");
            success = await (await import(`../../Utils/join.js#${stats.mtimeMs}`)).default(client, null, "FREECUBEA");
        } while (!success)

        client.bot.chat("/fc tp A303600");
        console.log(`${datestring()} /fc tp A303600`);
    }
}