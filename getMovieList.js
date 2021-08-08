const axios = require("axios").default;
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

//Get Movie Details from API and send to User
const getMovieList = async (data) => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${data}`;
  console.log(url);
  options = [];
  const x = await axios.get(url).then(async function (resp) {
    if (resp.status == 200) {
      let results = resp.data && resp.data.results;

      results.forEach((result) => {
        let option = {
          text: {
            type: "plain_text",
            text: result.title,
          },
          value: result.id.toString(),
        };
        options.push(option);
      });
    }
  });
  return options;
};

module.exports = { getMovieList };
