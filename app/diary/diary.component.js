'use strict'

angular.
  module("diary").
  component("diary", {
    templateUrl: "diary/diary.template.html",
    controller: ['$http', '$routeParams',
      function DiaryController($http, $routeParams) {
        var self = this

        this.testToken = true

      }
    ]
  })