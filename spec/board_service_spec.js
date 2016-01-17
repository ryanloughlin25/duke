describe('Board Service', function() {
  var boardService;
  var board;

  beforeEach(module('board'));
  beforeEach(inject(function(_boardService_) {
    boardService = _boardService_;
  }));

  it('can select and unselect a piece', function() {
    expect(boardService.selectedPiece).toEqual(undefined);

    boardService.select(2, 2);
    expect(boardService.selectedPiece.rank).toEqual('footman');

    boardService.select(3, 3);
    expect(boardService.selectedPiece).toEqual(undefined);
  });
});
