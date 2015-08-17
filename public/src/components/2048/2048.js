angular.module('component.2048')
.directive('gg2048', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {},
    templateUrl: '/src/components/2048/2048.html',
    bindToController: true,
    controllerAs: 'game',
    controller: function($scope, Service2048) {
      var self = this;
      var gridSize = 4;
      self.grid = Service2048.generateGrid(gridSize);
      angular.element(window).on('keydown', function(event) {
        //window arrow keypress events
        var key = (event.keyCode || event.which);
        if(key > 36 && key < 41) {
          gameDriver(key);
        }
      });

      function restartGame() {
        
      }

      function gameDriver(key) {
        var oldGrid = self.grid;
        for(var i = 0; i < gridSize; i++) {
          self.grid = Service2048.updateGrid(self.grid, key);
          $scope.$apply();
        }
        if(Service2048.boardChanged(self.grid, oldGrid) && !Service2048.isGridLocked(self.grid)) {
          self.grid = Service2048.resetMergeable(Service2048.newTile(self.grid));
          $scope.$apply();
        }
        if(!Service2048.boardChanged(self.grid, oldGrid) && !Service2048.isGridLocked(self.grid)) {
          self.grid = Service2048.resetMergeable(self.grid);
          $scope.$apply();
        }
      }
    }
  };
});
