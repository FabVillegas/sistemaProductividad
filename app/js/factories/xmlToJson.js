angular.module('productividadUsaria').factory('xmlToJson', ['$http',function($http){
   return {
       get: function(callback, xmlText){
         var x2js = new X2JS();
         var json = x2js.xml_str2json(xmlText);
         callback(json);
       }
   }
}]);
