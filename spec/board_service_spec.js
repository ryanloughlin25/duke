describe('Board Service', function() {
  var boardService;
  var board;

  beforeEach(module('board'));
  beforeEach(inject(function(_boardService_) {
    boardService = _boardService_;
  }));

  it('can select a piece', function() {
    var piece = boardService.getPiece(0, 2);
    expect(piece.selected).toEqual(false);

    boardService.click(0, 2);
    expect(piece.selected).toEqual(true);

    boardService.click(0, 5);
    expect(piece.selected).toEqual(false);
  });

  it('can move a piece', function() {
    expect(boardService.getPiece(0, 2).rank).toEqual('duke');
    boardService.click(0, 2);
    boardService.click(5, 2);

    expect(boardService.getPiece(0, 2).rank).toEqual(undefined);
    expect(boardService.getPiece(5, 2).rank).toEqual('duke');
  });

  it('flips a piece on move', function() {
    expect(boardService.getPiece(0, 2).side).toEqual('front');
    boardService.click(0, 2);
    boardService.click(5, 2);

    expect(boardService.getPiece(0, 2).side).toEqual(undefined);
    expect(boardService.getPiece(5, 2).side).toEqual('back');
  });

  it('can end the turn', function() {
    expect(boardService.turn).toEqual('light');
    boardService.endTurn();
    expect(boardService.turn).toEqual('dark');
    boardService.endTurn();
    expect(boardService.turn).toEqual('light');
    boardService.endTurn();
    expect(boardService.turn).toEqual('dark');
  });

  it('can draw a piece from the bag', function() {
    expect(boardService.turn).toEqual('light');
    expect(boardService.getPiece(0, 0).color).toEqual(undefined);
    boardService.drawFromBag();
    expect(boardService.getPiece(0, 0).color).toEqual('light');
    boardService.drawFromBag();
    expect(boardService.getPiece(0, 3).color).toEqual('light');

    boardService.click(0, 0);
    boardService.click(5, 5);
    boardService.endTurn();

    expect(boardService.turn).toEqual('dark');
    expect(boardService.getPiece(0, 0).color).toEqual(undefined);
    boardService.drawFromBag();
    expect(boardService.getPiece(0, 0).color).toEqual('dark');
  });
});
