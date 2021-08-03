
const app = require('./index');

const createHome = async(user) => {
  // Intro message when user opens the app -

  let blocks = [
                         {
                           "type": "section",
                           "text": {
                             "type": "mrkdwn",
                             "text": "*Welcome to  _Movie Info!_* :tada:"
                           }
                         },

                         {
                           "type": "section",
                           "text": {
                             "type": "mrkdwn",
                             "text": "Click the button below to pick a movie"
                           }
                         },
                         {
                           "type": "actions",

                           "elements": [
                             {
                               "type": "button",
                               "action_id": "select_movie",
                               "text": {
                                 "type": "plain_text",
                                 "text": "Select a Movie!"
                               }
                             }
                           ]
                         }
                       ];




  let view = {
    type: 'home',
    callback_id: 'home_view',
    title: {
      type: 'plain_text',
      text: 'Movie Info!'
    },
    blocks: blocks
  }

  return JSON.stringify(view);
};




module.exports = { createHome };