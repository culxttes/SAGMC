import { format } from 'util'

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

export function getChatEvents(jsonMsg) {
    // Setup
    let clickEvents = [];
    let hoverEvents = [];

    // Check for click events
    if (jsonMsg["clickEvent"]) {
        let cEvent = jsonMsg["clickEvent"];

        // Known actions
        if (["run_command", "suggest_command", "open_url"].includes(cEvent["action"])) {
            if (!clickEvents.includes(cEvent["value"])) {
                clickEvents.push(cEvent["value"]);
            }
        }
        // If its a new action (yay!)
        else {
            console.log(` | NEW CLICK EVENT: ${cEvent["action"]}|`);
        }
    }

    // Check for hover events
    if (jsonMsg["hoverEvent"]) {
        let hEvent = jsonMsg["hoverEvent"];

        // Known actions
        if (hEvent["action"] === "show_text") {
            hEvent["value"].forEach(e => {
                if (e["text"]){
                    hoverEvents.push(e["text"].replace(/§[a-z0-9]/g, ""))
                } else {
                    hoverEvents.push(e.replace(/§[a-z0-9]/g, ""))
                }
            })
        }
        // If its a new action (yay!)
        else {
            console.log(` | NEW HOVER EVENT: ${hEvent["action"]}|`);
        }
    }

    // If there are nested segments
    if (jsonMsg["extra"]) {

        // Check them all
        jsonMsg["extra"].forEach(subMsg => {

            // Check for click events
            if (subMsg["clickEvent"]) {
                let cEvent = subMsg["clickEvent"];

                // Known actions
                if (["run_command", "suggest_command", "open_url"].includes(cEvent["action"])) {
                    if (!clickEvents.includes(cEvent["value"])) {
                        clickEvents.push(cEvent["value"]);
                    }
                }
                // If its a new action (yay!)
                else {
                    console.log(` | NEW CLICK EVENT: ${cEvent["action"]}|`);
                }
            }

            // Check for hover events
            if (subMsg["hoverEvent"]) {
                let hEvent = subMsg["hoverEvent"];

                // Known actions
                if (hEvent["action"] === "show_text") {
                    if (typeof hEvent["value"] === "object") {
                        if (isIterable(hEvent["value"])) {
                            hEvent["value"].forEach(value => {
                                if (!value["text"]) {
                                    hoverEvents.push(value.replace(/§[a-z0-9]/g, ""));
                                } else {
                                    hoverEvents.push(value["text"].replace(/§[a-z0-9]/g, ""));
                                }
                            })
                        } else {
                            hoverEvents.push(hEvent["value"]["text"].replace(/§[a-z0-9]/g, ""));
                        }
                    } else {
                        hoverEvents.push(hEvent["value"].replace(/§[a-z0-9]/g, ""));
                    }
                }
                // If its a new action (yay!)
                else {
                    console.log(` | NEW HOVER EVENT: ${hEvent["action"]}|`);
                }
            }
        });
    }

    clickEvents = [...new Set(clickEvents)];
    hoverEvents = [...new Set(hoverEvents)];

    return [clickEvents, hoverEvents];
}