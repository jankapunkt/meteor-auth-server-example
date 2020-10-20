/* global ServiceConfiguration */
import { Meteor } from 'meteor/meteor'

const { oauth } = Meteor.settings
const serviceQuery = { service: 'lea' }
const serviceProjection = {
  $set: {
    loginStyle: 'popup',
    clientId: oauth.clientId,
    secret: oauth.secret,
    dialogUrl: oauth.dialogUrl,
    accessTokenUrl: oauth.accessTokenUrl,
    identityUrl: oauth.identityUrl,
    redirectUrl: oauth.redirectUrl
  }
}

ServiceConfiguration.configurations.upsert(serviceQuery, serviceProjection)

// in order to display the new updated user credentials, we need to
// publish the user document excluding the service data.
// Note: there is a default in the lea login service but it only covers
// basic fields, like email and _id, hereby we also include firstName/lastName
Meteor.publish(null, function () {
  const { userId } = this
  if (!userId) return this.ready()

  const fields = { 'services.lea.email': 1 }
  return Meteor.users.find({ _id: userId }, { fields })
})
