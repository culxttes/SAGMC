"use strict";
import { datestring } from "../../Utils/datestring.js";
import { Client } from "../../index.js"
import { getChatEvents } from "../../Utils/getChatEvents.js";
import { ChatMessage } from 'prismarine-chat';
import { Client } from "../../index.js";

export default {
    name: "message",
    once: false,
    /**
     * Emitted for every server message, including chats.
     * 
     * jsonMsg - ChatMessage object containing the formatted chat message. 
     * Might additionally have the following properties:
     *      unsigned - Unsigned ChatMessage object. Only present in 1.19.2+, 
     *      and only when the server allows insecure chat and the server 
     *      modified the chat message without the user's signature
     * position - (>= 1.8.1): position of Chat message can be
     *      chat
     *      system
     *      game_info
     * sender - UUID of sender if known (1.16+), else null
     * verified -> null if non signed, true if signed and correct, false if 
     * signed and incorrect
     * @param {Client} client
     * @param {ChatMessage} jsonMsg
     * @param {string} position
     * @param {string | null} sender
     * @param {boolean | null} verified 
     */
    async execute(jsonMsg, position, sender, verified, client) {
        if (position !== "game_info") {
            let [messageClickEvents, messageHoverEvents] = getChatEvents(jsonMsg);
            if (!messageClickEvents.length) messageClickEvents = "";
            if (!messageClickEvents.length) messageHoverEvents = "";
            console.log(datestring() + " " +jsonMsg.toAnsi(), messageClickEvents, messageHoverEvents)    
        }
    }
}