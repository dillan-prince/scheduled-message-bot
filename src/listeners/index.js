import { COMMAND_PREFIX } from '../common/constants.js';
let running = false;

export const onMessage = (message) => {
    if (
        running ||
        !message.content.startsWith(COMMAND_PREFIX) ||
        message.author.bot
    ) {
        return;
    }

    const args = message.content
        .slice(COMMAND_PREFIX.length)
        .trim()
        .split(/ +/);

    const command = args.shift().toLowerCase();

    if (command !== 'start') {
        return;
    }

    running = true;

    setInterval(() => {
        const datetime = new Date().toLocaleString('en-US', {
            timeZone: 'America/Chicago'
        });

        const [date, time] = datetime.split(',');
        const [hours, minutes, s] = time.split(':');
        const [seconds, period] = s.split(' ');

        const hoursInt = parseInt(hours);

        console.log(`hoursInt: ${hoursInt} ; period: ${period}`);

        if (
            (hoursInt >= 8 && period === 'AM') ||
            (hoursInt <= 4 && period === 'PM')
        ) {
            console.log('Sending check-in message.');
            message.channel.send('<@229105932993429504> how are you?');
        }
    }, 60000);
};
