const chalk = require('chalk');

const guildWelcomeMessagesSchema = require('../../classes/guild-welcome-messages-schema');

module.exports = Kirbi => {
	const guildWelcomeMessagesSet = Kirbi.Database.model('GuildWelcomeMessagesSchema', guildWelcomeMessagesSchema);

	Kirbi.Discord.on('ready', () => {
		if (!Kirbi.Config.discord.roles) {
			Kirbi.Config.discord.roles = [];
		}

		guildWelcomeMessagesSet.find((err, guildSettings) => {
			if (err) {
				console.log(chalk.red(`Error: ${err}`));
				return false;
			}

			guildSettings.forEach(settings => {
				const guild = Kirbi.Discord.guilds.find('id', settings.guildId);

				if (guild) {
					Kirbi.Config.discord.welcomeMessages[settings.guildId] = settings.welcomeMessage;
				}
			});

			return true;
		});
	});
};
