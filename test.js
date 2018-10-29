describe('opentok-token-cli', () => {
  const consoleSpy = jest.spyOn(console, 'info');
  const RealDate = Date;
  const mockDate = (isoDate) => {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(isoDate);
      }
    };
  };

  afterEach(() => {
    global.Date = RealDate;
  });

  it('should log token to console', () => {
    mockDate(1539093828);
    process.argv = process.argv.slice(0, 2).concat([
      '-a',
      '100',
      '-s',
      'TEST-SECRET',
    ]);
    require('./cmd.js');
    expect(consoleSpy.mock.calls[0][0]).toEqual('token: ');
    expect(consoleSpy.mock.calls[0][1]).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMDAiLCJpc3QiOiJwcm9qZWN0IiwiaWF0IjoxNTM5MDkzLCJleHAiOjQxMzEwOTN9.Is-IqaS8S9Wq2Ckf_3GeuIbLiMgLCqk0QdDA2TGStyc',
    );
  });
});
