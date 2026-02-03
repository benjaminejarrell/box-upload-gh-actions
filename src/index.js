/**
 * The entrypoint for the action.
 */
import { run } from './main.js';
import { core } from '@actions/core';

try {
  run();
} catch (error) {
  // Fail the workflow run if an error occurs
  if (error instanceof Error) core.setFailed(error.message);
}