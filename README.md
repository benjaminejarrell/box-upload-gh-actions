# Box Upload GitHub Action

A GitHub action for uploading files or build artifacts to Box.

**IMPORTANT** You must `npm run build` before tagging a release.

## Build
1. `npm i -g @vercel/ncc #Install NCC`
2. `ncc build src/index.js`

## Example
```yaml
- name: Upload cat pic to Box
  uses: benjaminejarrell/box-upload-gh-actions@v1.2
  id: BoxUpload
  with:
    box-client-sdk-config: ${{ secrets.BOX_CLIENT_SDK_CONFIG }}
    box-folder-id: 1234
    file: cat.png
```
## Inputs

### `box-client-sdk-config`
JSON formatted output from Box developer console.
1. Login to the [Box Developer Console](https://developer.box.com/)
2. Create New App -> Custom App
3. Authentication Method: Server Authentication (With JWT)
4. Under Add and Manage Public Keys, Generate a Public/Private KeyPair
5. Under App Settings, Download as JSON.
6. In GitHub, create a new repository secret called `BOX_CLIENT_SDK_CONFIG` (Settings -> Security -> Actions)
6. Copy the contents of the downloaded config.json file from Box into this secret.

Example:

```json
{
  "boxAppSettings": {
    "clientID": "",
    "clientSecret": "",
    "appAuth": {
      "publicKeyID": "",
      "privateKey": "",
      "passphrase": ""
    }
  },
  "enterpriseID": ""
}
```
### `box-folder-id`
Box folder ID for the destination. Can be found in the URL after `/folder/`

### `file`
File in local repository or pipeline to upload.

## Optional Inputs

### `destination-filename`
Destination filename in Box. If not specified, the file will be named after the source file.