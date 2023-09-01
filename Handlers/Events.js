"use strict";
import { Client } from "../index.js";
import { Events } from "../Validation/EventNames.js";
import { glob } from 'glob';
import Ascii from "ascii-table";;

/**
 * Initializes and processes events
 * @param {Client} client
 */
export default async (client) => {
    const Table = new Ascii("Events Load");
    
    for(let file of (await glob(`./Events/**/*.js`))){ 
        const event = (await import(`../${file}`)).default;
        const L = file.split("/").slice(-2).join('/');
        if (!event){
            await Table.addRow("MANQUANT",`[⛔] Invalid Event format: "${L}"`);
            continue;
        }

        if(!Events.includes(event.name) || !event.name) {
            await Table.addRow(`${event.name || "MANQUANT"}`,`[⛔] Event name is invalid or missing: "${L}"`);
            continue;
        }

        if(!event.execute){
            await Table.addRow(event.name, "[❗️] Erreur", "Missing execute");
            continue;
        }
        if (event.hideEvent){
            if(event.once) {
                client.bot._client.once(event.name, (...args) => event.execute(...args, client));
            } else { 
                client.bot._client.on(event.name, (...args) => event.execute(...args, client));
            };
        }else {
            if(event.once) {
                client.bot.once(event.name, (...args) => event.execute(...args, client));
            } else { 
                client.bot.on(event.name, (...args) => event.execute(...args, client));
            };
        }

        await Table.addRow(event.name, "[✔️] Success");
    }
    console.log(Table.toString());
}