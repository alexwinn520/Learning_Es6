import _ from 'lodash';

export default function($scope, todoFactory){
	let params = {
		createHasInput: false
	};

	todoFactory.getTasks($scope);

	$scope.onCompletedClick = todo => {
		todo.isCompleted = !todo.isCompleted; //switch from true to false / false to true
	};

	$scope.onEditClick = todo => {
		todo.isEditing = true;
		todo.updatedTask = todo.task;
	};

	$scope.onCancelClick = todo => {
		todo.isEditing = false;
	};

	const { createTask, updateTask, deleteTask, watchCreateTaskInput } = todoFactory; //everything in todoFactory made into variables

	$scope.createTask = createTask //pass in the createTask object with .bind()
		.bind(this, $scope, params); //could also use lodash method _.partial() to achieve same effect

	$scope.updateTask = updateTask
		.bind(this, $scope);

	$scope.deleteTask = deleteTask
		.bind(this, $scope); 
	
	$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
}