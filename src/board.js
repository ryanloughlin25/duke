(function(angular) {

  function PieceService($http) {
    var ps = this;
    this.pieces = [
      piece(2, 2, 'footman', 'white')
    ];
    this.allMoves;

    $http.get('./moves.json').then(function(response) {
      ps.allMoves = response.data;
    });

    this.getPiece = function(row, column) {
      return ps.pieces.find(function(value) {
        return isPiece(row, column, value);
      });
    };

    this.select = function(row, column) {
      ps.pieces = ps.pieces.map(function(value) {
        value.piece.selected = isPiece(row, column, value);
        return value;
      });
    };

    function isPiece(row, column, piece) {
      return piece.row === row && piece.column === column;
    }

    function piece(row, column, rank, color, side) {
      return {
        row: row,
        column: column,
        piece: {
          rank: rank,
          color: color,
          side: side || 'front',
          selected: false
        }
      };
    }
  }

  function SetupService() {
    var ss = this;
    this.size = 6;
  }

  function BoardService(pieceService) {
    var bs = this;
    this.size = 6;
    this.board;
    updateBoard();

    this.select = function(row, column) {
      pieceService.select(row, column);
      updateBoard();
    };

    function updateBoard() {
      var size = bs.size;
      bs.board = Array(size).fill(null).map(function() {
        return Array(size).fill(null);
      });

      var pieces = pieceService.pieces;
      for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];
        bs.board[piece.row][piece.column] = piece.piece;
      }
    };
  }

  function BoardController(setupService, boardService) {
    var bc = this;
    this.board = boardService.board;
    this.select = boardService.select;
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
    .service('pieceService', PieceService)
    .service('boardService', BoardService)
    .service('setupService', SetupService);
})(window.angular);
