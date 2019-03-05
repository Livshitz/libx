var componentName = infra.browser.angular.tryGetComponentName(__moduleUri); // <------ Edit this or let __moduleUri (injected by `infra.browser.require`)
var componentTemplate = 'resources/components/' + componentName.kebabCase() + '/template.html'; 

infra.browser.angular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		templateUrl: componentTemplate
	};
});
