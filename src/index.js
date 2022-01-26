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
  console.log("Working with channel:", channel);

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
  const now = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    })
  );

  const currentHour = now.getHours();
  const currentDay = now.getDay();

  console.log(`Current hour: ${currentHour}`);

  if (8 <= currentHour && currentHour <= 16 && currentDay <= 5) {
    console.log("Sending check-in message.");
    channel.send(`<@${CHECK_IN_USER_ID}>, ${getRandomQuestion()}`);
  }
};

const getRandomQuestion = () => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
