# Building A Slack On Slack Movie Info App 

Published: August 1, 2021<br>
Updated: August 2, 2021


Welcome to Movie Info! Click on the button to pick a Movie


![App Home Demo -Stickies](https://i.ibb.co/Dk2GPbZ/Screen-Shot-2021-08-02-at-10-16-04-AM.png)

Select a movie from the List and Submit

![App Home Demo -Stickies](https://i.ibb.co/zh5bK8k/Select-Movie.png)

Receive a DM from the app, with the movie info you requested

![App Home Demo -Stickies](https://i.ibb.co/GJPshFX/Movie-Details.png)

##Setting up your app



Local development requires a public URL where Slack can send requests. In this guide, we'll be using [`ngrok`](https://ngrok.com/download). Checkout [this guide](https://api.slack.com/tutorials/tunneling-with-ngrok) for setting it up.

Before we get started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one setup, go ahead and [create one](https://slack.com/create). You also need to [create a new app](https://api.slack.com/apps?new_app=1) if you haven’t already.

## Install Dependencies

```
npm install

```

## Install app to workspace

In your [**App Config** Page](https://api.slack.com/apps), go to **OAuth & Permissions** and add the `chat:write` permissions. Click **install App** to install the app to your workspace and generate a bot token.

## Setup Environment Variables

This app requires you setup a few environment variables. You can get these values by navigating to your [**App Config** Page](https://api.slack.com/apps). 

```
export SLACK_BOT_TOKEN=YOUR_SLACK_CLIENT_SECRET
export SLACK_SIGNING_SECRET=YOUR_SLACK_SIGNING_SECRET
export API_KEY=YOUR_MOVIE_DATABASE_API_KEY 
```

## Run the App

Start the app with the following command:

```
npm start
```

This will start the app on port `3000`.

Now lets start `ngrok` so we can access the app on an external network and create a `redirect url` for OAuth and `request url` for Events and Interactivity. 

```
ngrok http 3000
```

This should output a forwarding address for `http` and `https`. Take note of the `https` one. It should look something like the following:

```
Forwarding   https://3cb89939.ngrok.io -> http://localhost:3000
```

Navigate to the **App Home** page in your app config and enable it. Then navigate to **Event Subscriptions** to enable it. The request URL should be set to your `ngrok` forwarding address with the `slack/events` path appended. Use the same url to enable **Interactivity and Shortcuts**. example url:

```
https://3cb89939.ngrok.io/slack/events
````

In the **Events Subscription** page, click **Subscribe to bot events** and add `app_home_opened`.  



