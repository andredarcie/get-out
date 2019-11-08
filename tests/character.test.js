import { Character } from '../js/entities/Character.js';

test('character should loose health', () => {
  let character = new Character('Ethan', 5, 'father', true, false, false);
  character.looseHealth(1);
  expect(character.health).toBe(4);
});