import { Character } from '../src/entities/Character';

let buildCharacter = () => new Character('Ethan', 
                                         5, 
                                         'father', 
                                         true, 
                                         0, 0, false, 0, 5);

test('Character should loose 1 health point', () => {
  let character = buildCharacter();
  character.looseHealth(1);
  expect(character.health).toBe(4);
});

test('Throw error when health to loose value is invalid', () => {
  let character = buildCharacter();
  expect(() => {
    character.looseHealth(-1);
  }).toThrow(new Error('Invalid value for healthToLoose'));
});

test('Character should die when loose all health', () => {
  let character = buildCharacter();
  character.looseHealth(character.maxHealth);
  expect(character.isDead).toBe(true);
});

test('Character should increase hungry by one', () => {
  let character = buildCharacter();
  character.increaseHungry();
  expect(character.health).toBe(1);
})