import { Client } from '../../index.js'


export default{
    name: "end",
    once: false,

    async execute(reason, client) {
        console.log("END: ", reason)
        await new Promise(resolve => setTimeout(resolve, 10000));
        client.bot.removeAllListeners()
        client.rl.close()
        clearInterval(client.bot?.anti_afk);
        new Client().execute();
    }
}