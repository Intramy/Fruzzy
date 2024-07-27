import { BotConfig } from './structures/types'; 

export const config: BotConfig = {
    slashCommands: false,
    legacyCommands: {
        enabled: false,
        prefixes: ['!!'],
        prefix2: [''],
    },
    permissions: {
        all: ['988832804794167397'],
    },
    logChannels: {
        actions: '1225888108168482836',
    },
    database: {
        enabled: false,
        type: 'mongodb',
    },

    allowedcmdsCHANNEL: ["-"],


    botstatus: {
        enabled: true,
        reason: "-",
    },

    api: true,
    activity: {
        enabled: true,
        type: 'WATCHING',
        value: 'VER 3.0',
    },
    status: 'online',
    
}
