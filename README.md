If you want to use the provided git hooks with your system, make sure you run "setup_hooks.sh" from the command line, or move the hooks into the ./.git/hooks directory and make sure they have the required permissions.

Note: Windows machines do not need to provide permissions, and the setup_hooks.sh file will only work from the git bash terminal.

Command:
sh setup_hooks.sh

* Temporary files / objects
In order for SDF to work (provided you use SDF), the project needs to have a deploy.xml file.

By default, NetSuite uses wildcards to upload files to your system. However, this takes a long time, and you may not want all files to upload.

The git hooks provided in this framework will update the deploy.xml file based on files that get changed. This allows you to only update the files you are working on, and leave all other files / objects untouched.

This causes a bit of a conflict if, for example, you are updating script files only and no object files. In that event, the default deploy.xml for this framework looks like this:
```xml
<deploy>
    <files>
        <path>~/FileCabinet/SuiteScripts/sdf_ignore</path>
    </files>
    <objects>
        <path>~/Objects/Temp/*</path>
    </objects>
</deploy>
```

Leaving the sdf_ignore file and the Objects/Temp folder empty gives NetSuite all of the configuration it needs to accept the deploy.xml file. The Temp folder should always be empty and the sdf_ignore file should always be considered worthless.

If you want to deploy the framework via SDF, copy the XML from deploy_sample.xml to deploy.xml. Empty folders cannot be deployed via SDF, so they will deploy as you add models to them.

The pre-commit hook only allows these filetypes: js, html, jpg, jpeg, gif, png, css, json

Generally speaking, alternative filetypes should just be uploaded via the file cabinet. Otherwise you can update the pre-commit hook to include more files by updating line 40. Permitted filetypes are separated by "|".