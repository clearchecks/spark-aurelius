import http from './http.js';

/**
 * Initialize the Spark form extension points.
 */
Spark.forms = {
    register: {},
    updateContactInformation: {},
    updateTeamMember: {}
};


/**
 * Load the SparkForm helper class.
 */
import('./form.js');

/**
 * Define the SparkFormError collection class.
 */
import('./errors.js');

/**
 * Add additional HTTP / form helpers to the Spark object.
 */
$.extend(Spark, http);
