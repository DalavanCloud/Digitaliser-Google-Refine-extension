package com.google.refine.digitaliser.commands;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.refine.ProjectManager;
import com.google.refine.ProjectMetadata;
import com.google.refine.commands.Command;

public class SaveMetadataCommand extends Command {

	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		  try {
	          ProjectMetadata pm = getProjectMetadata(request);
	      	
	      	  pm.setCustomMetadata("source",request.getParameter("source"));
	      	  pm.setCustomMetadata("initial",request.getParameter("initial"));
	          long projectID=getProject(request).id;
	          ProjectManager.singleton.ensureProjectSaved(projectID);		            
	          respond(response, "{ \"code\" : \"ok\" }");
	      } catch (Exception e) {
	          respondException(response, e);
	      }
	}
  }
