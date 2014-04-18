var allProjects = eclipse.resources.workspace.root.projects;
for (var i=0; i < allProjects.length; i++) {
    var toMarkFolder = allProjects[i].findMember("target");
    if (toMarkFolder != null) {
        toMarkFolder.derived=true;
    }
}
