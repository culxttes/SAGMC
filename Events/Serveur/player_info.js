"use strict";
import { Client } from "../../index.js";

export default{
    name: "player_info",
    once: false,
    hideEvent: true,

    /**
     * 
     * @param {*} packet 
     * @param {*} packetMeta 
     * @param {Client} client 
     */
    async execute(packet, packetMeta, client) {
        if (packet.action == 0) {
            const uuid = packet.data[0].UUID;
            const name = packet.data[0].name;
            client.db.query("CALL CN(?, ?);", [uuid, name], (err, results, fields) => console.log(err));
            client.db.query("CALL CA(?, ?);", [uuid, 1], (err, results, fields) => console.log(err))
        } else if (packet.action == 4) {
            const uuid = packet.data[0].UUID;
            client.db.query("CALL CA(?, ?);", [uuid, 0], (err, results, fields) => console.log(err))
        }
        client.bot._client.on("player_info", )
    }

}