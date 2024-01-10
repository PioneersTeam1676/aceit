/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************************************************************!*\
  !*** ./app/views/js/custom/documentation/forms/bootstrap-select.js ***!
  \*********************************************************************/


// Class definition
var KTFormsBootstrapSelect = function() {
    // Private functions
    var example = function() {
        // Select container element
        var elements = document.querySelectorAll(".bootstrap-select");

        // Init Bootstrap Select --- more info: https://github.com/snapappointments/bootstrap-select/
        elements.forEach(element => {
            $(element).selectpicker();
        });
        
    }

    return {
        // Public Functions
        init: function() {
            example();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTFormsBootstrapSelect.init();
});

/******/ })()
;
//# sourceMappingURL=bootstrap-select.js.map