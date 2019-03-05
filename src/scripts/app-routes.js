'use strict';

(async ()=>{ /* init */
	if (window._libx_angular_boot != null) return;

	app.config(($routeProvider, $sceDelegateProvider, $locationProvider) => {
		infra.log.verbose('init routes');

		$routeProvider.
			when('/', { templateUrl: '/views/main.html' }). // , reloadOnSearch:false // template: '<div>main</div>'}). //
			when('/test', { templateUrl: '/views/test.html' }).
			when('/sys/_css', { templateUrl: '/views/sys/_css.html' }).
			when('/sys/_theme', { templateUrl: '/views/sys/_theme.html' }).
			when('/sys/_icons', { templateUrl: '/views/sys/_icons.html' }).
			otherwise({ templateUrl: '/views/404.html' }); // template: '<div>404 - Not Found</div>' }); 

		app.isHtml5Mode = true; //false;

		$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('.*')]);
		$locationProvider.hashPrefix('!');
		$locationProvider.html5Mode({
			enabled: app.isHtml5Mode,
			requireBase: true
		});
		$sceDelegateProvider.resourceUrlWhitelist([
			'self', // Allow same origin resource loads.
			window.location.href + '/**' // Allow loading from our assets domain.  Notice the difference between * and **.
		]);

	});


})();
