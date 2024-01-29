# Box Upload Github Action

A Github action for uploading files or build artifacts to Box

**IMPORTANT** You must run `ncc build` before tagging a release.

## Build
1. `npm i -g @vercel/ncc #Install NCC`
2. `ncc build src/index.js`

## Example
```yaml
- name: Upload cat pic to Box
  uses: 
  id: BoxUpload
  with:
    box-client-sdk-config: ${{ secrets.BOX_CLIENT_SDK_CONFIG }}
    box-folder-id: 1234
    file: cat.png
```
## Inputs

### `box-client-sdk-config`
JSON formatted output from Box developer console. Example:

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
Box folder ID for the destination. Can be found in the URL.

### `file`
File in local repository or pipeline to upload.

## Optional Inputs

### `destination-filename`
Destination filename in Box. If not specified, the file will be named after the source file.