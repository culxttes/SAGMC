import { readFileSync, writeFileSync } from "fs"

export default{
    name: "player_info",
    once: false,
    hideEvent: true,

    async execute(packet, packetMeta, client) {
        if (packet.action !== 0) return
        const file = await readFileSync("./Data/Players/name.json")
        let DB = JSON.parse(file)
        if (!DB[packet.data[0].UUID]) DB[packet.data[0].UUID] = {}
        DB[packet.data[0].UUID][packet.data[0].name] = Date.now()
        writeFileSync("./Data/Players/name.json", JSON.stringify(DB), 'utf8')
    }

}