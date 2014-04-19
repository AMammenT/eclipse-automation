var allProjects = eclipse.resources.workspace.root.projects;

eclipse.console.println("target Folders will be marked derived.");
eclipse.console.println("child Projects will be hidden.");
eclipse.console.println("--------------------------------------");

for (var i=0; i < allProjects.length; i++) {

    // Search for all folders within this project that are named target.  The presence of such a folder indicates
    // that this project has direct artifacts from a build - only the target folder is marked derived.
    var targetFolder = allProjects[i].findMember("target");
    if (targetFolder != null) {
        targetFolder.derived=true;
        eclipse.console.println(allProjects[i].name + " - " + targetFolder.name + ": Derived");
    } else {
        // Otherwise, look for all children of this project that are folders but not dot files.  Mark them derived
        // and hidden so they don't even appear in the view.
        if (allProjects[i].name.search("-parent") != -1) {
            var childrenOfParents = allProjects[i].members(org.eclipse.core.resources.IContainer.INCLUDE_HIDDEN);
            for (var j=0; j < childrenOfParents.length; j++) {
                var candidate = childrenOfParents[j];
                if ((candidate.type == org.eclipse.core.resources.IResource.FOLDER) &&
                    (candidate.name.lastIndexOf(".", 0) != 0)) {
                    candidate.derived = true;
                    candidate.hidden = true;
                    eclipse.console.println(allProjects[i].name + " - " + candidate.name + ": Hidden");
                }
            }
        }
    }
}

