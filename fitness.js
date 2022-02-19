const {LoPat, MidPat, HiPat} = require('./pattern-types.js');

function matchSingleChromosome(target, subject) {
  let score = 0;
  for (let i = 0; i < target.length; i++) {
    score += target[i] == subject[i] ? 0.25 : 0;
  }
  return score;
}

function rewardSingleCorrectChomosome(target, subject) {
  let score = 0;
  let numHits = target.reduce((prev, cur) => prev += cur ? 1 : 0,0);
  for (let i = 0; i < target.length; i++) {
    if (target[i] && target[i] == subject[i]) {
      score += 1/numHits;
    }
  }
  return score;
}

function punishSingleWrongChromosome(target, subject) {
  let score = 0;
  let numHits = target.reduce((prev, cur) => prev += !cur ? 1 : 0,0);
  for (let i = 0; i < target.length; i++) {
    if (!target[i] && target[i] != subject[i]) {
      score -= (1/numHits);
    }
  }
  return score;
}

function evaluateSequencePositive(target, sequence) {
  let score = 0;
  for (let i = 0; i < sequence.phrase.length; i++) {
    score += (rewardSingleCorrectChomosome(target, sequence.phrase[i])/sequence.phrase.length)
  }
  return score;
}

function evaluateSequenceNegative(target, sequence) {
  let score = 0;
  for (let i = 0; i < sequence.phrase.length; i++) {
    score += punishSingleWrongChromosome(target, sequence.phrase[i])/sequence.phrase.length
  }
  return score;
}

module.exports  = { matchSingleChromosome,
                    rewardSingleCorrectChomosome, punishSingleWrongChromosome, evaluateSequencePositive, evaluateSequenceNegative };
