import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

	.factory('todoFactory', ($http) => {
		function getTasks($scope){
			$http.get('/todos').success(response => {
				$scope.todos = response.todos;
			});
		}

		function createTask($scope, params){ //when createTask is hit
			if (!$scope.createTaskInput) { //if no input, return
				return;
			}

			$http.post('/todos', {
				task: $scope.createTaskInput,
				isCompleted: false,
				isEditing: false
			}).success(response => {
				getTasks($scope);
				$scope.createTaskInput = '';//clear the input field
			});
		}

		function updateTask($scope, todo){
			console.log(todo);
			$http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(response => {
				getTasks($scope);
				todo.isEditing = false;
			});
			// todo.task = todo.updatedTask;
			// todo.isEditing = false;
		}

		function deleteTask($scope, todoToDelete){
			$http.delete(`/todos/${todoToDelete._id}`).success(response => {
				getTasks($scope);
			});

			//use lodash method remove() to remove the todo from the array that matches todoToDelete (todo clicked to delete)
			// _.remove($scope.todos, todo => todo.task === todoToDelete.task); 
		}

		function watchCreateTaskInput(params, $scope, val){
			const createHasInput = params.createHasInput;

			if (!val && createHasInput) { //if no value in task input
				$scope.todos.pop();	//remove last item from todos array so there is not an empty todo in table
				params.createHasInput = false //reset the value of input field
			} else if (val && !createHasInput) { //if there is a value, and createHasInput = false
				$scope.todos.push({task: val, isCompleted: false}); //push value from createHasInput to todos array
				params.createHasInput = true; //then reset value to true
			} else if (val && createHasInput) {//if there is a value, and createHasInput = true
				$scope.todos[$scope.todos.length-1].task = val; //make task = value from the textbox
			}
		}

		return {
			getTasks,
			createTask,
			updateTask,
			deleteTask,
			watchCreateTaskInput
		};
	});

export default todoFactory;