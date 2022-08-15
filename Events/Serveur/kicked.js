export default{
    name: "kicked",
    once: false,

    async execute(reason, loggedIn, client) {
        console.log("Kicked: ", reason)
    }
}