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
        client.bot.chat(`/g lead ${player[0]}`);
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
        let date_co = await document.querySelector("#main-layout > div.container.player-banner-margin-top > div:nth-child(1) > div > div.info > div.info-base > div:nth-child(2) > span").getAttribute("title").replace(",","");
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
        date_co = date_co.split(" ");
        const heure_co = date_co[3].split("h");
        const date = new Date(date_co[2], mois[date_co[1]], date_co[0], heure_co[0], heure_co[1]);
        function padTo2Digits(num) { return num.toString().padStart(2, '0'); }
        function convertMsToTime(milliseconds) {
            let seconds = Math.floor(milliseconds / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            if (hours > 0 && minutes > 0){
                return `${padTo2Digits(hours)}h et ${padTo2Digits(minutes)}min`;
            }
            if (hours > 0){
                return `${padTo2Digits(hours)}h`;
            }
            if (minutes >= 0){
                return `${padTo2Digits(minutes)}min`;
            }
        }
        const time = convertMsToTime(Date.now() - date);
        console.log(`\x1b[31m` , datestring() + ` ${player} est connecté depuis ${time}`, `\x1b[0m`);
        client.bot.chat(`/m ${username} ${player} est connecté depuis ${time}`);
    }
}