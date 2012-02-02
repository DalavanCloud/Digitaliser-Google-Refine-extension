/*

Copyright 2011, Google Inc.
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

Refine.DigitaliserDefaultImportingController = function(createProjectUI) {
	this._createProjectUI = createProjectUI;

	this._parsingPanel = createProjectUI.addCustomPanel();
	createProjectUI.addSourceSelectionUI( {
		label : "Digitaliser",
		id : "digitaliser",
		ui : new Refine.DigitaliserImportingSourceUI(this)
	});

};

Refine.CreateProjectUI.controllers
		.push(Refine.DigitaliserDefaultImportingController);

Refine.DigitaliserDefaultImportingController.prototype._startOver= Refine.DefaultImportingController.prototype._startOver;

Refine.DigitaliserDefaultImportingController.prototype.startImportJob = Refine.DefaultImportingController.prototype.startImportJob;

Refine.DigitaliserDefaultImportingController.prototype._onImportJobReady = Refine.DefaultImportingController.prototype._onImportJobReady;

Refine.DigitaliserDefaultImportingController.prototype._prepareData = Refine.DefaultImportingController.prototype._prepareData;

Refine.DigitaliserDefaultImportingController.prototype._showParsingPanel = Refine.DefaultImportingController.prototype._showParsingPanel;

Refine.DigitaliserDefaultImportingController.prototype._prepareParsingPanel = Refine.DefaultImportingController.prototype._prepareParsingPanel
Refine.DigitaliserDefaultImportingController.prototype._selectFormat = Refine.DefaultImportingController.prototype._selectFormat;

Refine.DigitaliserDefaultImportingController.prototype._createProject = function() {
	
	  if ((this._formatParserUI) && this._formatParserUI.confirmReadyToCreateProject()) {
		    var projectName = $.trim(this._parsingPanelElmts.projectNameInput[0].value);
		    if (projectName.length == 0) {
		      window.alert("Please name the project.");
		      this._parsingPanelElmts.projectNameInput.focus();
		      return;
		    }

		    var self = this;
		    var options = this._formatParserUI.getOptions();
		    options.projectName = projectName;
		    
		    var jobID=this._jobID;
		    $.post(
		      "/command/core/importing-controller?" + $.param({
		        "controller": "core/default-importing-controller",
		        "jobID": this._jobID,
		        "subCommand": "create-project"
		      }),
		      {
		        "format" : this._format,
		        "options" : JSON.stringify(options)
		      },
		      function(o) {
		        if (o.status == 'error') {
		          alert(o.message);
		          return;
		        }
		      
		        
		        var start = new Date();
		        var timerID = window.setInterval(
		          function() {
		            self._createProjectUI.pollImportJob(
		                start,
		                self._jobID,
		                timerID,
		                function(job) {
		                	
		                  return "projectID" in job.config;
		                },
		                function(jobID, job) {
		                  Refine.CreateProjectUI.cancelImportingJob(jobID);
		                 //---------------------
		                  $.ajax({
		                	  type: 'POST',
		                	  url: "/command/digitaliser/digitaliser-save-metadata?",
		                	  data: $.param({
		            		        "project": job.config.projectID,
		            		        "subCommand": "save-metadata",
		            		        "source":"digitaliser",
		            		        "initial" :"yes"
		            		      }),
		            		      async:false
		                	});
		                   //---------------------
		                  document.location = "project?project=" + job.config.projectID;
		                },
		                function(job) {
		                  alert('Errors:\n' + Refine.CreateProjectUI.composeErrorMessage(job));
		                  self._onImportJobReady();
		                }
		            );
		          },
		          1000
		        );
		        self._createProjectUI.showImportProgressPanel("Creating project ...", function() {
		          // stop the timed polling
		          window.clearInterval(timerID);

		          // explicitly cancel the import job
		          $.post("/command/core/cancel-importing-job?" + $.param({ "jobID": jobID }));

		          self._createProjectUI.showSourceSelectionPanel();
		       
		        });
		      },
		      "json"
		    );
		  }
		};

Refine.DigitaliserDefaultImportingController.prototype._ensureFormatParserUIHasInitializationData =Refine.DefaultImportingController.prototype._ensureFormatParserUIHasInitializationData; 
Refine.DigitaliserDefaultImportingController.prototype._disposeParserUI = Refine.DefaultImportingController.prototype._disposeParserUI;
Refine.DigitaliserDefaultImportingController.prototype.updateFormatAndOptions = Refine.DefaultImportingController.prototype.updateFormatAndOptions;
Refine.DigitaliserDefaultImportingController.prototype._startOver=Refine.DefaultImportingController.prototype._startOver;
Refine.DigitaliserDefaultImportingController.prototype.getPreviewData=Refine.DefaultImportingController.prototype.getPreviewData;
Refine.DigitaliserDefaultImportingController.prototype._disposeFileSelectionPanel=Refine.DefaultImportingController.prototype._disposeFileSelectionPanel;