import { getEngines } from '../../../src/depngn/getEngines';
import path from 'path';

const npmDir = 'tests/depngn/getEngines/npm';
const yarnDir = 'tests/depngn/getEngines/yarn';
const lockfileVersion1 = `${npmDir}/lockfileVersion1`;
const lockfileVersion2 = `${npmDir}/lockfileVersion2`;

const originalCwd = process.cwd();

describe('getEngines', () => {
  afterAll(() => {
    process.chdir(path.resolve(originalCwd));
  });

  describe('reads from package-lock.json when package manager is npm', () => {
    it('and lockfileVersion is 1', async () => {
      process.chdir(path.resolve(originalCwd, lockfileVersion1));
      const output = await getEngines();
      expect(output).toStrictEqual([{ package: 'test-package-1', range: '1.0.0' }]);
    });

    it('and lockfileVersion is 2', async () => {
      process.chdir(path.resolve(originalCwd, lockfileVersion2));
      const output = await getEngines();
      expect(output).toStrictEqual([{ package: 'test-package-1', range: '1.0.0' }]);
    });
  });

  it('reads from node_modules when package manager is yarn', async () => {
    process.chdir(path.resolve(originalCwd, yarnDir));
    const output = await getEngines();
    expect(output).toStrictEqual([{ package: 'test-package-2', range: '1.0.0' }]);
  });
});
