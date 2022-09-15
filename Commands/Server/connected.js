import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { datestring } from "../../Utils/datestring.js";

export default{
    name: "connected",
    description: "say if the player args[0] is connected",

    async execute(args, username, message, client) {
        if (!args[0]) return;
        const player = args[0];

        console.log(`${datestring()} /g lead ${player}`);
        client.bot.chat(`/g lead ${player}`);
        let msg = await new Promise(resolve => { client.bot.once('message_error', (message) => { resolve(message);});});
        if (msg.toString() != "Erreur: Vous n'êtes dans aucun groupe."){
            console.log(`\x1b[31m` , datestring() + ` ${player} n'est pas connecter`, `\x1b[0m`);
            client.bot.chat(`/m ${username} ${player} n'est pas connecter`)
            return;
        }

        const response = await fetch(`https://www.funcraft.net/fr/joueurs?q=${encodeURIComponent(player)}`);
        const body = await response.text();

        const dom = new JSDOM(body);
        const document = dom.window.document;
        let date_co = await document.querySelector("#main-layout > div.container.player-banner-margin-top > div:nth-child(1) > div > div.info > div.info-base > div:nth-child(2) > span").getAttribute("title")
            .replace(",","")
            .split(" ");
        const mois = {
            "janvier": 0,
            "février": 1,
            "mars": 2,
            "avril": 3,
            "mai": 4,
            "juin": 5,
            "juillet": 6,
            "août": 7,
            "septembre": 8,
            "octobre": 9,
            "novembre": 10,
            "décembre": 11
        };
        const heure_co = date_co[3].split("h");
        const date = new Date(date_co[2], mois[date_co[1]], date_co[0], heure_co[0], heure_co[1]);
        const  padTo2Digits = num => { return num.toString().padStart(2, '0'); }
        const convertMsToTime = milliseconds => {
            let seconds = Math.floor(milliseconds / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            minutes %= 60;
            seconds %= 60;
            hours %= 24;
            let result = "";
            if (days > 0){
                result += ` ${padTo2Digits(days)} days`;
            }
            if (hours > 0){
                result += ` ${padTo2Digits(hours)} hours`;
            }
            if (minutes > 0){
                result += ` ${padTo2Digits(minutes)} minutes`;
            }
            if (seconds > 0){
                result += ` ${padTo2Digits(seconds)} secondes`;
            }
            return result
        }
        const time = convertMsToTime(Date.now() - date);
        console.log(`\x1b[31m` , datestring() + ` ${player} is online since${time}`, `\x1b[0m`);
        client.bot.chat(`/m ${username} ${player} is online since${time}`);
    }
}