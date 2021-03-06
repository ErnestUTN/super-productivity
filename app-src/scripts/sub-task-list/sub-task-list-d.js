/**
 /**
 * @ngdoc directive
 * @name superProductivity.directive:subTaskList
 * @description
 * # subTaskList
 */

(function () {
  'use strict';

  angular
    .module('superProductivity')
    .directive('subTaskList', subTaskList);

  /* @ngInject */
  function subTaskList() {
    return {
      templateUrl: 'scripts/sub-task-list/sub-task-list-d.html',
      bindToController: true,
      controller: SubTaskListCtrl,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        task: '=',
        currentTaskId: '<',
        allowTaskSelection: '@'
      }
    };
  }

  /* @ngInject */
  function SubTaskListCtrl($scope, Tasks, TasksUtil) {
    let vm = this;

    $scope.$watch('vm.task.subTasks', (tasks) => {
      if (angular.isArray(tasks)) {
        vm.task.timeEstimate = TasksUtil.calcTotalEstimate(tasks);
        vm.task.timeSpent = TasksUtil.calcTotalTimeSpent(tasks);
        vm.task.timeSpentOnDay = TasksUtil.mergeTotalTimeSpentOnDayFrom(tasks);
      }
    }, true);

    $scope.$on('$destroy', () => {
      // re-init original values (e.g. when sub task was clicked accidentally
      if (!vm.task.subTasks || vm.task.subTasks.length === 0) {
        vm.task.timeEstimate = vm.task.mainTaskTimeEstimate;
        vm.task.timeSpent = vm.task.mainTaskTimeSpent;
        vm.task.timeSpentOnDay = vm.task.mainTaskTimeSpentOnDay;
      }
    });
  }

})();
