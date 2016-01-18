describe('Board Service', function() {
  var boardService;
  var board;

  beforeEach(module('board'));
  beforeEach(inject(function(_boardService_) {
    boardService = _boardService_;
  }));

  it('can select a piece', function() {
    var piece = boardService.getPiece(2, 2);
    expect(piece.selected).toEqual(false);

    boardService.click(2, 2);
    expect(piece.selected).toEqual(true);
  });

  it('can move a piece', function() {
    var piece = boardService.getPiece(2, 2);
    boardService.click(2, 2);
    boardService.click(4, 4);

    expect(boardService.getPiece(2, 2).rank).toEqual(undefined);
    expect(boardService.getPiece(4, 4).rank).toEqual('footman');
  });
});
