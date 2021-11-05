"use strict"

angular.
  module("diaryUser").
  component("diaryUser", {
    templateUrl: "diary-user/diary-user.template.html", 
    bindings: {
      token: "="
    },
    controller: ["$http",
      function DiaryUserController($http) {
        const self =this

        self.$onInit = function() {
          self.logout = () => {
            localStorage.removeItem("token")
            self.token = null
          }
      } 

        self.currentDate = new Date()
        self.diarySection = "entries"

        self.entries = null
        self.profile = null

        $http.get("http://localhost:3000/diary-entries",
              {
                  headers: {
                    Authorization: `Bearer ` +  localStorage.getItem("token")
                  }
              }
              ).then( (res) => {
                console.log(" ENTRIES ", res.data)
                self.entries = res.data
              }, (err) => {
                console.log(err.data)

              } )
        
              $http.get("http://localhost:3000/profiles",
              {
                  headers: {
                    Authorization: `Bearer ` +  localStorage.getItem("token")
                  }
              }
              ).then( (res) => {
                console.log(" PROFILE ", res.data[0])
                self.profile = res.data[0]
              }, (err) => {
                console.log(err.data)

              } )
          



      }
    ]
  
  })