import Vue from 'vue';
import urijs from 'urijs';
import axios from 'axios';
import lodash from 'lodash';
import moment from 'moment';
import Promise from 'promise';
import Popper from 'popper.js';
import jQuery from 'jquery';
import mixin from './mixin.js';
import Dinero from 'dinero.js';
import SparkForm from './forms/form.js';
import http from './forms/http.js';

/*
 * Load various JavaScript modules that assist Spark.
 */
window.URI = urijs;
window.axios = axios;
window._ = lodash;
window.moment = moment;
window.Promise = Promise;
window.Popper = Popper;
window.__ = (key, replace) => {
    var translation = Spark.translations[key] ? Spark.translations[key] : key;

    _.forEach(replace, (value, key) => {
        translation = translation.replace(':'+key, value);
    });

    return translation;
};

/*
 * Define Moment locales
 */
window.moment.defineLocale('en-short', {
    parentLocale: 'en',
    relativeTime : {
        future: "in %s",
        past:   "%s",
        s:  "1s",
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        M:  "1 month ago",
        MM: "%d months ago",
        y:  "1y",
        yy: "%dy"
    }
});
window.moment.locale('en');

/*
 * Load jQuery and Bootstrap jQuery, used for front-end interaction.
 */
if (window.$ === undefined || window.jQuery === undefined) {
    window.$ = window.jQuery = jQuery;
}

/**
 * Load Vue if this application is using Vue as its framework.
 */
if ($('#spark-app').length > 0) {
    /*
    * Load Vue, the JavaScript framework used by Spark.
    */
    if (window.Vue === undefined) {
        window.Vue = Vue;

        window.Bus = new Vue();
    }

    /**
     * Load Vue Global Mixin.
     */
    Vue.mixin(mixin);

    /**
     * Format the given date.
     */
    Vue.filter('date', value => {
        return moment.utc(value).local().format('MMMM Do, YYYY')
    });

    /**
     * Format the given date as a timestamp.
     */
    Vue.filter('datetime', value => {
        return moment.utc(value).local().format('MMMM Do, YYYY h:mm A');
    });

    /**
     * Format the given date into a relative time.
     */
    Vue.filter('relative', value => {
        return moment.utc(value).local().locale('en-short').fromNow();
    });

    /**
     * Convert the first character to upper case.
     *
     * Source: https://github.com/vuejs/vue/blob/1.0/src/filters/index.js#L37
     */
    Vue.filter('capitalize', value => {
        if (!value && value !== 0) {
            return '';
        }

        return value.toString().charAt(0).toUpperCase()
            + value.slice(1);
    });

    /**
     * Format the given money value.
     */
    Vue.filter('currency', value => {
        return Dinero({
            amount: Math.round(value * 100),
            currency: window.Spark.currency
        }).setLocale(window.Spark.currencyLocale).toFormat('$0,0.00');
    });

    window.SparkForm = SparkForm;

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
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': Spark.csrfToken
};
