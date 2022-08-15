"use strict";

import { Events } from "../Validation/EventNames.js";
import { promisify } from "util";
import pkg from 'glob';
const { glob } = pkg;
const PG = promisify(glob);
import Ascii from "ascii-table";

// @param {Client} client
export default async (client) => {
    const Table = new Ascii("Events Load");
    
    for(let file of (await PG(`./Events/**/*.js`))){ 
        const event = (await import(`.${file}`)).default;
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
            await Table.addRow(command.name, "[❗️] Erreur", "Missing execute");
            continue;
        } 

        if(event.once) {
            client.bot.once(event.name, (...args) => event.execute(...args, client));
        } else { 
            client.bot.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "[✔️] Success");
    }
    console.log(Table.toString());
}