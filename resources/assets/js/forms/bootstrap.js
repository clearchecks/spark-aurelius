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
 * Add additional HTTP / form helpers to the Spark object.
 */
$.extend(Spark, http);
