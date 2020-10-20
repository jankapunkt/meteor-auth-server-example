import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import './authorize.html'

// this publication is part of the oauth2-server and is required
// on order to have the workflow being ready
const authorizedClientsSub = Meteor.subscribe('authorizedOAuth')

// set this to false, if you want users to manually authorize
const autoSignIn = false

// Subscribe the list of already authorized clients
// to auto accept
Template.authorize.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()

  // check params against our definitions
  // https://www.oauth.com/oauth2-servers/authorization/the-authorization-request/
  const searchParams = new URLSearchParams(window.location.search)
  const queryParams = Object.fromEntries(searchParams.entries())
  const { scope } = queryParams
  instance.state.set({ queryParams, scope: scope && scope.split('+') })

  // subscription
  instance.autorun(() => {
    const authorizedSubReady = authorizedClientsSub.ready()
    instance.state.set('authorizedSubReady', authorizedSubReady)
  })


  instance.autorun(() => {
    if (!autoSignIn || !Meteor.userId()) return

    setTimeout(() => {
      instance.$('#authForm').submit()
    }, 300)
  })
})

Template.authorize.helpers({
  loadComplete () {
    return Template.instance().state.get('authorizedSubReady')
  },
  getToken: function () {
    return window.localStorage.getItem('Meteor.loginToken')
  },
  scope () {
    return Template.instance().state.get('scope')
  },
  queryParams () {
    return Template.instance().state.get('queryParams')
  },
  autoSignIn () {
    return Template.instance().state.get('autoSignIn')
  }
})

Template.authorize.events({
  'click .logout-button' (event, templateInstance) {
    event.preventDefault()
    templateInstance.state.set('autoSignIn', true)
    Meteor.logout()
  }
})
