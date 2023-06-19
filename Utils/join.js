import { readFileSync } from 'fs';

function display_message(client, username, msg) {
    console.log("\x1b[36m " + msg + " \x1b[0m")
    if (username) client.bot.chat(`/m ${username} ` + msg)
}

export default async (client, username, game_name) => {
    const map_game = JSON.parse(readFileSync("./Configuration/MappingGame.json"))[game_name]

    if (!map_game){
        display_message(client, username, ` --- Unknow game: "${game_name}" --- `);
        return false;
    }

    let window = client.bot.inventory;
    for (const item_info of map_game){
        const slot = window.slots.find(item => item?.nbt.value.display.value.Name.value.includes(item_info.name))?.slot;
        if (slot === undefined){
            display_message(client, username, ` --- I could not find the item: "${item_info.name}" --- `);
            if (window != client.bot.inventory) {
                window.close()
            }
            return false;
        }
        client.bot.clickWindow(slot, 0, 0).catch(err => {});
        if (item_info.openWindow){
            const window_tmp = await new Promise(resolve => {
                client.bot.once('windowOpen', (window) => setTimeout(resolve, 1000, window))
                setTimeout(resolve, 3000, undefined);
            })
            if (!window_tmp) {
                display_message(client, username, ` --- I couldn't open the window --- `);
                if (window != client.bot.inventory) {
                    window.close()
                }
                return false;
            }
            window = window_tmp
        }else {
            await new Promise(resolve => {setTimeout(resolve, 1000)});
        }
    }
    if (window != client.bot.inventory) {
        console.log(window)
        window.close()
    }
    const join = await new Promise(resolve => { 
        client.bot.once('join_mod', () => setTimeout(resolve, 1000, true));
        setTimeout(resolve, 60000, false);
    })
    if (!join) return false;
    display_message(client, username, ` --- I am connected to ${game_name}  --- `);
    return true;
}