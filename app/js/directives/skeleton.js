skeleton = angular.module('skeleton',[]);

skeleton.directive('container',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="container" ng-transclude></div>',
		link: function(scope, element, attrs){
			if(attrs.marginTop !== undefined){
        element.children().css({
					'margin-top': attrs.marginTop + 'px',
				});
      }
			if(attrs.marginRight !== undefined){
				element.children().css({
					'margin-right': attrs.marginRight + 'px',
				});
			}
			if(attrs.marginBottom !== undefined){
				element.children().css({
					'margin-bottom': attrs.marginBottom + 'px',
				});
			}
			if(attrs.marginLeft !== undefined){
				element.children().css({
					'margin-left': attrs.marginLeft + 'px',
				});
			}
			if(attrs.paddingTop !== undefined){
        element.children().css({
					'padding-top': attrs.paddingTop + 'px',
				});
      }
			if(attrs.paddingRight !== undefined){
				element.children().css({
					'padding-right': attrs.paddingRight + 'px',
				});
			}
			if(attrs.paddingBottom !== undefined){
				element.children().css({
					'padding-bottom': attrs.paddingBottom + 'px',
				});
			}
			if(attrs.paddingLeft !== undefined){
				element.children().css({
					'padding-left': attrs.paddingLeft + 'px',
				});
			}
		}
	}
});

skeleton.directive('oneColumn',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="one column" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('twoColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="two columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('threeColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="three columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('fourColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="four columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('fiveColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="five columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('sixColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="six columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('sevenColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="seven columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('eightColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="eight columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('nineColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="nine columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('tenColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="ten columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('elevenColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="eleven columns" ng-transclude></div>',
    link: function(scope, element, attrs){
      if(attrs.offset !== undefined){
        element.children().addClass("offset-by-" + attrs.offset);
      }
    }
	}
});

skeleton.directive('twelveColumns',function(){
	return {
		restrict:'E',
		scope:false,
		transclude:true,
		template:'<div class="twelve columns" ng-transclude></div>',
    link: function(scope, element, attrs){

    }
	}
});
