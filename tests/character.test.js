import { Character } from '../js/entities/Character.js';

test('Character should loose 1 health point', () => {
  let character = new Character('Ethan', 5, 'father', true, false, false);
  character.looseHealth(1);
  expect(character.health).toBe(4);
});

test('Throw error when health to loose value is invalid', () => {
  let character = new Character('Ethan', 5, 'father', true, false, false);
  expect(() => {
    character.looseHealth(-1);
  }).toThrow(new Error('Invalid value for healthToLoose'));
});

test('Character should die when loose all health', () => {
  let character = new Character('Ethan', 5, 'father', true, false, false);
  character.looseHealth(character.maxHealth);
  expect(character.isDead).toBe(true);
});