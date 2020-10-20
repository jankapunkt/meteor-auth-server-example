import { Meteor } from 'meteor/meteor'
import { OAuth2Server } from 'meteor/leaonline:oauth2-server'

const { accounts, oauth } = Meteor.settings
const { routes } = Meteor.settings.public.oauth

// create a new OAuth2 server instance
const oauth2server = new OAuth2Server({
  serverOptions: oauth.server,
  model: oauth.model,
  routes: routes,
  debug: oauth.debug
})

// The following route is used by the client app to fetch the user's document
// and integrate it into it's own users collection. This happens every time
// the user is authenticated by the OAuth2 workflow. If the client app has
// already the user then the document gets updated by using this data.
// As a consequence you have to update the user's document in this app and not
// the client app.
oauth2server.authenticatedRoute().get(routes.identityUrl, function (req, res) {
  const user = Meteor.users.findOne(req.data.user.id)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  console.info('get user', user)
  const body = user
    ? JSON.stringify({
      id: user._id,
      login: user.username,
      email: user.emails && user.emails[0]?.address,
      name: `${user.firstName} ${user.lastName}`
    })
    : ''

  res.end(body)
})

Meteor.startup(() => {
  registerClients()
  createExampleUsers()
})

function registerClients () {
  Object.values(oauth.clients).forEach(entry => {
    console.log(`[OAuth2Server]: register client <${entry.title}>`)
    oauth2server.registerClient(entry)
  })
}

function createExampleUsers () {
  Object.values(accounts.fixtures).forEach(user => {
    if (Accounts.findUserByEmail(user.email)) {
      return
    }

    console.log('[Accounts]: create user', user.email)
    Accounts.createUser(user)
  })
}
