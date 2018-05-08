import { Common } from '../server/helpers/common';
import { BaseConnector as MockBaseConnector } from '../server/connectors/rest/__mocks__/base';

// Mocked base service
import { BaseConnector } from '../server/connectors/rest/base';
jest.mock('../server/connectors/rest/base');

test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});
