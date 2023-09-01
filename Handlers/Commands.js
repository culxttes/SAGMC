"use strict";
import { glob } from 'glob';
import Ascii from "ascii-table";
import { statSync } from 'fs';
import { Client } from '../index.js';

/**
 * Initializes and processes commands
 * @param {Client} client
 */
export default async (client) => {
    client.commands = new Map();
    const Table = new Ascii("Commands Load");
    for(let file of (await glob(`./Commands/**/*.js`))){ 
        const command = (await import(`../${file}`)).default;

        if(!command.name){
            Table.addRow(file.split("/").slice(-1), "[❗️] Erreur", "Missing name");
            continue;
        }

        if(!command.description){
            Table.addRow(command.name, "[❗️] Erreur", "Missing description");
            continue;
        }

        if(!command.execute){
            await Table.addRow(command.name, "[❗️] Erreur", "Missing execute");
            continue;
        } 
        
        client.commands.set(command.name, file);

        await Table.addRow(command.name, "[✔️] Success");
    }
    console.log(Table.toString());

    client.bot.removeAllListeners("whisper");

    client.bot.on("whisper", async (username, message, translate, jsonMsg, matches) => {
        if (!message.startsWith("!") || username != "Culottes" ) return;
        const args = message.split(" ");
        const command = args.shift().slice(1)
        const cmd = client.commands.get(command)
        if(!cmd) return;
        const stats = statSync(cmd);
        try {
            await (await import(`../${cmd}#${stats.mtimeMs}`)).default.execute(args, username, message, client)
        }catch(err){
            console.log(err)
        }  
    })
}
