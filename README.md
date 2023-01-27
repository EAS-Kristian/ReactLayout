
## Introduction
This app is designed to simplify the building of Manifest validation files. It gets the capabilities and their respective versions as well as the necessary directives via an api. All of the data is loaded into the cache to limit the amount of api calls made

## Features

- As Yaml is highly scrupulous, it's often difficult to get the Yaml to be exactly as is needed without numerous corrections. This application turns any data the user provides it, into valid yaml as well as telling you where an error has occured when a manual input has lead to invalid yaml 

- The application allows for quick and efficient building of the Manifest file using dropdowns, buttons, and a text area that displays yaml the user is building, either via the GUI on the left or by pasting your own data in 

- The app is a service catalogue that displays all available capabilities,versions, and directives to the user 
- The api behind the app is getting all of its data from Github, which means as the amount of capabilities added to the github organistaion increase, so does the available options through this application 

## How to guide 

- If the user is building their manifest file using the GUI:
1. Select your required Capabilities from the dropdown titled 'Capabilities'

2. Select the version you require from the dropdown titled 'versions' (these versions are specific to your selected capability)

3. Click add

4. At this point you have created your capability, so select your directive from the dropdown titled 'Add Directive'(these directives are specific to your selected capability/version)

5. You will now see your capability on the right within the text box and also in the GUI on the left. Now open the directive dropdown (the downward pointing arrow besides the delete button)

6. Click the blue plus and type your required directory into the input box, this will appear in text area on the right 

7. You can as add many capabilities,directives and directories that you require 


If the user already has data they'd like to use, then they should paste it into the text box on the ride hand side of the page. This will turn the data to yaml and also display in the GUI on the left hand side. Here is some example data: 

```
"capabilities": [
  {
    "name": "fileutils",
    "version": "0.0.2",
    "groups": [
      "iis,sql"
    ],
    "directives": [
      {
        "fileutils_create": {
          "directory": [
            "/home/kris/app", "/home/david"
          ]
        }
      }, {
        "fileutils_delete": {
          "file": [
            "/home/kris/app.txt"
          ]
        }
      }
    ]
  }
]
```










