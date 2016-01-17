(function(angular) {

  function BoardService($http) {
    var bs = this;
    this.size = 6;
    this.selectedPiece = null;
    this.allMoves = null;
    this.pieces = {
      '2,2': piece('footman', 'white')
    };

    $http.get('./moves.json').then(function(response) {
      bs.allMoves = response.data;
      console.log(bs.allMoves);
    });

    this.getBoard = function() {
      var board = Array(bs.size).fill(null).map(function() {
        return Array(bs.size).fill(null).map(function() {
          return new Object();
        });
      });

      for (loc in this.pieces) {
        var foo = loc.split(',');
        var row = foo[0];
        var column = foo[1];
        board[row][column] = this.pieces[loc];
      }
      return board;
    };

    this.select = function(row, column) {
      var loc = row + ',' + column;
      bs.selectedPiece = bs.pieces[loc];
    };

    this.isSelected = function(row, column) {
      var loc = row + ',' + column;
      var piece = bs.pieces[loc];
      if (piece && bs.selectedPiece === piece) {
        return 'selected'
      }
    };

    function piece(rank, color, side) {
      return {
        'rank': rank,
        'color': color,
        'side': side || 'front',
      };
    }
  }

  function BoardController(boardService) {
    this.board = boardService.getBoard();
    this.select = boardService.select;
    this.isSelected = boardService.isSelected;
  }

  function board() {
    return {
      restrict: 'E',
      templateUrl: 'board.html',
      controller: BoardController,
      controllerAs: 'bc'
    }
  }

  angular.module('board', [])
    .directive('board', board)
    .service('boardService', BoardService);
})(window.angular);
