import { Template } from 'meteor/templating';
import { Meteor } from "meteor/meteor"
import './main.html';

Template.body.events({
  'click .login-button' (event) {
    event.preventDefault()

    Meteor.loginWithLea(err => {
      if (err) {
        alert(err.message)
      }

      console.log(Meteor.user())
    })
  },
  'click .logout-button' (event) {
    event.preventDefault()

    Meteor.logout()
  }
})
