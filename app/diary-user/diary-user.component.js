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
            localStorage.removeItem("user")
            self.token = null
          }
      } 

        self.currentDate = `${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()}`
        self.diarySection = "entries"

        self.theme = "#FFA500"

        self.entries = null
        self.profile = null

        self.entryText = ""

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
                self.profileUP = { ... self.profile }
              }, (err) => {
                console.log(err.data)

              } )
          
              self.changeTheme = (  ) => {
                /*
                console.log("theme", getComputedStyle(document.documentElement)
                  .getPropertyValue("--theme") )
                */
                document.documentElement.style
                  .setProperty('--theme', self.theme)


              }

        self.updateProfile = () => {
          console.log("UPDATE")
          console.log(self.profile.userID)
          console.log(localStorage.getItem("token"))
          $http(
              {
                  method: "PUT",
                  url: "http://localhost:3000/profiles/" + self.profile.userID ,
                  data: {
                    ... self.profileUP
                  },
              
                  headers: {
                    Authorization: `Bearer ` +  localStorage.getItem("token")
                  }
              }
              ).then( (res) => {

                if(res.data.message === "Profile updated") {
                  console.log(" PROFILE UP", res)

                  self.profile = { ... self.profileUP }
                  self.diarySection = "profile"

                }
              }, (err) => {
                console.log(err.data)

              } )
        }

        self.saveEntry = () => {
          console.log("SAVE ENTRY", self.entryText)

          $http(
            {
                method: "POST",
                url: "http://localhost:3000/diary-entries/" ,
                data: {
                  date: self.currentDate,
                  text: self.entryText
                },
            
                headers: {
                  Authorization: `Bearer ` +  localStorage.getItem("token")
                }
            }
            ).then( (res) => {

                console.log(" NEW ENTRY ", res)


            }, (err) => {
              console.log("ERROR",err.data)

            } )
        }



        self.deleteAccount = () => {
          console.log("DEL", localStorage.getItem("user"))

          $http(
            {
                method: "DELETE",
                url: "http://localhost:3000/users/" + localStorage.getItem("user") ,
                headers: {
                  Authorization: `Bearer ` +  localStorage.getItem("token")
                }
            }
            ).then( (res) => {

                console.log(" DELETE ", res)

                self.logout()


            }, (err) => {
              console.log("ERROR",err.data)

            } )

        }


      }
    ]
  
  })