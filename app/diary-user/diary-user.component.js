"use strict"

angular.
  module("diaryUser").
  component("diaryUser", {
    templateUrl: "diary-user/diary-user.template.html",
    controller: ["$http",
      function DiaryUserController($http) {
        const self =this

        self.diarySection = "entries"

        self.testEntries = [
            {
                date: "2021-11-03",
                text: "Diary entry test"
            },
            {
                date: "2021-11-04",
                text: "Diary entry test 2"
            }
        ]

 //       $http.get("/diary-entries").then(function(response) {
   //         console.log(response)
     //     })

      }
    ]
  })