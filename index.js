/*
 * Slack-on-Slack Movie Info Coding Take-home Assignment
 * Please refer to README.md for screenshots and installation instructions

 * index.js initiates and starts the app and listens for actions, events and views
 * appHome.js builds Home Page when user opens the app
 * openModal.js builds a modal to select a Movie from Dropdown
 * sendMovieDetails.js gets Movie Details from API and send to User

 * This code is written in Bolt

 */

require("dotenv").config();
const axios = require("axios").default;
const { App } = require("@slack/bolt");
const appHome = require("./appHome");
const getMovieList = require("./getMovieList");
const sendMovieDetails = require("./sendMovieDetails");
const openModal = require("./openModal");
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// Initializes your Bolt app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("app_home_opened", async ({ event, context, payload }) => {
  // Display App Home
  const homeView = await appHome.createHome(event.user);

  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: homeView,
    });
  } catch (e) {
    app.error(e);
  }
});

// Receive button actions from App Home UI "Select a Movie!"
app.action("select_movie", async ({ body, context, ack }) => {
  ack();

  // Open a modal window with forms to be submitted by a user
  const view = openModal.openModal();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: view,
    });
  } catch (e) {
    console.log(e);
    app.error(e);
  }
});

app.options({ action_id: "movie_name" }, async ({ options, ack, body }) => {
  queryText = body.value;
  let movieList = await getMovieList.getMovieList(queryText);
  ack({
    options: movieList,
  });
});

app.action("movie_name", ({ ack }) => {
  ack();
});

// Receive view_submissions for Movie Select
app.view("movie_select_modal_view", async ({ ack, body, context, view }) => {
  ack();
  const data = {
    movieId: view.state.values.movie.movie_name.selected_option.value,
    user_id: body.user.id,
  };
  const MovieDetails = await sendMovieDetails.sendMovieDetails(data);
  const homeView = await appHome.createHome(body.user.id);

  try {
    const result = await app.client.apiCall("views.publish", {
      token: context.botToken,
      user_id: body.user.id,
      view: homeView,
    });
  } catch (e) {
    console.log(e);
    app.error(e);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

module.exports = { app };
