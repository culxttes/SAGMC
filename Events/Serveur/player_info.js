export default{
    name: "player_info",
    once: false,
    hideEvent: true,

    async execute(packet, packetMeta, client) {
        if (packet.action == 0) {
            const uuid = packet.data[0].UUID;
            const name = packet.data[0].name;
            client.db.query("CALL CN(?, ?);", [uuid, name], (err, results, fields) => console.log(err));
            client.db.query("INSERT U_ACTIVITY (UUID, ISJOIN) VALUES (?, ?);", [uuid, 1], (err, results, fields) => console.log(err))
        } else if (packet.action == 4) {
            const uuid = packet.data[0].UUID;
            client.db.query("INSERT U_ACTIVITY (UUID, ISJOIN) VALUES (?, ?);", [uuid, 0], (err, results, fields) => console.log(err))
        }
    }

}