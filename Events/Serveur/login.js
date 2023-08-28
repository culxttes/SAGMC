export default{
    name: 'login',
    once: false,

    async execute(client) {
        console.log('\x1b[32m', '\x1b[4m', `${client.bot.username} is connected to ${client.config.host} in ${client.bot.version}`, '\x1b[0m');
        client.bot.addChatPattern(client.config.regex.name, new RegExp(client.config.regex.regex), {deprecated: true});
    }
}