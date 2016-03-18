import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoFactory from 'factories/todo-factory';
import todosCtrl from 'todos/todos';

const app = angular.module('app', [uiRouter, todoFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('todos', {
		url: '/',
		template: require('todos/todos.html'),
		controller: todosCtrl
	})
	.state('about', {
		url: '/about',
		template: require('about/about.html')
	})

	$locationProvider.html5Mode(true); //makes the # in url go away
});

export default app;