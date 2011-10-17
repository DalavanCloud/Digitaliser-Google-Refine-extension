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

package com.google.refine.digitaliser.importing;

import java.io.IOException;

import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.json.JSONException;
import org.json.JSONObject;


import com.google.refine.ProjectManager;
import com.google.refine.ProjectMetadata;
import com.google.refine.RefineServlet;
import com.google.refine.commands.GetPreferenceCommand;
import com.google.refine.commands.HttpUtilities;
import com.google.refine.commands.column.AddColumnByFetchingURLsCommand;
import com.google.refine.commands.column.AddColumnCommand;
import com.google.refine.commands.project.GetProjectMetadataCommand;

import com.google.refine.importing.ImportingController;
import com.google.refine.importing.ImportingJob;
import com.google.refine.importing.ImportingManager;
import com.google.refine.importing.ImportingUtilities;
import com.google.refine.model.Project;
import com.google.refine.operations.cell.TextTransformOperation;
import com.google.refine.operations.column.ColumnAdditionOperation;

import com.google.refine.util.JSONUtilities;
import com.google.refine.util.ParsingUtilities;

public class DigitaliserDefaultImportingController implements
		ImportingController {

	protected RefineServlet servlet;

	@Override
	public void init(RefineServlet servlet) {
		this.servlet = servlet;
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Properties parameters = ParsingUtilities.parseUrlParameters(request);
		String subCommand = parameters.getProperty("subCommand");
		if ("create-project".equals(subCommand)) {
			doCreateProject(request, response, parameters);
		} else
		if("save-url".equals(subCommand)){
			doSaveURLpattern(request, response, parameters);
		}
		else
		{
			HttpUtilities.respond(response, "error", "No such sub command");
		}
	}

	private void doSaveURLpattern(HttpServletRequest request,
			HttpServletResponse response, Properties parameters) throws IOException {

		long jobID = Long.parseLong(parameters.getProperty("jobID"));
		ImportingJob job = ImportingManager.getJob(jobID);
		if (job == null) {
			HttpUtilities.respond(response, "error", "No such import job");
			return;
		}

	   
		ProjectMetadata pm = ProjectManager.singleton.getProjectMetadata(job.project.id);
		pm.setCustomMetadata("urlpattern", request.getParameter("urlpattern"));
		ProjectManager.singleton.ensureProjectSaved(job.project.id);			
			
		HttpUtilities.respond(response, "ok", "done");
	}

	private void doCreateProject(HttpServletRequest request,
			HttpServletResponse response, Properties parameters)
			throws ServletException, IOException {

		long jobID = Long.parseLong(parameters.getProperty("jobID"));
		ImportingJob job = ImportingManager.getJob(jobID);
		if (job == null) {
			HttpUtilities.respond(response, "error", "No such import job");
			return;
		}

		job.updating = true;
		job.touch();
		try {
			JSONObject config = job.getOrCreateDefaultConfig();
			if (!("ready".equals(config.getString("state")))) {
				HttpUtilities.respond(response, "error", "Job not ready");
				return;
			}

			String format = request.getParameter("format");
			JSONObject optionObj = ParsingUtilities
					.evaluateJsonStringToObject(request.getParameter("options"));

			List<Exception> exceptions = new LinkedList<Exception>();
			String urlpattern =parameters.getProperty("urlpattern");
			JSONUtilities.safePut(job.config, "urlpattern", urlpattern);
			long projectID=ImportingUtilities.createProject(job, format, optionObj,exceptions, true);
//			ProjectMetadata pm = ProjectManager.singleton.getProjectMetadata(projectID);
//			pm.getPreferenceStore().put("urlpattern", request.getParameter("urlpattern"));
//			ProjectManager.singleton.ensureProjectSaved(projectID);			
			
			
			HttpUtilities.respond(response, "ok", "done");
		} catch (JSONException e) {
			throw new ServletException(e);
		}
	}

}
