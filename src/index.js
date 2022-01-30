import { Client } from "discord.js";

import { CHECK_IN_CHANNEL_ID, CHECK_IN_USER_ID, QUESTIONS } from "./common/constants.js";
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

client.login(keys.DISCORD_TOKEN);

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
  if (shouldSendCheckin()) {
    console.log("Sending check-in message.");
    channel.send(`<@${CHECK_IN_USER_ID}>, ${getRandomQuestion()}`);
  }
};

const shouldSendCheckin = () => {
  const now = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago'
    })
  );

  const hours = now.getHours();
  const day = now.getDay();

  console.log(`Current hour: ${hours}; Current day: ${day}`);
  return 8 <= hours && hours <= 16 && 1 <= day && day <= 5;
}

const getRandomQuestion = () => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
