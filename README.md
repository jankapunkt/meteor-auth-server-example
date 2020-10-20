# Meteor Auth Server Example


[![built with Meteor](https://img.shields.io/badge/Meteor-1.11.1-green?logo=meteor&logoColor=white)](https://meteor.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a very simplified proof-of-concept project, aiming to show how to use
a Meteor app as OAuth2 authorization (and thus authentication) server.

In theory you can register multiple Meteor apps, that implement the auth service
that targets this auth server. Additionally, this is not restricted to Meteor
apps but also any other application, that is a registered client and that
implements the respective requests according to the OAuth2 `authorization_code`
workflow.

**Note,** that this project uses only one client application to keep the codebase
lean and clear.

**Also note:** the word client in terms of OAuth2 represents an application, that is
registered to the authorization server, don't confuse it with `client` as part
of the Meteor environment. 

## Installation and usage

Setup is simple and straight forward. Just follow these few steps to get your
runnig OAuth2 example. 

### Step 1: clone the repo

```bash
$ git clone git@github.com:jankapunkt/meteor-auth-server-example.git
```


After you clone this repo you will find two projects in it:

- `authserver` - the OAuth2 authorization server
- `calendar` - the client app (representing a hypothetical calendar service)

### Step 2. Install and start the `authserver`

```bash
$ cd authserver
$ meteor npm install
$ meteor npm run authserver
```

### Step 3. Install and start the `calender` client

```bash
$ cd calender
$ meteor npm install
$ meteor npm run calendar
```

### Step 4. Login and authorize

**4.1 Open the `calendar` app**

The final step is to open the `calendar` client at `localhost:5050` and click on
the login button.

A popup opens. Enable popups for localhost, in case it won't. 
The OAuth2 workflow can also be configured to not use popups (but a redirect)
but this is out of scope for now.

**4.2 Enter login credentials**

Enter the following login credentials:

- username: `johndoe@example.com`
- password: `password`

**4.3 Authorize client**

If the login is successfull (it should be) you will see a form with the 
authorization credentials. These is usually hidden but for demonstrational
purposes they are visible so you can inspect their values and get a better
understanding of the workflow.

Click the authorize button to complete the authorization. If your auth server
handles only first-party apps you can also automate this step in order to
get the impression of an "auto-login".

**4.4 Verify logged in user**

There you are, you should now see a hello-message with `johndoe@example.com`
in the calendar app.

## Resources

- [OAuth2 RFC](https://tools.ietf.org/html/rfc6749)
- [OAuth2 RFC updated](https://tools.ietf.org/html/rfc8252)
- [oauth.com (oauth explained by examples)](https://www.oauth.com/)
- [Meteor Accounts and OAuth2](https://guide.meteor.com/accounts.html#oauth)

### Used Packages

- [leaonline:oauth2-server](https://github.com/leaonline/oauth2-server)
- [leaonline:accounts-lea](https://github.com/leaonline/meteor-accounts-lea)

A sidenote here: the login service is called `Meteor.loginWithLea` which is
part of the [lea.online project](https://github.com/leaonline)
(lea = literacy education for adult).

If you want your custom OAuth2 login you may fork these packages and udate the
naming or simply create your own service configuration.

### License

MIT, see [license file](./LICENSE)
