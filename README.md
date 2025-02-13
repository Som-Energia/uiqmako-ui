# UI-QMako UI

Web UI to Som Energia UI-QMako API.

UI-QMako allows for a user friendly editing of Mako Templates.

## Setup project

To setup the project, we should follow the next steps:

```bash
# Clone the repo
git clone git@github.com:Som-Energia/uiqmako-ui.git

# Go to the repo
cd uiqmako-ui

# Set the configuration to .env file
cp .env.example .env
vim .env

# Install npm packages. Warning! Need to use the 16.3 node version to be compatible with React v17.
npm install

# Run the postinstall script
npm run postinstall

# And that's it! Now we can can see everything ✨
npm start
```

## Getting Started

Before running the server for the first time you should run the [npm postinstall script](#npm-postinstall) to set up TinyMCE editor.

Then, run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `App.js`. The page auto-updates as you edit the file.

## Available Scripts

In the project directory, you can run:

### `npm run postinstall`

To set up TinyMCE editor you should run this script after the installation.

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
REACT_APP_API_BASE_URL=https://uiqmako.mydomain.coop/api
```

Then run:

```
./scripts/deploy.sh xxx
```

### Som Energia specific deployment

Som Energia specific deployment configuration files
are maintained in the private repository
`git@gitlab.somenergia.coop:IT/deployment-configurations.git`
within the `uiqmako-ui` directory.

The recommended setup is to checkout that repository
and softlink (not copy) each configuration you use
into the root of this repository.
This way you will get configurations updates from your peers
via git updates.

```bash
# from the directory containing this repository
git clone git@gitlab.somenergia.coop:IT/deployment-configurations.git
cd uiqmako-ui
# to deploy into preproduction enviroment
ln -s ../deployment-configurations/uiqmako-ui/deploy-pre.conf
scripts/deploy.sh pre
```


