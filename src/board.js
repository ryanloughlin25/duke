(function(angular) {

  function BoardService($http) {
    var bs = this;
    this.size = 6;
    this.row;
    this.column;
    this.allMoves;
    this.board;
    this.turn;
    this.bags;

    this.bagPieces = {
      footman: 1,
      pikeman: 3,
      knight: 1,
      wizard: 1,
      ranger: 1,
      seer: 1,
      general: 1,
      priest: 1,
      champion: 1,
      marshall: 1,
      bowman: 1,
      dragoon: 1,
      assassin: 1,
      longbowman: 1
    };
    reset();

    $http.get('./moves.json').then(function(response) {
      bs.allMoves = response.data;
    });

    this.getTurn = function() {
      return bs.turn;
    };

    this.getPiece = function(row, column) {
      if (typeof row === 'number' && typeof column === 'number' &&
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
      if (typeof bs.row === 'number' && typeof bs.column === 'number') {
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

    this.drawFromBag = function() {
      var bag = bs.bags[bs.turn];
      var index = Math.floor(Math.random() * bag.length);
      var rank = bag.splice(index, 1)[0];
      for (var i = 0; i < bs.board.length; i++) {
        for (var j = 0; j < bs.board[i].length; j++) {
          if (!bs.board[i][j].rank) {
            bs.board[i][j] = piece(rank, bs.turn);
            return;
          }
        }
      }
    };

    this.endTurn = function() {
      bs.turn = bs.turn === 'light' ? 'dark' : 'light';
    };

    function piece(rank, color, side) {
      return {
        rank: rank,
        color: color,
        side: side || 'front',
        selected: false
      };
    }

    function resetBoard() {
      bs.board = Array(bs.size).fill(null).map(function() {
        return Array(bs.size).fill(null).map(function() {
          return new Object();
        });
      });
      bs.board[0][2] = piece('duke', 'light');
      bs.board[0][1] = piece('footman', 'light');
      bs.board[1][2] = piece('footman', 'light');
      bs.board[5][2] = piece('duke', 'dark');
      bs.board[5][1] = piece('footman', 'dark');
      bs.board[4][2] = piece('footman', 'dark');
    }

    function createBag() {
      var bag = [];
      angular.forEach(bs.bagPieces, function(count, rank) {
        for (var i = 0; i < count; i++) {
          bag.push(rank);
        }
      });
      return bag;
    }

    function reset() {
      resetBoard();
      bs.turn = 'light';
      bs.bags = {
        light: createBag(),
        dark: createBag()
      };
    }
  }

  function BoardController(boardService) {
    var bc = this;
    this.board = boardService.board;
    this.click = boardService.click;
    this.drawFromBag = boardService.drawFromBag;
    this.getTurn = boardService.getTurn;
    this.endTurn = boardService.endTurn;
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
