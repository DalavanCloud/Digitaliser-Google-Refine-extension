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

package com.google.refine.digitaliser.commands;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONWriter;

import com.google.refine.commands.Command;
import com.google.refine.commands.EngineDependentCommand;
import com.google.refine.commands.HttpUtilities;
import com.google.refine.commands.column.AddColumnByFetchingURLsCommand;
import com.google.refine.commands.column.AddColumnCommand;
import com.google.refine.history.HistoryEntry;
import com.google.refine.model.AbstractOperation;
import com.google.refine.model.Column;
import com.google.refine.model.Project;
import com.google.refine.operations.OperationRegistry;
import com.google.refine.operations.cell.TextTransformOperation;
import com.google.refine.operations.column.ColumnAdditionByFetchingURLsOperation;
import com.google.refine.operations.column.ColumnAdditionOperation;
import com.google.refine.process.Process;
import com.google.refine.util.ParsingUtilities;

public class DigitaliserOperationsCommand extends Command {
    

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 try {
	            Project project = getProject(request);
	            if(checkNewColumn(project,"URL")==false){
	            	
	                  String jsonString = request.getParameter("operations");
	                  try {
	                      JSONArray a = ParsingUtilities.evaluateJsonStringToArray(jsonString);
	                      int count = a.length();
	                      for (int i = 0; i < count; i++) {
	                          JSONObject obj = a.getJSONObject(i);
	                          
	                          reconstructOperation(project, obj);
	                      }

	                      if (project.processManager.hasPending()) {
	                          respond(response, "{ \"code\" : \"pending\" }");
	                      } else {
	                          respond(response, "{ \"code\" : \"ok\" }");
	                      }
	                  } catch (JSONException e) {
	                      respondException(response, e);
	                  }
	            }
	            else{
	            	respond(response, "ok", "stop");
	            }
	        } catch (Exception e) {
	            respondException(response, e);
	        }
	}


	
	

	protected void reconstructOperation(Project project, JSONObject obj) {
        AbstractOperation operation = OperationRegistry.reconstruct(project, obj);
        if (operation != null) {
            try {
                Process process = operation.createProcess(project, new Properties());
                
                project.processManager.queueProcess(process);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

	private boolean checkNewColumn(Project project, String newColumnName) {
		boolean newColumnNameExists=false;
		for (Iterator iterator = project.columnModel.columns.iterator(); iterator.hasNext();) {
			Column column = (Column) iterator.next();
			if(column.getName().equals(newColumnName)){
				newColumnNameExists=true;
			}
			
		}
		return newColumnNameExists;
	}

}
