(async ()=>{ /* init */
	if (window._libx_angular_boot != null) return;

	window.global=window;
	window.app = {};
	window.prerenderReady = false;

	angular.module('templates', []);
	app = angular.module('myApp', ['infra.angular', 'ngAnimate', 'ngMaterial', 'ngCookies', 'ngResource', 'ngRoute', 'templates']);
	// angular-google-analytics

	app.api = {};
	app.layout = {};
	app.name = "meduza";
	app.desc = "Meduza Protocol";
	app.titlePrefix = "Meduza";
	app.isDarkMode = true;

	app.layout.title = 'my title';
	app.getTitle = ()=> 'asd';

	app.run( ($rootScope, utils, $window) => {
		console.log('app.run')

		infra.browser.require('resources/components/my-loader/controller.js')
		infra.browser.require('resources/scripts/lib/ng-inline-edit.js')
		
	});

	app.controller('layoutEx', ($scope, $sce, $compile, $templateCache, $templateRequest, $rootScope, $timeout, $mdSidenav, $location, $cookies) => {
		infra.log.verbose('layoutEx');
		return;

		$scope.layout = app.layout;
		// app.layout.title = 'my title 2';
	});

})();
