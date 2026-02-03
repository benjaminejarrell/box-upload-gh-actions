import * as core from '@actions/core';
import { BoxClient, BoxJwtAuth, JwtConfig } from 'box-node-sdk';
import fs from 'node:fs';
import path from 'node:path';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
    // Get the sdkConfig supplied by GH actions
    const sdkConfig = JwtConfig.fromConfigJsonString(core.getInput('box-client-sdk-config'));
    const auth = new BoxJwtAuth({ config: sdkConfig });

    // Get the service account client, used to create and manage app user accounts
    // The enterprise ID is pre-populated by the JSON configuration,
    // so you don't need to specify it here
    const client = new BoxClient({ auth });

    // Get file to upload
    const fileName = core.getInput('file');

    // What should we name the file when uploading? If not specified, use the source file name.
    var destinationFilename = core.getInput('destination-filename');
    if (!destinationFilename) destinationFilename = path.basename(fileName);

    // Upload to Box
    const boxFolderID = core.getInput('box-folder-id');
    const attrs = { name: destinationFilename, parent: { id: boxFolderID} };
    const body = {
        attributes: attrs,
        file: fs.createReadStream(fileName),
    };
    const files = await client.uploads.uploadFile(body);
    const file = files.entries[0];
    console.log(`File uploaded with id ${file.id}, name ${file.name}`);
}