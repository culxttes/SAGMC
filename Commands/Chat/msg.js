export default{
    name: "msg",
    description: "Basic command, to send a message in chat",

    async execute(args, username, message, client) {
        client.bot.chat(args.join(" "));
    }
}