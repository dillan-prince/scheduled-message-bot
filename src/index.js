import { Client } from "discord.js";

import { CHECK_IN_CHANNEL_ID } from "./common/constants.js";
import { Keys } from "./config/index.js";

const keys = await Keys();

process.on("unhandledRejection", (error) => {
  return console.error("Uncaught Promise Rejection:", error.toString());
});

const client = new Client();

client.on("ready", () => {
  console.log("<----- SMBot listening. ----->");

  const msUntilThirtyAfter = getMsUntilThirtyAfter();
  const channel = client.channels.cache.get(CHECK_IN_CHANNEL_ID);

  console.log(`Waiting ${msUntilThirtyAfter}ms before sending check-in.`);
  setTimeout(() => {
    sendCheckIn(channel);
    setInterval(() => sendCheckIn(channel), 1000 * 60 * 60);
  }, msUntilThirtyAfter);
});

const getMsUntilThirtyAfter = () => {
  const currentDate = new Date();
  const nextThirty = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getMinutes() >= 30 ? currentDate.getHours() + 1 : currentDate.getHours(),
    30,
    0,
    0
  );

  return nextThirty - currentDate;
};

const sendCheckIn = (channel) => {
  const currentHour = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    })
  ).getHours();

  console.log(`Current hour: ${currentHour}`);

  if (8 <= currentHour && currentHour <= 16) {
    console.log("Sending check-in message.");
    channel.send("<@229105932993429504> how are you?");
  }
};

client.login(keys.DISCORD_TOKEN);
