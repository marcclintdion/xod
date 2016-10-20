import { expect } from 'chai';

import path from 'path';
import * as Loader from '../src/load';
import { pack, numerateFolders, replaceFolderId } from 'xod-core';
import unpacked from './fixtures/unpacked.json';
import xodball from './fixtures/xodball.json';

const tempDir = './fixtures/workspace';

describe('Loader', () => {
  const workspace = path.resolve(__dirname, tempDir);
  const projectPath = 'awesome_project';

  it('should return an array of projects in workspace', (done) => {
    Loader.getProjects(workspace)
      .then(projects => {
        expect(projects).to.have.lengthOf(1);
        expect(projects).to.deep.equal([
          {
            meta: {
              name: 'Awesome project',
              author: 'Amperka team',
            },
            libs: ['xod/core'],
            path: path.resolve(workspace, projectPath),
          },
        ]);
        done();
      })
      .catch(done);
  });

  it('should load whole project data that ready to be passed into xod-core/pack', (done) => {
    Loader.loadProject(projectPath, workspace)
      .then(project => {
        expect(project).to.deep.include.members(unpacked);
        done();
      })
      .catch(done);
  });

  it('should load whole project, libs and pack it', (done) => {
    Loader.loadFullProject(projectPath, workspace)
      .then(({ project, libs }) => {
        const packed = pack(project, libs);

        // test like a last from xod-core/pack
        expect(packed.meta).to.deep.equal(xodball.meta);
        expect(replaceFolderId(packed.patches)).to.deep.equal(replaceFolderId(xodball.patches));
        expect(numerateFolders(packed.folders)).to.deep.equal(numerateFolders(xodball.folders));
        expect(packed.nodeTypes).to.deep.equal(xodball.nodeTypes);

        done();
      })
      .catch(done);
  });
});
