import { Enemy } from '../entities/Enemy';
import { Difficulties } from '../enums/Difficulties';

export enum EnemyTypes {
    WildAnimal,
    Human,
    Supernatural
}

export class EnemySeeds {
    public static enemies: Enemy[] = [
        // Wild Animals
        new Enemy('Angry dog', EnemyTypes.WildAnimal, Difficulties.CHALLENGING, Difficulties.VERY_HARD, 3, 'https://pixabay.com/photos/dog-angry-aggressive-white-black-5287546/'),
        new Enemy('Wild dog', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.CHALLENGING, 3, 'https://pixabay.com/photos/dog-angry-rage-violent-furious-486550/'),
        new Enemy('Hungry wild wolf', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1, 'https://pixabay.com/photos/wolf-predator-hunter-canis-lupus-635063/'),
        new Enemy('Swarm of bees', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.CHALLENGING, 1, 'https://pixabay.com/photos/bees-insects-macro-honey-bees-276190/'),
        new Enemy('Cloud of insects', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 1),
        new Enemy('Hungry fox', EnemyTypes.WildAnimal, Difficulties.CHALLENGING, Difficulties.MEDIUM, 1),
        new Enemy('Brown bear', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.VERY_HARD, 1),
        new Enemy('Amur tiger', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://pixabay.com/photos/tiger-animal-roar-fangs-angry-5946115/'),
        new Enemy('Grey wolf', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1),
        new Enemy('White bear', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1),
        new Enemy('Wild boar', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 1),
        new Enemy('Northern viper', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 1),
        new Enemy('Eurasian Lynx', EnemyTypes.WildAnimal, Difficulties.CHALLENGING, Difficulties.MEDIUM, 1),
        new Enemy('Deer', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 3),
        new Enemy('Siberian Tiger', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1),
        new Enemy('Wild Boar', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.MEDIUM, 3),
        new Enemy('Deformed rats', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 3),
        new Enemy('Flock of crows', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.EASY, 2),
        new Enemy('Locust cloud', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.TRIVIAL, 2),
        new Enemy('Swarm of flies', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 2),
        new Enemy('Pigs with worms in the body', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1),
        // Humans
        new Enemy('Sick human', EnemyTypes.Human, Difficulties.MEDIUM, Difficulties.EASY, 3),
        new Enemy('Thief with ax', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1),
        new Enemy('Militia hunter', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.CHALLENGING, 1),
        new Enemy('Man crawling with a knife', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.MEDIUM, 1),
        new Enemy('Two militia hunters', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1),
        // Supernatural
        new Enemy('Dark figure', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.TRIVIAL, 2),
        new Enemy('Woman with two faces', EnemyTypes.Supernatural, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1),
        new Enemy('Eyeless creature', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 1),
        new Enemy('Anomaly', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 3),
        new Enemy('Ghost', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.EASY, 4),
    ];

    public static getOneRandomEnemy(): Enemy {
        // TODO
        return EnemySeeds.enemies[EnemySeeds.getRandomArbitrary(0, EnemySeeds.enemies.length)];
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}