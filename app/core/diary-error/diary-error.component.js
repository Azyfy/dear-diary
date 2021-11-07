"use strict"

angular.
    module("diaryError").
    component("diaryError", {
        templateUrl: "core/diary-error/diary-error.template.html",
        bindings: {
            error: "="
        },
        controller: function DiaryErrorController() {
            this.$onInit = function() {

                const self = this
                this.errors = []

                self.clearError = () => {
                    self.error = null
                }

                if(this.error.errors) {
                    this.errors = this.errors.concat(this.error.errors)
                }
                else if(this.error.message) {
                    this.errors.push({ msg: this.error.message })
                }
                else {
                    this.errors.push({ msg: this.error.sqlMessage })
                }

            }
        }
    })