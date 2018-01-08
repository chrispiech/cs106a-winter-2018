/*
 * File: require.js
 * ----------------
 * This is a stub version of require.js that implements the define
 * mechanics without a browser.
 */

var moduleTable = { };

function define(a1, a2) {
   var dependencies = [ ];
   var value;
   if (a1 instanceof Array) {
      dependencies = a1;
      value = a2;
   } else {
      value = a1;
   }
   if (typeof(value) !== "function") return value;
   var args = [ ];
   for (var i in dependencies) {
      var name = dependencies[i];
      var module = moduleTable[name];
      if (!module) {
         module = eval(read("js/" + name + ".js"));
         moduleTable[name] = module;
      }
      args.push(module);
   }
   return value.apply(null, args);
}

function require(a1, a2) {
   define(a1, a2);
}
