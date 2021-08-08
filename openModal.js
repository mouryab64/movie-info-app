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
      {
        type: "section",
        block_id: "movie",
        text: {
          type: "plain_text",
          text: "Select a movie:",
        },
        accessory: {
          action_id: "movie_name",
          type: "external_select",
          placeholder: {
            type: "plain_text",
            text: "Type movie name",
          },
          min_query_length: 3,
        },
      },
    ],
  };

  return modal;
};

module.exports = { openModal };
