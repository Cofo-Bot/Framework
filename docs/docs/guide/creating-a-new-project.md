# Creating a new project

- This guide will explain you how to create your first bot with cofo!

## Installation

- Cofo Framework is on the npm registry, You can install it via any package manager.
- Create the `package.json` via the initalize command:

<CodeSwitcher :languages="{ npm: 'Npm', yarn: 'Yarn', pnpm: 'Pnpm' }">
<template v-slot:npm>

```sh
npm init -y
```

</template>
<template v-slot:yarn>

```sh
yarn init -y
```

</template>
<template v-slot:pnpm>

```sh
pnpm init -y
```

</template>
</CodeSwitcher>

### Typescript

- For Typescript, Kindly install `typescript`,`@types/node` as devDependencies.

---

- Once installed all the required dependencies, Install `@cofo/framework`

<CodeSwitcher :languages="{ npm: 'Npm', yarn: 'Yarn', pnpm: 'Pnpm' }">
<template v-slot:npm>

```sh
npm i @cofo/framework
```

</template>
<template v-slot:yarn>

```sh
yarn add @cofo/framework
```

</template>
<template v-slot:pnpm>

```sh
pnpm add @cofo/framework
```

</template>
</CodeSwitcher>

## Structure

- Once you've installed the framework, create the base structure as follows:

```
.
├── my-project
│   ├── `src`
│   │   ├── `Commands`
│   │   │   ├── `General`
│   │   │       └── PingCommand.ts
│   │   ├── `Listeners`
│   │   │   ├── ReadyListener.ts
│   │   ├── index.ts
│   ├── package.json
```

- Then, Lets Start writing the code

- _src/index_

<CodeSwitcher :languages="{ js: 'Javascript', ts: 'Typescript' }">
<template v-slot:js>

```js
const { CofoClient } = require("@cofo/framework");

const client = new CofoClient(
  `Bot ${process.env.TOKEN}`,
  {
    baseDirectory: `${process.cwd()}/src/`, // Basically the directory where the commands and listeners folder shall be located (required)
    defaultPrefix: "!", // The Default Prefix to use if no custom prefix / mention prefix enabled (required)
    mentionPrefix: true, // Whether to take mention as a prefix or not (required)
    owners: [], // The Bot Owners, (required), This is required for botOwnerOnly commands.
    testMode: {
      // Whether the bot is in development mode, if enabled provide a guild id where the slash commands would be registered (not compulsory)
      enabled: true,
      guildID: "928880438641041480",
    },
  }, // Eris Options:
  {
    intents: ["guildMembers", "guildMessages", "guilds"],
    restMode: true, // Recommended
  }
);
```

</template>
<template v-slot:ts>

```ts
import { CofoClient } from "@cofo/framework";

const client = new CofoClient(
  `Bot ${process.env.TOKEN}`,
  {
    baseDirectory: `${process.cwd()}/src/`, // Basically the directory where the commands and listeners folder shall be located (required)
    defaultPrefix: "!", // The Default Prefix to use if no custom prefix / mention prefix enabled (required)
    mentionPrefix: true, // Whether to take mention as a prefix or not (required)
    owners: [], // The Bot Owners, (required), This is required for botOwnerOnly commands.
    testMode: {
      // Whether the bot is in development mode, if enabled provide a guild id where the slash commands would be registered (not compulsory)
      enabled: true,
      guildID: "928880438641041480",
    },
  }, // Eris Options:
  {
    intents: ["guildMembers", "guildMessages", "guilds"],
    restMode: true, // Recommended
  }
);
```

</template>
</CodeSwitcher>

- _src/commands/General/PingCommand.ts_

<CodeSwitcher :languages="{ js: 'Javascript', ts: 'Typescript' }">
<template v-slot:js>

```js
const { Command } = require("@cofo/framework");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mycommandname",
      description: "mycommanddescription",
    });
  }
  /**
   * Message Command
   * @param {Client} client
   * @param {Message} message
   */
  messageRun(client, message) {
    message.channel.createMessage({
      content: "Pong!",
    });
  }
  /**
   * Slash Command
   * @param {Client} client
   * @param {Interaction} interaction
   */
  interactionRun(client, interaction) {
    interaction.createMessage({
      content: "Pong!",
    });
  }
};
```

</template>
<template v-slot:ts>

```ts
import { Command, CofoClient } from "@cofo/framework";
import { Message, CommandInteraction } from "eris";

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mycommandname",
      description: "mycommanddescription",
    });
  }

  /**
   * Message Command
   * @param {Client} client
   * @param {Message} message
   */
  messageRun(client: CofoClient, message: Message) {
    message.channel.createMessage({
      content: "Pong!",
    });
  }
  /**
   * Slash Command
   * @param {Client} client
   * @param {Interaction} interaction
   */
  interactionRun(client: CofoClient, interaction: CommandInteraction) {
    interaction.createMessage({
      content: "Pong!",
    });
  }
}
```

</template>
</CodeSwitcher>


- _src/listeners/ReadyListener.ts_

<CodeSwitcher :languages="{ js: 'Javascript', ts: 'Typescript' }">
<template v-slot:js>

```js
const { Listener } = require('@cofo/framework');

module.exports = new Listener("ready", async(client) => {
  console.log(`Client has connected`)
})
```

</template>
<template v-slot:ts>

```ts
import { Listener } from '@cofo/framework';

export default new Listener("ready", async(client) => {
  console.log(`Client has connected`)
})
```

</template>
</CodeSwitcher>

## Using a custom prefix
- Cofo supports 3 types of prefix: Mention, custom and a default

- For a custom prefix we send you the message as a parameter and you need to return a string as follows:

```js
client.fetchPrefix = (message) => {
  db.getguild(message.guildID).then(data => {
    return data.prefix
  })
}
```