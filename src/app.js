(function(angular) {
  var MyListService = function() {
    this.stuffs = [
      'foo',
      'bar',
      'frobnicate',
      'bizbaz'
    ];

    this.getStuffs = function() {
      return this.stuffs;
    }
  };

  var MyListController = function(myListService) {
    this.filter = '';
    this.stuffs = myListService.getStuffs();
  };

  var myList = function() {
    return {
      restrict: 'E',
      templateUrl: 'my-list.html',
      controller: MyListController,
      controllerAs: 'mlc'
    };
  };

  angular.module('app', [])
    .directive('myList', myList)
    .service('myListService', MyListService);
})(window.angular);
