'use strict'

angular.
  module("diaryLogin").
  component("diaryLogin", {
    templateUrl: "diary-login/diary-login.template.html",
    controller: ["$http", "$window",
      function DiaryLoginController($http, $window) {
        var self = this

        self.username = ""
        self.password = ""
        self.confirmpassword = ""



        self.login = () => {

          $http.post('http://localhost:3000/login',
            {
              username: self.username,
              password: self.password
            }
            ).then( (res) => {

              localStorage.setItem("token", res.data.token)
              localStorage.setItem("user", res.data.user)
              $window.location.reload()
            }, (err) => {
              console.log( "ERROR", err.data)
            })
          }

        self.create = () => {

          if( self.password !== self.confirmpassword ) {
            return alert("Passwords dont match")
          }

          $http.post('http://localhost:3000/users',
            {
                username: self.username,
                password: self.password
            }
            ).then( (res) => {

              self.confirmpassword = ""

              self.login()

            }, (err) => {
              console.log( "ERROR", err.data)
            })
          }


        }
    ]
  })