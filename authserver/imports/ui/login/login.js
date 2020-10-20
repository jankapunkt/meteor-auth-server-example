import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './login.html'

Template.login.events({
  'submit #loginForm' (event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const { email, password } = Object.fromEntries(formData.entries())

    Meteor.loginWithPassword(email, password, err => {
      if (err) alert(err.message)
    })
  }
})
