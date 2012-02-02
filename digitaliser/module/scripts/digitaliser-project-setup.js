//---------------------
$.post("/command/digitaliser/digitaliser-get-metadata?" + $.param( {
	"project" : theProject.id,
	"keys" : "source,initial"
}), {

}, function(data) {
	controller = new DigitaliserSetupController();

	controller.setupOperations(data.customMetadata);

},"json");
//---------------------

DigitaliserSetupController = function() {

};

DigitaliserSetupController.prototype.setupOperations = function(data) {

	var timerId = setInterval(function() {

		if (theProject.columnModel) {
			clearInterval(timerId);
			// check the compound column
			var idExists = false;
			var project_columns = theProject.columnModel.columns;
			for ( var i = 0; i < project_columns.length; i++) {
				if (project_columns[i].name = "ID") {
					idExists = true;
					break;
				}

			}

			if (idExists) {
				if (data.initial == "yes") {
					// ---------------------
					$.post("/command/digitaliser/digitaliser-save-metadata?"
							+ $.param( {
								"project" : theProject.id,
								"subCommand" : "save-metadata",
								"slctStudyType" : data.slctStudyType,
								"metadataAttributes" : data.metadataAttributes,
								"source" : "digitaliser",
								"initial" : "no"
							}), {
								
							}, function(o) {
							});
					// ---------------------

				
					 Refine.postProcess("digitaliser", "digitaliser-apply-column-operations",
							{
								"project" : theProject.id
							}, {}, {
								everythingChanged : true
							}, {
								onDone : function(o) {
									if (o.code == "pending") {
										// Something might have already been
										// done and so it's good to update
							Refine.update( {						everythingChanged : true							});
						}
					}
				}	);
					
				
					
					
				} else {
					alert("Second time");
				}

			}

		}
	}, 1000);

};
