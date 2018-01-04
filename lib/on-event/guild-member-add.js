module.exports = Kirbi => {
	Kirbi.Discord.on('guildMemberAdd', member => {
		const guild = member.guild;

		if (Kirbi.Config.discord.welcomeMessages && Kirbi.Config.discord.welcomeMessages[guild.id]) {
			const message = Kirbi.Config.discord.welcomeMessages[guild.id].replace('{guild}', guild.name).replace('{user}', member.displayName);

			member.send(message);
		}
	});
};
