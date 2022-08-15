export default{
    name: "twerk",
    description: "Force the client.bot to do a twerk",

    async execute(args, username, message, client) {
        if (!client.bot.twerk && args[0] == "stop") return;
        if (args[0] == "stop"){
            clearInterval(client.bot.twerk);
            return;
        }

        const spam = async () => {
            client.bot.setControlState('sneak', true)
            await new Promise(resolve => setTimeout(resolve, args[0] * 100))
            client.bot.setControlState('sneak', false)
        };
        spam();
        client.bot.twerk = setInterval(await spam, args[0] * 200);
    }
}