export default{
    name: "spin",
    description: "Le bot tourne",

    async execute(args, username, message, client) {
        if (args[0]?.toLowerCase() === 'stop') {
            clearInterval(client.bot.spin);
            return;
        } 
        if (client.bot.spin) {
            clearInterval(client.bot.spin);
        }
        let deg = 0;
        client.bot.spin = setInterval(async () => {
            await client.bot.look(deg * (Math.PI / 180), 0, false);
            deg += 1;
            deg %= 361;
        }, args[0]);
    }
}