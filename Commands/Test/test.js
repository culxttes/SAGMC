import { Client } from '../../index.js'

export default{
    name: "test",
    description: "test",

    /**
    * @param {Client} client
    */
    async execute(args, username, message, client) {
        client.bot._client.once('player_info', (packet) => {
            console.log(packet)
        })
    }
}