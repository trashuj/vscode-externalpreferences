'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs = require('fs');
var spawnCommand = require('spawn-command');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;

// import { PluginService, ExtensionInformation } from './pluginService';
// import { Environment } from './environmentPath';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
    //var en: Environment = new Environment(context);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "hello" is now active!');

    var files : string[] = vscode.workspace.getConfiguration('externalPreferences').get('files', []);

    // // The command has been defined in the package.json file
    // // Now provide the implementation of the command with  registerCommand
    // // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.updatePreferences', () =>
    {
    //     // The code you place here will be executed every time your command is executed

    //     // Display a message box to the user
    //     vscode.window.showInformationMessage('Hello World!');
        for (let file of files)
        {
            parseFile(file);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated 
export function deactivate() {
}

function parseFile(file: string)
{
    let jsonFile = fs.readFileSync(file);
    let prefs = JSON.parse(jsonFile.toString());

    updatePreferences(prefs);
}

function updatePreferences(prefs)
{
    updateExtensions(prefs.extensions);
}

function printOutput(data)
{
    vscode.window.showErrorMessage('data ' + data.toString());
}

function updateExtensions(extensions)
{
    // var process = spawnCommand('code --list-extensions');
    // process.stdout.on('data', printOutput);
    // process.stderr.on('data', printOutput);

    // exec('code --list-extensions', function(error, stdout, stderr)
    // {
    //     vscode.window.showErrorMessage('data ' + stdout);
    // });

    // var child = spawn('code', [
    // '--list-extensions'
    // ]);

    // child.stdout.on('data', function(stdout) {
    //     vscode.window.showErrorMessage('data ' + stdout);
    // });

    var output = spawnSync( 'code', [ '--list-extensions' ] );
    vscode.window.showErrorMessage('err ' + output.stderr.toString());
    vscode.window.showErrorMessage('out ' + output.stdout.toString());

    //vscode.window.showErrorMessage('installing ' + data);
    //vscode.window.showErrorMessage("installing " + extensions[0]);
    //extensions.install
    //vscode.commands.executeCommand("Extensions: Install Extension " + extensions[0]);
    //vscode.commands.executeCommand("Extensions: Install Extensions");
    //run("code --list-extensions");

    // var extensionlist = PluginService.CreateExtensionList();
    // extensionlist.sort(function (a, b) {
    //     return a.name.localeCompare(b.name);
    // });

    // var remoteList = ExtensionInformation.fromJSONList(file.content);
    // var deletedList = PluginService.GetDeletedExtensions(remoteList);

    // for (var deletedItemIndex = 0; deletedItemIndex < deletedList.length; deletedItemIndex++) {
    //     var deletedExtension = deletedList[deletedItemIndex];
    //     (async function (deletedExtension: ExtensionInformation, ExtensionFolder: string) {
    //         await actionList.push(PluginService.DeleteExtension(deletedExtension, en.ExtensionFolder)
    //             .then((res) => {
    //                 //vscode.window.showInformationMessage(deletedExtension.name + '-' + deletedExtension.version + " is removed.");
    //                 deletedExtensions.push(deletedExtension);
    //             }, (rej) => {
    //                 common.LogException(rej, common.ERROR_MESSAGE, true);
    //             }));
    //     } (deletedExtension, en.ExtensionFolder));

    // }

    // var missingList = PluginService.GetMissingExtensions(remoteList);
    // if (missingList.length == 0) {
    //     vscode.window.setStatusBarMessage("");
    //     vscode.window.setStatusBarMessage("Sync : No Extension needs to be installed.", 2000);
    // }
    // else {

    //     vscode.window.setStatusBarMessage("Sync : Installing Extensions in background.");
    //     missingList.forEach(async (element) => {

    //         await actionList.push(PluginService.InstallExtension(element, en.ExtensionFolder)
    //             .then(function () {
    //                 addedExtensions.push(element);
    //                 //var name = element.publisher + '.' + element.name + '-' + element.version;
    //                 //vscode.window.showInformationMessage("Extension " + name + " installed Successfully");
    //             }));
    //     });
    // }
}
