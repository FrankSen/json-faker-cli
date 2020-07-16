const _ = require('lodash');
const jsonfile = require('jsonfile');
const faker = require('json-schema-faker');
const Chance = require('chance');

// eslint-disable-next-line global-require
faker.extend('faker', () => require('faker'));
// eslint-disable-next-line global-require
faker.extend('chance', () => new Chance());

function generate(inputPath, outputPath, itemsLength) {
  const inputObject = jsonfile.readFileSync(inputPath);
  const output = itemsLength === undefined
    ? faker.generate(inputObject)
    : _.times(itemsLength, () => faker.generate(inputObject));
  jsonfile.writeFileSync(outputPath, output);
}

module.exports = generate;
