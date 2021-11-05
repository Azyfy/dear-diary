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
              console.log(res)
              console.log("TOKEN", res.data.token)
              console.log("USER", res.data.user)

              localStorage.setItem("token", res.data.token)
              $window.location.reload()
            }, (err) => {
              console.log(err.data)
              const error = err.data
              
              if(error.message) {
                console.log("MES", error.message)
              }
              else {
                console.log("ERRs", error.errors)
              }
            } )
          }

          self.create = () => {
            console.log("CRE")
            if( self.password !== self.confirmpassword ) {
              console.log("SAME")
              return alert("Passwords dont match")
            }

            $http.post('http://localhost:3000/users',
              {
                  username: self.username,
                  password: self.password
              }
              ).then( (res) => {
                console.log(res)

                self.username = ""
                self.password = ""
                self.confirmpassword = ""

              }, (err) => {
                console.log(err.data)

              } )
            }



        }
    ]
  })