export default{
    name: "error",
    once: false,

    async execute(err, client) {
        console.log("Error BOT: ", err)
    }
}