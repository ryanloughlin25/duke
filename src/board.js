(function(angular) {

  function BoardService($http) {
    var bs = this;
    this.size = 6;
    this.selectedPiece;
    this.allMoves;
    this.pieces = {
      '2,2': piece('footman', 'white')
    };

    $http.get('./moves.json').then(function(response) {
      bs.allMoves = response.data;
    });

    this.getPieces = function() {
      var pieces = [];
      for (loc in bs.pieces) {
        var piece = bs.pieces[loc];
        pieces.push({
          row: loc.split(',')[0],
          column: loc.split(',')[1],
          piece: {
            selected: bs.selectedPiece === piece,
            rank: piece.rank,
            color: piece.color,
            side: piece.side
          }
        });
      }
      return pieces;
    };

    this.select = function(row, column) {
      var loc = row + ',' + column;
      bs.selectedPiece = bs.pieces[loc];
    };

    function piece(rank, color, side) {
      return {
        rank: rank,
        color: color,
        side: side || 'front',
      };
    }
  }

  function BoardController(boardService) {
    var bc = this;
    this.board;
    updateBoard();
    this.select = function(row, column) {
      boardService.select(row, column);
      updateBoard();
    };

    function updateBoard() {
      var size = boardService.size;
      bc.board = Array(size).fill(null).map(function() {
        return Array(size).fill(null);
      });

      var pieces = boardService.getPieces();
      for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];
        bc.board[piece.row][piece.column] = piece.piece;
      }
    };
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
