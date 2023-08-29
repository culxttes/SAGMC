"use strict";
import { Client } from '../../index.js'

export default{
    name: "stats",
    description: "Stats of database",

    /**
     * 
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        const [rows, fields] = await client.db.execute("SELECT COUNT(UUID) AS T_USER, COUNT(DISTINCT UUID) AS D_USER FROM U_NAME;");
        const [rows2, fields2] = await client.db.execute("SELECT COUNT(UUID) AS T_ACT, MIN(A_WHEN) AS SINCE FROM U_ACTIVITY;");
        const since = new Date(rows2[0].SINCE)
        client.bot.chat(`/r There are ${rows[0].D_USER}/${rows[0].T_USER} users and ${rows2[0].T_ACT} activities in total since ${since.toLocaleString('en-GB', { timeZone: 'UTC' })}`)
    }
}