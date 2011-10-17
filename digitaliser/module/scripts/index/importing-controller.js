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
Refine.DigitaliserDefaultImportingController.prototype.startImportJob = Refine.DefaultImportingController.prototype.startImportJob;

Refine.DigitaliserDefaultImportingController.prototype._onImportJobReady = Refine.DefaultImportingController.prototype._onImportJobReady;

Refine.DigitaliserDefaultImportingController.prototype._prepareData = Refine.DefaultImportingController.prototype._prepareData;

Refine.DigitaliserDefaultImportingController.prototype._showParsingPanel = Refine.DefaultImportingController.prototype._showParsingPanel;

Refine.DigitaliserDefaultImportingController.prototype._prepareParsingPanel = function() {
	var self = this;

	this._parsingPanel.unbind().empty().html(
			DOM.loadHTML("digitaliser",
					'scripts/index/digitaliser-parsing-panel.html'));

	this._parsingPanelElmts = DOM.bind(this._parsingPanel);
	this._parsingPanelElmts.startOverButton.click(function() {
		self._startOver();
	});
	this._parsingPanelElmts.progressPanel.hide();

	this._parsingPanelResizer = function() {
		var elmts = self._parsingPanelElmts;
		var width = self._parsingPanel.width();
		var height = self._parsingPanel.height();
		var headerHeight = elmts.wizardHeader.outerHeight(true);
		var controlPanelHeight = 300;

		elmts.dataPanel.css("left", "0px").css("top", headerHeight + "px").css(
				"width", (width - DOM.getHPaddings(elmts.dataPanel)) + "px")
				.css(
						"height",
						(height - headerHeight - controlPanelHeight - DOM
								.getVPaddings(elmts.dataPanel))
								+ "px");
		elmts.progressPanel.css("left", "0px").css("top", headerHeight + "px")
				.css("width",
						(width - DOM.getHPaddings(elmts.progressPanel)) + "px")
				.css(
						"height",
						(height - headerHeight - controlPanelHeight - DOM
								.getVPaddings(elmts.progressPanel))
								+ "px");

		elmts.controlPanel.css("left", "0px").css("top",
				(height - controlPanelHeight) + "px").css("width",
				(width - DOM.getHPaddings(elmts.controlPanel)) + "px").css(
				"height",
				(controlPanelHeight - DOM.getVPaddings(elmts.controlPanel))
						+ "px");
	};

	$(window).resize(this._parsingPanelResizer);
	this._parsingPanelResizer();

	var formats = this._job.config.rankedFormats;
	var createFormatTab = function(format) {
		var tab = $('<div>').text(Refine.importingConfig.formats[format].label)
				.attr("format", format).addClass(
						"default-importing-parsing-control-panel-format")
				.appendTo(self._parsingPanelElmts.formatsContainer).click(
						function() {
							self._selectFormat(format);
						});

		if (format == self._format) {
			tab.addClass("selected");
		}
	};
	for ( var i = 0; i < formats.length; i++) {
		createFormatTab(formats[i]);
	}
	this._selectFormat(this._format);
};
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
		    var urlpattern=this._parsingPanelElmts.urlpattern[0].value;
		    var jobID=this._jobID;
		    $.post(
		      "/command/core/importing-controller?" + $.param({
		        "controller": "digitaliser/digitaliser-importing-controller",
		        "jobID": this._jobID,
		        "subCommand": "create-project",
		        "urlpattern": this._parsingPanelElmts.urlpattern[0].value
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
		                  Refine.CreateProjectUI.cancelImportinJob(jobID);
		                 //http%3A%2F%2Fapi.digitaliser.dk%2Frest%2Fresources%2F
		                  var urlpatternenc=urlpattern.replace(/\//g,"%2F").replace(/\:/g,"%3A");
		                  document.location = "project?project=" + job.config.projectID+"&urlpattern="+urlpatternenc;
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