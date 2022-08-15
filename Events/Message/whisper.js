import { statSync } from 'fs';

export default{
    name: "whisper",
    once: false,

    /**
    * @param {String} message
    */
    async execute(username, message, translate, jsonMsg, client) {
        if (!message.startsWith("!") || username != "Culottes" ) return;
        const args = message.split(" ");
        const command = args.shift().slice(1)
        const cmd = client.commands.get(command)
        if(!cmd) return;
        const stats = statSync(cmd);
        try {
            (await import(`../.${cmd}#${stats.mtimeMs}`)).default.execute(args, username, message, client);
        }catch (err){
            console.error(err);
        }
    }
}