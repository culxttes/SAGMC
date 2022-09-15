import { readFileSync } from 'fs'
import { Client } from '../../index.js'
import fetch from "node-fetch";

export default{
    name: "test2",
    description: "test2",

    /**
    * @param {Client} client
    */
    async execute(args, username, message, client) {
        if (!args[0]) return
        const file = await readFileSync("./Data/Players/name.json")
        const DB = Object.entries(JSON.parse(file))
        const players = DB.filter(([key, element]) => element[args[0]] != undefined)

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

        players.sort((a, b) => a[1] - b[1])

        for (const player of players){
            try {
                const res = await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${player[0].replaceAll("-","")}`)).json()
                console.log(`Name Mojang API: ${res.pop().name}`)
            }catch(err){
                console.log("This player is crack")
            }
            console.log(`UUID: ${player[0]}`)
            for (const name of Object.entries(player[1])){
                console.log(`${name[0]} ${convertMsToTime(Date.now() - name[1])}`)
            }
        }
    }
}