define("jira/util/navigator",["internal/util/navigator","jira/util/data/meta","jquery"],function(e,r,i){"use strict";var t=i.extend({},e);return t.isOpera=function(){return!0===i.browser.opera},t.modifierKey=function(){return r.get("keyboard-accesskey-modifier")},t});