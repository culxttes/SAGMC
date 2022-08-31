export default{
    name: "test",
    description: "test",

    async execute(args, username, message, client) {
        for (player of client.bot.players){
            console.log(player.name)
            console.log(player.displayName)
        }
    }
}