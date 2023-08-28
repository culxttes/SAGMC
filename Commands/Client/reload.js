export default{
    name: "reload",
    description: "Say if staff of funcraft are connected",

    async execute(args, username, message, client) {
        (await import("../../Handlers/Commands.js")).default(client);
    }
}