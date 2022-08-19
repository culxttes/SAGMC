import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { datestring } from "../../Utils/datestring.js";

export default{
    name: "staff",
    description: "Say if staff of funcraft are connected",

    async execute(args, username, message, client) {
        const getStaff = async () => {
            const response = await fetch('https://www.funcraft.net/fr/joueurs');
            const body = await response.text();

            const dom = new JSDOM(body);
            const document = dom.window.document;

            let staff = [];
            let elements = document.querySelectorAll('div.mccolor-RED-border');
            elements.forEach(element => {
                let grade = element.querySelector("span.mccolor-RED").textContent
                let elements2 = element.parentNode.querySelector("div.players-heads").querySelectorAll('div.head');
                elements2.forEach(element2 => {
                    const link = element2.querySelector("a").getAttribute("href")
                    staff.push([element2.getAttribute("title"), grade, link]);
                });  
            });
            return staff;
        }
        let Staff_co = [];
        (async () => {
        const staff = await getStaff();
        for(let player of staff){
            console.log(`${datestring()} /g lead ${player[0]}`);
            client.bot.chat(`/g lead ${player[0]}`);
            async function fn() { return new Promise(function(resolve, reject) { client.bot.once('message_error', (message) => { resolve(message);});});}
            let message = await fn()
            if (message.toString() == "Erreur: Vous n'êtes dans aucun groupe."){
                const response = await fetch(player[2]);
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
                    let return_m = "";
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
                player[2] = convertMsToTime(Date.now() - date)
                Staff_co.push(player);
            }
            await new Promise(resolve => setTimeout(resolve, 900));
        }
        return staff.length
        })().then(async (i) => {
            if (Staff_co.length == 0){
                console.log(`\x1b[31m` , datestring() + ` Il n'y a aucun staff Connecter`, `\x1b[0m`);
            }else {
                console.log(`\x1b[31m` , datestring() + ` ${Staff_co.length} Staff Connecter sur ${i}`, `\x1b[0m`);
                client.bot.chat(`/m ${username} ${Staff_co.length} Staff Connecter sur ${i}`);
                await new Promise(resolve => setTimeout(resolve, 900));
                for (let staffco of Staff_co){
                console.log(`\x1b[31m` , datestring() + ` Le ${staffco[1]} ${staffco[0]} est connecté depuis ${staffco[2]}`, `\x1b[0m`);
                client.bot.chat(`/m ${username} Le ${staffco[1]} ${staffco[0]} est connecté depuis ${staffco[2]}`)
                await new Promise(resolve => setTimeout(resolve, 1200));
                }
            }
        });   
    }
}