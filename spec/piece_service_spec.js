describe('Piece Service', function() {
  var pieceService;
  var piece;

  beforeEach(module('board'));
  beforeEach(inject(function(_pieceService_) {
    pieceService = _pieceService_;
  }));

  describe('get piece', function() {
    it('can return a piece in a location', function() {
      var piece = pieceService.getPiece(2, 2).piece;
      expect(piece.rank).toEqual('footman');
    });

    it('returns undefined if there is no piece in a location', function() {
      expect(pieceService.getPiece(-1, -1)).toEqual(undefined);
    });
  });

  describe('select', function() {
    it('can select and unselect a piece', function() {
      var piece = pieceService.getPiece(2, 2).piece;
      expect(piece.selected).toEqual(false);

      pieceService.select(2, 2);
      expect(piece.selected).toEqual(true);

      pieceService.select(3, 3);
      expect(piece.selected).toEqual(false);
    });
  });
});
