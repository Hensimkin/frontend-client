import { expect } from 'chai';

describe('arrays', () => {
  describe('#sort', () => {
    it('sorting names array', () => {
      const names = ['adam', 'hen'];
      expect(names.sort((a, b) => b.localeCompare(a))).to.be.eql(['hen', 'adam']);
    });
  });
});
