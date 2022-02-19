const { matchSingleChromosome,
                    rewardSingleCorrectChomosome,
                    punishSingleWrongChromosome, evaluateSequencePositive, evaluateSequenceNegative} = require('./fitness.js');
const {LoPat, MidPat, HiPat} = require('./pattern-types.js');

test('all match returns 1', () => {
  const score = matchSingleChromosome([true, true, true, true],[true, true, true, true] );
  expect(score).toBe(1);
})

test('no match returns 0', () => {
  const score = matchSingleChromosome([false, false, false, false],[true, true, true, true] );
  expect(score).toBe(0);
})

test('reward single has rewards correct', () => {
  const score = rewardSingleCorrectChomosome([1,0,0,0], [1,0,0,0])
  expect(score).toBe(1);
})

test('reward single has rewards correct for multiple targets', () => {
  const score = rewardSingleCorrectChomosome([1,1,0,0], [1,1,0,0])
  expect(score).toBe(1);
})

test('reward single has rewards correct for multiple targets', () => {
  const score = rewardSingleCorrectChomosome([1,1,0,0], [1,0,0,0])
  expect(score).toBe(0.5);
})

test('reward single has rewards correct:2', () => {
  const score = rewardSingleCorrectChomosome([1,0,0,0], [0,0,0,0])
  expect(score).toBe(0);
})

test('reward single doesnt punish errors', () => {
  const score = rewardSingleCorrectChomosome([1,0,0,0], [1,1,1,1])
  expect(score).toBe(1);
})

test('punish single has punishment correct', () => {
  const score = punishSingleWrongChromosome([0,0,0,0], [1,0,0,0])
  expect(score).toBe(-0.25);
})

test('punish single ignores correct', () => {
  const score = punishSingleWrongChromosome([1,1,0,0], [0,0,0,0])
  expect(score).toBe(0);
})

test('punish single score correct partial', () => {
  const score = punishSingleWrongChromosome([0,1,0,1], [1,1,0,1])
  expect(score).toBe(-0.5);
})

test('lo match positive', () => {
  const score = rewardSingleCorrectChomosome([1,0,0,0], [1,0,0,0])
  expect(score).toBe(1);
})

test('lo match negative', () => {
  const score = punishSingleWrongChromosome([1,0,0,0], [1,0,0,0])
  expect(score).toBe(0);
})

test('hi match positive', () => {
  const score = rewardSingleCorrectChomosome([0,1,1,1], [0,1,1,1])
  expect(score).toBe(1);
})

test('hi match negative', () => {
  const score = punishSingleWrongChromosome([0,1,1,1], [0,1,1,1])
  expect(score).toBe(0);
})

test('evaluate sequence: positive', () => {
  const p = new LoPat();
  p.setPhrase('xxxx,xxxx,xxxx,xxxx');
  const score = evaluateSequencePositive([true,false,false,false], p)
  expect(score).toBe(1);
})

test('evaluate sequence: negative', () => {
  const p = new LoPat();
  p.setPhrase('---- ---- ---- ----');
  const score = evaluateSequenceNegative([0,1,1,1], p)
  expect(score).toBe(0);
})
