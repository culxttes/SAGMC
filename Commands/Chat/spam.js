import { datestring } from "../../Utils/datestring.js";

export default{
    name: "spam",
    description: "Bot spam something",

    async execute(args, username, message, client) {
        if (!client.bot.spam && args[0] == "stop") return;
        if (args[0] == "stop"){
            clearInterval(client.bot.spam);
            console.log(datestring() + " --- SPAM STOP --- ");
            return;
        }
        const delay = args.shift();
        message = args.join(" ");
        console.log(datestring() + " --- SPAM START EVERY "+ delay + " SECOND --- ");

        const spam = () => { 
            client.bot.chat(message);
        };
        spam();
        client.bot.spam = setInterval(spam, delay * 1000);
    }
}