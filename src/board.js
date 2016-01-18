(function(angular) {

  function BoardService($http) {
    var bs = this;
    this.size = 6;
    this.row;
    this.column;
    this.allMoves;
    this.board = Array(bs.size).fill(null).map(function() {
      return Array(bs.size).fill(null).map(function() {
        return new Object();
      });
    });
    this.board[2][2] = piece('footman', 'white');
    this.board[4][4] = piece('footman', 'black');

    $http.get('./moves.json').then(function(response) {
      bs.allMoves = response.data;
    });

    this.getPiece = function(row, column) {
      if (row && column &&
          row >= 0 && column >= 0 &&
          row < bs.size && column < bs.size) {
        return bs.board[row][column];
      } else {
        return null;
      }
    };

    this.click = function(row, column) {
      var piece = bs.getPiece(row, column);
      var selectedPiece = bs.getPiece(bs.row, bs.column);
      if (bs.row && bs.column) {
        selectedPiece.selected = false;
        bs.board[bs.row][bs.column] = new Object();
        bs.board[row][column] = selectedPiece;
        bs.row = null;
        bs.column = null;
      } else if (piece.rank) {
        bs.row = row;
        bs.column = column;
        piece.selected = true;
      } else {
        bs.row = null;
        bs.column = null;
      }
    };

    function piece(rank, color, side) {
      return {
        rank: rank,
        color: color,
        side: side || 'front',
        selected: false
      };
    }
  }

  function BoardController(boardService) {
    var bc = this;
    this.board = boardService.board;
    this.click = boardService.click;
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
