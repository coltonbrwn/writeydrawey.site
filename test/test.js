var assert = require('assert')

var createCardStacks = require('../lib/create-card-stacks')
var gameStateDone = require('./data/game-state-done.json')
var cardStacks = require('./data/card-stacks.json')


describe('createCardStacks', function() {
  it('should produce the correct card stack given game state', function() {
    assert.deepEqual(cardStacks, createCardStacks(gameStateDone))
  });
});
