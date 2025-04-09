import TAGS from '../../utils/constants/tags';

describe('template spec', { tags: TAGS.LOGIN }, () => {
  it('passes', () => {
    cy.login('hello', 'world');
  });
});
