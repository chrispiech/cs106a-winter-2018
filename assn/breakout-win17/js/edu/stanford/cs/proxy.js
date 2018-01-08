/*
 * File: proxy.js
 * --------------
 * This file implements the proxy package, which provides an implementation
 * for "lazy" interfaces, which are checked at runtime.
 */

define([], function() {

/* ProxyTarget.js */

var ProxyTarget = function() {
   /* Empty */
};

ProxyTarget.create = function(target, interfaceName) {
   return target;
};

/* Exports */

return {
   ProxyTarget : ProxyTarget
};

});
