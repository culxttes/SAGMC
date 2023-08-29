"use strict";
import { Client } from '../index.js';
import { readFileSync } from 'fs';

/**
 * Writes a message containing msg to the console and as a private message if 
 * username is defined 
 * @param {Client} client
 * @param {string} username
 * @param {string} msg
 */
function display_message(client, username, msg) {
    console.log("\x1b[36m " + msg + " \x1b[0m");
    if (username) client.bot.chat(`/m ${username} ` + msg);
}

/**
 * Connects the bot in the game mode, chooses game_name and warns the player, 
 * username if defined, returns false if unsuccessful, true otherwise.
 * @async
 * @param {Client} client
 * @param {string} username
 * @param {string} game_name
 */
export default async (client, username, game_name) => {
    const map_game = JSON.parse(readFileSync("./Configuration/MappingGame.json"))[game_name];

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
                client.bot._client.write('close_window', {
                    windowId: window.id
                })
                client.bot.currentWindow = null;
            }
            return false;
        }
        if (item_info.quickBar) {
            client.bot.setQuickBarSlot(slot - window.hotbarStart)
            client.bot.activateItem()
        } else {
            await client.bot.simpleClick.rightMouse(slot).catch(err => {});
        }
        if (item_info.openWindow){
            const window_tmp = await new Promise(resolve => {
                client.bot.once('windowOpen', window => setTimeout(resolve, 1000, window));
                setTimeout(resolve, 3000, undefined);
            })
            if (!window_tmp) {
                display_message(client, username, ` --- I couldn't open the window --- `);
                if (window != client.bot.inventory) {
                    client.bot._client.write('close_window', {
                        windowId: window.id
                    })
                    client.bot.currentWindow = null;
                }
                return false;
            }
            window = window_tmp;
        } else if (map_game.indexOf(item_info) != (map_game.length - 1)) {
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    if (window != client.bot.inventory) {
        client.bot._client.write('close_window', {
            windowId: window.id
        })
        client.bot.currentWindow = null;
    }
    const join = await new Promise(resolve => { 
        client.bot.once('scoreboardCreated', () => setTimeout(resolve, 1000, true));
        setTimeout(resolve, 60000, false);
    })
    if (!join) return false;
    display_message(client, username, ` --- I am connected to ${game_name}  --- `);
    return true;
}