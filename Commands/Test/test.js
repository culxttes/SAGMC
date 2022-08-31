import { Client } from '../../index.js'

export default{
    name: "test",
    description: "test",

    /**
    * @param {Client} client
    */
    async execute(args, username, message, client) {
        if (args[0] == "stop"){
            client.bot._client.removeListener("player_info", client.testcmd);
            return;
        }
        client.testcmd = (packet) => {
            console.log(packet)
        }
        client.bot._client.once('player_info', client.testcmd)
    }
}