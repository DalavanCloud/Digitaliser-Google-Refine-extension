/*

Copyright 2010, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,           
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY           
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

// This file is added to the /project page

var digitaliserExtension = {};



Refine.DigitaliserImportingSourceUI=function(controller) {
	  this._controller = controller;
}



Refine.DigitaliserImportingSourceUI.prototype.attachUI = function(bodyDiv) {
	  var self = this;

	  bodyDiv.html(DOM.loadHTML("digitaliser", "scripts/index/digitaliser-insertion-form.html"));

	  this._elmts = DOM.bind(bodyDiv);
	  this._elmts.nextButton.click(function(evt) {
	    if (self._elmts.fileInput[0].files.length === 0) {
	      window.alert("You must specify a data file to import.");
	    } else {
	      self._controller.startImportJob(self._elmts.form, "Uploading data ...");
	    }
	  });
	};

	Refine.DigitaliserImportingSourceUI.prototype.focus = function() {
	};
