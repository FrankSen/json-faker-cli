const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const { expect } = require('chai');
const { execSync } = require('child_process');

const outputPath = path.resolve(__dirname, '../data/example.json');

describe('cmd', () => {
  beforeEach('remove output file', () => {
    try {
      fs.unlink(outputPath, () => {});
    } catch (error) {
      if (!/no such file or directory/.test(error.message)) {
        throw error;
      }
    }
  });

  it('generates JSON', () => {
    // eslint-disable-next-line max-len
    execSync(`${path.resolve(__dirname, '../../../cmd.js')} ${path.resolve(__dirname, '../data/schema.json')} ${outputPath}`);
    const outputObject = jsonfile.readFileSync(outputPath);

    expect(outputObject).to.be.an('object');
  });

  it('generates all required fields', () => {
    // eslint-disable-next-line max-len
    execSync(`${path.resolve(__dirname, '../../../cmd.js')} ${path.resolve(__dirname, '../data/schema.json')} ${outputPath}`);
    const outputObject = jsonfile.readFileSync(outputPath);

    expect(outputObject).to.have.all.keys('key1', 'key2');
  });

  it('generates multiple rows when itemsLength is specified', () => {
    const itemsLength = 30;
    // eslint-disable-next-line max-len
    execSync(`${path.resolve(__dirname, '../../../cmd.js')} ${path.resolve(__dirname, '../data/schema.json')} ${outputPath} ${itemsLength}`);
    const outputArray = jsonfile.readFileSync(outputPath);

    expect(outputArray).to.be.an('array');
    expect(outputArray).to.have.length(itemsLength);
    outputArray.map(object => expect(object).to.have.all.keys('key1', 'key2'));
  });
  it('make json-schema-faker-0.5 to add chance and fake', () => {
    const itemLength = 29;
    // eslint-disable-next-line max-len
    execSync(`${path.resolve(__dirname, '../../../cmd.js')} ${path.resolve(__dirname, '../data/schema_utc.json')} ${outputPath} ${itemLength}`);
  });
  // eslint-disable-next-line func-names
  it('make json-schema-faker-0.5 to inner reference', function (done) {
    this.timeout(5000);
    const itemLength = 40;
    // eslint-disable-next-line max-len
    execSync(`${path.resolve(__dirname, '../../../cmd.js')} ${path.resolve(__dirname, '../data/innerReference.json')} ${outputPath} ${itemLength}`);
    done();
  });
  // eslint-disable-next-line mocha/no-identical-title,func-names
  it('make json-schema-faker-0.5 to faker json', function (done) {
    this.timeout(5000);
    const itemLength = 29;
    // eslint-disable-next-line max-len
    execSync(`${path.resolve(__dirname, '../../../cmd.js')} ${path.resolve(__dirname, '../data/faker-arry.json')} ${outputPath} ${itemLength}`);
    done();
  });
});
