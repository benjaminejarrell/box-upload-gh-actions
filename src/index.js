/**
 * The entrypoint for the action.
 */
const { run } = require('./main');
const core = require('@actions/core');

try{
	run();
} catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
}