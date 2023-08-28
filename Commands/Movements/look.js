export default{
    name: "look",
    description: "Bot look you",

    async execute(args, username, message, client) {
        let target = client.bot.players["Culottes"]?.entity
        if (!target) {
          bot.chat("/r I don't see you")
          return
        }
        client.bot.lookAt(target.position.offset(0, target.height, 0))
    }
}