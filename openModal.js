/* Open a modal to select a Movie from Dropdown */

const openModal = () => {
  const modal = {
    type: "modal",
    callback_id: "movie_select_modal_view",
    title: {
      type: "plain_text",
      text: "Movie Info",
    },
    submit: {
      type: "plain_text",
      text: "Submit",
    },
    blocks: [
      // Drop-down menu
                  {
                    type: "input",
                    block_id: "movie",
                    label: {
                      type: "plain_text",
                      text: "Select a movie:",
                    },
                    element: {
                      type: "static_select",
                      action_id: "name",
                      // Different Movie Options with value being the movie Id
                      options: [
                                  {
                                    text: {
                                      type: "plain_text",
                                      text: "Dilwale Dulhania Le Jayenge",
                                    },
                                    value: "19404",
                                  },
                                  {
                                    text: {
                                      type: "plain_text",
                                      text: "The Shawshank Redemption",
                                    },
                                    value: "278",
                                  },
                                  {
                                    text: {
                                      type: "plain_text",
                                      text: "The Godfather",
                                    },
                                    value: "238",
                                  },
                                  {
                                    text: {
                                      type: "plain_text",
                                      text: "Schindler's List",
                                    },
                                    value: "424",
                                  },
{
                                    text: {
                                      type: "plain_text",
                                      text: "The Godfather: Part II",
                                    },
                                    value: "240",
                                  },
{
                                    text: {
                                      type: "plain_text",
                                      text: "The Green Mile",
                                    },
                                    value: "497",
                                  },
{
                                    text: {
                                      type: "plain_text",
                                      text: "12 Angry Men",
                                    },
                                    value: "389",
                                  }
                                ],
                      },
                    },
                ],
              };

  return modal;
};

module.exports = { openModal };
