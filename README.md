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

This will start the auth server and register our client app (the credentials
can be found in [settings.json](./authserver/settings.json)).

If you start for the first time it will also creare a default user for you
to play around with.

The console output should then look like the following:

```bash
> authserver@ authserver /path/to/meteor-auth-server-example/authserver
> meteor --settings=settings.json --port=9090

[[[[[ ~/path/to/meteor-auth-server-example/authserver ]]]]]

=> Started proxy.                             
=> Started MongoDB.                           
I20201021-10:58:18.471(2)? [OAuth2Server]: register client <Calendar>
I20201021-10:58:18.497(2)? [Accounts]: create user johndoe@example.com
=> Started your app.

=> App running at: http://localhost:9090/
```

### Step 3. Install and start the `calender` client

Now open a new terminal tab or window and go to the `calendar` app folder and
repeat the installation for this app, too.

```bash
$ cd calendar
$ meteor npm install
$ meteor npm run calendar
```

### Step 4. Login and authorize

The following steps take place in the browser.

**4.1 Open the `calendar` app**

The final step is to open the `calendar` client at **`localhost:5050`** and 
click on the "login now" button.

A popup opens; please enable popups for localhost, in case it won't. 
The OAuth2 workflow can also be configured to not use popups (but a redirect)
but this is out of scope for now.

**4.2 Enter login credentials**

Check the address bar of the popup, you should see something like this

``` 
localhost:9090/oauth/authorize?response_type=code&client_id=porhLyvwTdhJgdda8&scope=email&display=popup&redirect_uri=http%3A%2F%2Flocalhost%3A5050%2F_oauth%2Flea&state=eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJoSTFza3ZKRFU1TTg2d2pVYk1xZDdkdm1OalAtem9QNkkyc3dSUnBDVDltIiwiaXNDb3Jkb3ZhIjpmYWxzZX0%3D
```

This is a typical OAuth2 get request to obtain the authorization code.
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
