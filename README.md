# UI-QMako UI

Web UI to Som Energia UI-QMako API.

UI-QMako allows for a user friendly editing of Mako Templates.

## Getting Started

First, run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `App.js`. The page auto-updates as you edit the file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### How to deploy

Create a `deploy-xxx.conf` file (where xxx is your deployment enviroment name) with the following enviornment vars:

```bash
DEPLOYMENT_HOST=myhost.mydomain.coop
DEPLOYMENT_PORT=22 # SSH port
DEPLOYMENT_USER=myuser
DEPLOYMENT_PATH=/home/myuser/uiqmako-ui
BUILD_ENVIRONMENT= # empty for prodution, pre for preproduction
```

Then run:

```
./scripts/deploy.sh xxx
```

### Deploy in pre-production

This is specific for Som Energia deployment

- Deployment configurations are available at the private repository git@gitlab.somenergia.coop:IT/deployment-configurations.git
- Checkout deployment-configurations repository at the same level than this repository
- `cd uiqmako-ui`
- `ln -s ../deployment-configurations/uiqmako-ui/deploy-pre.conf`
- `scripts/deploy.sh pre`



