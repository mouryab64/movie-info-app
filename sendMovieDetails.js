const axios = require("axios").default;
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(
  process.env.SLACK_BOT_TOKEN,
  {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG,
  }
);

//Get Movie Details from API and send to User
const sendMovieDetails = async (data) => {
  const movieId =  data.movieId;
  const user_id = data.user_id;
  let url = `${process.env.API_HOST}/${movieId}?api_key=${process.env.API_KEY}`;
// Using Axios to Make HTTP request to Movie Database API
  axios.get(url).then(async function (resp) {
    
    // Retrieving Movie Details and storing to variables
    const movieName = resp.data.title;
    const releaseDate = resp.data.release_date;
    const imageloc =
      process.env.IMAGE_LOC_HOST + resp.data.poster_path;
    const overview = resp.data.overview;

    // Send Slack Message with Movie Details
    const result = await client.chat.postMessage({
      channel: user_id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Here's the movie info you requested!!",
          },
        },

        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${movieName}*\n\n *Release Date:* ${releaseDate} \n ${overview}`,
          },
          accessory: {
            type: "image",
            image_url: imageloc,
            alt_text: "alt text for image",
          },
        },
      ],
    });
  });
};

module.exports = { sendMovieDetails };
