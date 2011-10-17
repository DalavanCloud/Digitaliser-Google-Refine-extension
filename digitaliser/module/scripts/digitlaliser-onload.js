function onLoad() {

	 var urlpattern=window.location.toString().split("urlpattern")[1].substring(1);
	 var urlpatterndec=urlpattern.replace(/%2F/g,"\/").replace(/%3A/g,"\:");
	
	 jQuery.getJSON("/extension/digitaliser/scripts/onload-operations.js", function(data){
		//--------------
		 Refine.postCoreProcess(
			        "apply-operations",
			        {},
			        { operations: JSON.stringify(data) },
			        { everythingChanged: true },
			        {
			          onDone: function(o) {
			            if (o.code == "pending") {
			              // Something might have already been done and so it's good to update
			              Refine.update({ everythingChanged: true });
			            }
			          }
			        }
			        );
		//----------------
		
         });
	
        
     
}
$(onLoad);