import { readFileSync } from 'fs';
import { Window } from 'mineflayer';

export default async (client, username, game_name) => {
    const map_game = JSON.parse(readFileSync("./Configuration/MappingGame.json"))[game_name]

    if (!map_game){
        console.log(`\x1b[36m --- Unknow game: "${game_name}" --- \x1b[0m`)
        if (username) client.bot.chat(`/m ${username} Unknow game: "${game_name}"`)
        return;
    }

    await new Promise(resolve => { client.bot.once('message', () => {resolve()})})

    let window = client.bot.inventory
    let error = false
    for (const item_info of map_game){
        console.log(`\x1b[36m --- Search for the item: "${item_info.name}" --- \x1b[0m`)
        const slot = window.slots.find(item => item?.nbt.value.display.value.Name.value.includes(item_info.name))?.slot
        if (slot === undefined){
            console.log(`\x1b[36m --- I could not find the item: "${item_info.name}" --- \x1b[0m`)
            if (username) client.bot.chat(`/m ${username} I could not find the item: "${item_info.name}"`)
            error = true
            break;
        }
        client.bot.clickWindow(slot, 0, 0).catch(err => {});
        if (item_info.openWindow){
            window = await new Promise(resolve => {
                client.bot.once('windowOpen', (window) => {
                    setTimeout(() => {
                        resolve(window)
                    }, 1000)
                })
                setTimeout(resolve, 3000)
            })
            if (!window) {
                console.log("\x1b[36m --- I couldn't open the window --- \x1b[0m")
                if (username) client.bot.chat(`/m ${username} I couldn't open the window`)
                error = true
                break;
            }
        }else if (map_game.indexOf(item_info) !== (map_game.length - 1)){
            await new Promise(resolve => {setTimeout(resolve, 1000)})
        }
    }
    if (window != client.bot.window){
        window.close();
    }
    if (!error){
        await new Promise(resolve => { client.bot.once('join_mod', () => {
            setTimeout(resolve, 1000)
        });})
        await console.log(`\x1b[36m --- I am connected to ${game_name}  --- \x1b[0m`)
        if (username) await client.bot.chat(`/m ${username} I am connected to ${game_name}`)
    }
    return !error;
}