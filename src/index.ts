import { App } from "@slack/bolt";
import axios from "axios";

interface Joke {
	id: number;
	type: string;
	setup: string;
	punchline: string;
}

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
		axios
			.get("https://official-joke-api.appspot.com/jokes/general/random")
			.then(async (res) => {
				const joke: Joke = res.data[0];

				await say(`${joke.setup}... ${joke.punchline}`);
			})
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
	}
});
