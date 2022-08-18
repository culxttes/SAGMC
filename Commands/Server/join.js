import { statSync } from "fs";
import { datestring } from "../../Utils/datestring.js";

export default{
    name: "join",
    description: "Join a mod",

    async execute(args, username, message, client) {
        client.bot.chat("/hub")
        console.log(`${datestring()} /hub`)

        const game_name = (args[0] || "freecubeA").toUpperCase()
        const stats = statSync("./Utils/join.js");
        (await import(`../../Utils/join.js#${stats.mtimeMs}`)).default(client, username, game_name)
    }
}