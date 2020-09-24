<div align="center">
  <h1>
    Linkedin Auto Connect Extension
  </h1>

  <p>
    <strong>Works for Chrome, Opera, Edge & Firefox.</strong>
  </p>
  <p>
  This plugin is higly inspired by extension-boilerplate (https://github.com/WebExp0528/React-Extension-Boilerplate.git)
  </p>
</div>

## Features

<dl>
  <dt>Built using React! :) </dt>
  <dd>
    Now you can send invitations on linkedin automatically ;)
  </dd>
</dl>

<dl>
  <dt>Write once and deploy to Chrome, Opera, Edge & Firefox</dt>
  <dd>
    Based on WebExtensions. It also includes a tiny polyfill to bring uniformity to the APIs exposed by different browsers.
  </dd>
</dl>

<dl>
  <dt>Live-reload</dt>
  <dd>
    Your changes to CSS, HTML & JS files will be relayed instantly without having to manually reload the extension. This ends up saving a lot of time and improving the developer experience. Based on https://github.com/xpl/crx-hotreload
  </dd>
</dl>

<dl>
  <dt>Newest js technology stack</dt>
  <dd>
    ES6, ES5, React, Webpack
  </dd>
</dl>

<dl>
  <dt>Clean code</dt>
  <dd>
    Clean code is the best way for long term support for project. Extension has fully configured eslint with airbnb styleguide.
  </dd>
</dl>

<dl>
  <dt>Test your components!</dt>
  <dd>
    Project use some library which support your testing proces. As test runner we use karma, as testing framework mocha. As support to assertion we use chai.
  </dd>
</dl>

## Installation

1. Clone the repository `git clone https://github.com/WebExp0528/LinkedinAutomation.git`
2. Run `npm install` or `yarn install`
3. Run `npm run build` or `yarn build`

##### Load the extension in Chrome & Opera

1. Open Chrome/Opera browser and navigate to chrome://extensions
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose to `LinkedinAutomation/dev/chrome` or (`LinkedinAutomation/dev/opera`)

##### Load the extension in Firefox

1. Open Firefox browser and navigate to about:debugging
2. Click "Load Temporary Add-on" and from the file browser, choose `LinkedinAutomation/dev/firefox`

##### Load the extension in Edge

https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/adding-and-removing-extensions

## Developing

The following tasks can be used when you want to start developing the extension and want to enable live reload -

-   `npm run watch-dev` or `yarn watch-dev`

## Packaging

Run `npm run build` or `yarn build` to create a zipped, production-ready extension for each browser. You can then upload that to the appstore.

---

This project is licensed under the MIT license.

If you have any questions or comments, please create a new issue. I'd be happy to hear your thoughts.
