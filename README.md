# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

After cloning this repo, populate a `.env` file in the project directory to configure a local deployment.  The format should be like:
```
# local server port
PORT=5500

# secret variable for our JWT secret
JWT_SECRET="juicy"

# secret variable for admin-level access.
ADMIN_KEY="21"

# Lightning node connectivity (Alice node of Polar cluster).
LND_NODE_HOST="127.0.0.1:10001"
LND_NODE_TLS_CERT="/home/TMan253/.polar/networks/1/volumes/lnd/alice/tls.cert"
LND_NODE_MACAROON="/home/TMan253/.polar/networks/1/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon"

# Database configs
DATABASE_URL="development"
NODE_ENV="development"
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs dependencies locally.

### `npm [run] start`

Runs the app in the development mode.\
Use Postman/Noctournal to hit [http://localhost:5500](http://localhost:5500) to exercise the API.

### `node dos.js`
Tests DDoS prevention.
>  Note:  after rate-limiting, reboot the server to avoid 15-minute IP ban.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
