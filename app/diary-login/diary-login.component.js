'use strict'

angular.
  module("diaryLogin").
  component("diaryLogin", {
    templateUrl: "diary-login/diary-login.template.html",
    controller: ["$http",
      function DiaryLoginController($http) {
        var self = this

        self.username = ""
        self.password = ""
        self.confirmpassword = ""

      }
    ]
  })