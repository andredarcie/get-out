// Setup Firebase
var config = {
    apiKey: "AIzaSyBkggHyu3tnMmuY3kkpFNsLuliJ8jZB31U",
    authDomain: "teste-2a6c3.firebaseapp.com",
    databaseURL: "https://teste-2a6c3.firebaseio.com",
    storageBucket: "teste-2a6c3.appspot.com",
    messagingSenderId: "883049110130"
}
firebase.initializeApp(config)

var usersRef = firebase.database().ref('users')

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    newUser: {
      name: '',
      message: ''
    }
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    users: usersRef
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        message: !!this.newUser.message.trim()
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
    addUser: function () {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.message = ''
      }
    },
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    }
  }
})