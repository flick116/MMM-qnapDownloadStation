# MMM-qnapDownloadStation
A module for the MagicMirror project (https://github.com/MichMich/MagicMirror) to display the downloads of the QNAP Download Station 

Columns, and headings, as well as how some of the data is displayed is configurableText and the inside icon are configurable.

![](images/1.png)
![](images/2.png)

## Installation

Clone this repository in your `~/MagicMirror/modules/` folder `( $ cd ~MagicMirror/modules/ )`:
```
git clone https://github.com/flick116/MMM-qnapDownloadStation
```
## Dependencies

[request](https://www.npmjs.com/package/request)

## Config

|Option|Required|Description|
|---|---|---|
|`username`|Yes|This is your QNAP Download Station username.<br><br>**Type:** `string`|
|`password`|Yes|This is your QNAP Download Station password.<br><br>**Type:** `string`|
|`qnapServer`|Yes|The web address to your QNAP NAS<br><br>**Type:** `string`|
|`status`|Yes|Dictates what type of downloads are shown in the table<br><br>**Type:** `string`<br>**Possible values:** `downloading` or `all` <br> **Default value:** `downloading`|

Example of the config.js entry:

```
		{
			module: "MMM-qnapDownloadStation",
			header: "QNAP Download Station",
			position: "top_right",
			config: {
				username: "admin",
				password: "password"
			},
		},
```