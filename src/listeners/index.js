import { COMMAND_PREFIX } from "../common/constants.js";
let running = false;

export const onMessage = message => {
  if (running || !message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
    return;
  }

  const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);

  const command = args.shift().toLowerCase();

  if (command !== "start") {
    return;
  }

  running = true;

  setInterval(() => {
    const currentHour = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Chicago",
      })
    ).getHours();

    console.log(`hours: ${currentHour}`);

    if (8 <= currentHour && currentHour <= 16) {
      console.log("Sending check-in message.");
      message.channel.send("<@229105932993429504> how are you?");
    }
  }, 1000 * 60 * 60);
};
