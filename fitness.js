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

// positive score based on how well it matches present elements. ignores rests
// if target is x--- and seq is xxxx xxxx xxxx xxxx, it will get full score
function evaluateSequencePositive(target, sequence) {
  let score = 0;
  for (let i = 0; i < sequence.phrase.length; i++) {
    score += (rewardSingleCorrectChomosome(target, sequence.phrase[i])/sequence.phrase.length)
  }
  return score;
}

// negative score based on how much it fails to match rests
// if target is x--- and seq is xxxx xxxx xxxx xxxx, it will get maximum (negative) score
function evaluateSequenceNegative(target, sequence) {
  let score = 0;
  for (let i = 0; i < sequence.phrase.length; i++) {
    score += punishSingleWrongChromosome(target, sequence.phrase[i])/sequence.phrase.length
  }
  return score;
}

function evaluateRolePositive(seq) {
  if (seq.type === 'lo') {
    return evaluateSequencePositive([true, false, false, false], seq);
  } else if (seq.type === 'mid') {
    return evaluateSequencePositive([false, false, true, false], seq);
  } else if (seq.type === 'hi') {
    return evaluateSequencePositive([false, true, true, true], seq);
  } else {
    return 0;
  }
}

function evaluateRoleNegative(seq) {
  if (seq.type === 'lo') {
    return evaluateSequenceNegative([true, false, false, false], seq);
  } else if (seq.type === 'mid') {
    return evaluateSequenceNegative([false, false, true, false], seq);
  } else if (seq.type === 'hi') {
    return evaluateSequenceNegative([false, true, true, true], seq);
  } else {
    return 0;
  }
}

module.exports  = { matchSingleChromosome,
                    rewardSingleCorrectChomosome,
                    punishSingleWrongChromosome,
                    evaluateSequencePositive,
                    evaluateSequenceNegative,
                    evaluateRolePositive,  // public
                    evaluateRoleNegative   // public
                  };
