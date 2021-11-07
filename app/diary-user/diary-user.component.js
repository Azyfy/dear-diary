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

        self.user = localStorage.getItem("user")

        self.currentDate = `${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()}`
        self.diarySection = "entries"

        self.theme = "#FFA500"

        self.entries = null
        self.profile = null

        self.entryText = ""

        self.errors = [ ]

        self.opneEntry = (entry) => {
          self.singleEntry = entry
          self.diarySection = "singleEntry"
        }

        self.changeTheme = (  ) => {
          /*
          console.log("theme", getComputedStyle(document.documentElement)
            .getPropertyValue("--theme") )
          */
          document.documentElement.style
            .setProperty('--theme', self.theme)
        }


        // http

        $http.get("http://localhost:3000/diary-entries",
          {
              headers: {
                Authorization: `Bearer ` +  localStorage.getItem("token")
              }
          }
          ).then( (res) => {
            self.entries = res.data
          }, (err) => {
            console.log(err.data)
          })
        
        $http.get("http://localhost:3000/profiles",
          {
              headers: {
                Authorization: `Bearer ` +  localStorage.getItem("token")
              }
          }
          ).then( (res) => {
            self.profile = res.data[0]
            self.profileUP = { ... self.profile }
          }, (err) => {
            console.log("ERROR", err.data)
          })

        self.updateProfile = () => {
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

                  self.profile = { ... self.profileUP }
                  self.diarySection = "profile"

                }
              }, (err) => {
                console.log("ERROR", err.data)
              })
        }


        self.createProfile = () => {
          $http(
              {
                method: "POST",
                url: "http://localhost:3000/profiles/",
                data: {
                  ... self.profileUP
                },
                headers: {
                  Authorization: `Bearer ` +  localStorage.getItem("token")
                }
              }
              ).then( (res) => {

                if(res.data.message === "Profile posted") {

                  self.profile = { ... self.profileUP }
                  self.diarySection = "profile"

                }
              }, (err) => {
                console.log("ERROR", err.data)
              })
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

                self.entries.push({
                  date: self.currentDate,
                  text: self.entryText
                })
                self.diarySection = "entries"

            }, (err) => {
              console.log("ERROR",err.data)
            })
        }

        self.deleteEntry = (entryID) => {

          const confirmDelete = confirm("Confirm delete?")

          if (!confirmDelete) {
            return
          }

          $http(
            {
              method: "DELETE",
              url: "http://localhost:3000/diary-entries/" + entryID,
              headers: {
                Authorization: `Bearer ` +  localStorage.getItem("token")
              }
            }
            ).then( (res) => {

                self.entries = self.entries.filter( entry => entry.entryID !== entryID )
                self.diarySection = "entries"

            }, (err) => {
              console.log("ERROR",err.data)
            })
        }



        self.deleteAccount = () => {

          const confirmDelete = confirm("Confirm delete?")

          if (!confirmDelete) {
            return
          }


          $http(
            {
              method: "DELETE",
              url: "http://localhost:3000/users/" + localStorage.getItem("user") ,
              headers: {
                Authorization: `Bearer ` +  localStorage.getItem("token")
              }
            }
            ).then( (res) => {
                self.logout()
            }, (err) => {
              console.log("ERROR",err.data)
            })


        }
      }
    ]
  })