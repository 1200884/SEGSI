describe('Path object', () => {
  it('should have the correct warehousedeparture property', () => {
    const path = {
      warehousedeparture: 1,
      warehousedestination: 'Warehouse B',
      distance: 100
    };

    expect(path.warehousedeparture).to.equal(1);
  });
});