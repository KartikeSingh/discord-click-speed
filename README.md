# Installations
```
npm i discord-clicking-game
```

# Note
- We only Supports Discord.js V-13.x, So that we can use new features like buttons.
- You need to use Node JS V-16.x for this module.

# What ?
This is an module to create a click speed game, Not that accurate cause it takes time to get interaction, Now you might be thinking what is this so go to the bottom to see the images.

# How ?
```js
const click = require('discord-click-speed');
const game = new click();

/** Solo Mode
 * @param {Discord.Message} message The message | Command Interacion object in which command was used
 */
game.solo(message);

/** Duo mode
 * @param {Discord.Message} message The message | Command Interacion object in which command was used
 * @param {Discord.User} player2 The second player.
 */
game.duo(message,player2);

/**
  * Part Mode for clicking game. ALL human users can participate
  * @param {Discord.Message} message The Message | Command Interaction, in which command was used
  */
game.party(message) 
```

# Images
- ## Game During Getting Ready
![ready.png](https://cdn.discordapp.com/attachments/880732844220100608/884046746467053568/unknown.png)

- ## Game Started
![started.png](https://cdn.discordapp.com/attachments/880732844220100608/884046558046347324/unknown.png)

- ## Game Failed
![lost.png](https://cdn.discordapp.com/attachments/880732844220100608/884046826439868466/unknown.png)

- ## Game End
![won.png](https://cdn.discordapp.com/attachments/880732844220100608/884046320329982012/unknown.png)

# Customizations
```js
const click = require('discord-clicking-game');
const game = new click("🎈",// Emoji to use on correct button
    2000 || "random", // Time in which game starts after the ready message
    3000, // Time in which game auto ends , NOTE time should be in Milleseconds
    {
        end = "The clicking game is ended results are shown below";
        ready = "get ready for clicking festival 🎭";
        started = "Click The DANG Buttons FAST";
        fail = "You guys were too slow too click"
    }
);
```

# Supports
For support or issues or queries contace me on my [discord server](https://discord.gg/XYnMTQNTFh).