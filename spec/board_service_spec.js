describe('Board Service', function() {
  var boardService;
  var board;

  beforeEach(module('board'));
  beforeEach(inject(function(_boardService_) {
    boardService = _boardService_;
    board = boardService.board;
  }));

  it('can select and unselect a piece', function() {
    expect(board[2][2].selected).toEqual(false);

    boardService.select(2, 2);
    expect(board[2][2].selected).toEqual(true);

    boardService.select(3, 3);
    expect(board[2][2].selected).toEqual(false);
  });
});
