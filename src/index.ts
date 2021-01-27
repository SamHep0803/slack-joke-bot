import { App } from "@slack/bolt";

const app = new App({
	token: process.env.SLACK_TOKEN,
	appToken: process.env.APP_TOKEN,
	socketMode: true,
});

(async () => {
	await app.start(3000);

	console.log("⚡ Slack bolt app started.");
})();

app.event("app_mention", async ({ event, context, client, say }) => {
	try {
		console.log("something happened");
		await say("test boi");
	} catch (error) {
		console.error(error);
	}
});
