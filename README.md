# Steps for running

### Prerequisites

Install [https://nodejs.org/en/](NodeJS LTE version)

<p>&nbsp;</p>

## Setting up Firebase

Open your Firebase Console. Select your project and go to Project settings.
<br />
Select `General` tab. Scroll below and find `databaseURL` under `SDK setup and configuration`.

![alt text](./firebase-database-url.png)

Copy the value and paste it in the `/backend/.env` file against key `FIREBASE_DATABASE_URL`. **Do not change the key.**

<p>&nbsp;</p>

Select Service accounts tab and click on the button `Generate new private key`. It will download a json file.

![alt text](./firebase-service-account.png)

<br />
Rename the downloaded file as `serviceAcccountKey.json`.
<br />
Replace `/backend/serviceAcccountKey.json` with your new `serviceAcccountKey.json`.

<p>&nbsp;</p>

## Start server

From project's root directory, **open a terminal** and run the following commands:

```
npm install
npm run start
```

It will leave you with the below information in the terminal.

Successful backend backend screenshot
<br />
![alt text](./backend-serve-success.png)

<br />

Successful frontend screenshot
<br />

![alt text](./frontend-serve-success.png)

**Do not close this terminal**

<p>&nbsp;</p>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
