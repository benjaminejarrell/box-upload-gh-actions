const core = require('@actions/core');
var BoxSDK = require('box-node-sdk');
const fs = require('node:fs');
const path = require('node:path');

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
    // Get the sdkConfig supplied by GH actions
    const sdkConfig = JSON.parse(core.getInput('box-client-sdk-config'));
    var sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

    // Get the service account client, used to create and manage app user accounts
    // The enterprise ID is pre-populated by the JSON configuration,
    // so you don't need to specify it here
    var client = sdk.getAppAuthClient('enterprise');

    // Get file to upload
    const fileName = core.getInput('file');
    var fileStream = fs.createReadStream(fileName);

    // What should we name the file when uploading? If not specified, use the source file name.
    var destinationFilename = core.getInput('destination-filename');
    if (!destinationFilename) destinationFilename = path.basename(fileName);

    // Upload to Box
    const boxFolderID = core.getInput('box-folder-id');
    core.info(`Uploading file ${fileName}`);
    client.files.uploadFile(boxFolderID, destinationFilename, fileStream)
        .catch(error => { core.setFailed(error.message) });

    // Get a shareable link
    const folder = client.folders.get(boxFolderID, { fields: 'shared_link' });
    if (folder.shared_link) {
        let url = folder.shared_link.url;
        core.info(`Shared Folder Link: ${url}`);
        core.setOutput("shared-link", url);
    } else {
        core.info('No shared link found');
    }
}

module.exports = {
    run
}