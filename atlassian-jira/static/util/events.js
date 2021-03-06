/**
 * Utility functions for document-level event binding and handling.
 * @module jira/util/events
 * @see module:jira/util/events/reasons
 * @see module:jira/util/events/types
 */
define('jira/util/events', ['jquery', 'exports'], function (jQuery, exports) {
    'use strict';

    var ctx = jQuery(document);

    /**
     * Subscribes to events
     *
     * @param types
     * @param data
     * @param fn
     */
    exports.bind = function (types, data, fn) {
        ctx.bind(types, data, fn);
    };

    /**
     * Bind to an event once
     *
     * @param evt
     * @param handler
     */
    exports.one = function (evt, handler) {
        ctx.one(evt, handler);
    };

    /**
     * Unbind an event
     *
     * @param evt
     * @param handler
     */
    exports.unbind = function (evt, handler) {
        ctx.unbind(evt, handler);
    };

    /**
     * Publishes events
     *
     * @param evt
     * @param args
     */
    exports.trigger = function (evt, args) {
        ctx.trigger(evt, args);
    };
});