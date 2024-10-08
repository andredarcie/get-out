import { Enemy } from '../entities/Enemy';
import { Difficulties } from '../enums/Difficulties';

export enum EnemyTypes {
    WildAnimal,
    Human,
    Supernatural
}

export class EnemySeeds {
    public static enemies: Enemy[] = [
        // Wild Animals (Sci-Fi Enhanced)
        new Enemy('Radiated Bear', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.VERY_HARD, 1, 'https://example.com/images/radiated_bear.jpg'),
        new Enemy('Plasma Bees', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.CHALLENGING, 1, 'https://example.com/images/plasma_bees.jpg'),
        new Enemy('Swarm of Nano-Insects', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 1, 'https://example.com/images/nano_insects.jpg'),
        new Enemy('Bio-Enhanced Fox', EnemyTypes.WildAnimal, Difficulties.CHALLENGING, Difficulties.MEDIUM, 1, 'https://example.com/images/bio_fox.jpg'),
        new Enemy('Giant Mutant Bear', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.VERY_HARD, 1, 'https://example.com/images/giant_mutant_bear.jpg'),
        new Enemy('Xenomorphic Tiger', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/xenomorphic_tiger.jpg'),
        new Enemy('Spectral White Bear', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1, 'https://example.com/images/spectral_white_bear.jpg'),
        new Enemy('Mutant Boar', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 1, 'https://example.com/images/mutant_boar.jpg'),
        new Enemy('Venomous Northern Viper', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 1, 'https://example.com/images/venomous_viper.jpg'),
        new Enemy('Ethereal Lynx', EnemyTypes.WildAnimal, Difficulties.CHALLENGING, Difficulties.MEDIUM, 1, 'https://example.com/images/ethereal_lynx.jpg'),
        new Enemy('Radiated Deer', EnemyTypes.WildAnimal, Difficulties.MEDIUM, Difficulties.EASY, 3, 'https://example.com/images/radiated_deer.jpg'),
        new Enemy('Siberian Titan Tiger', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/siberian_titan_tiger.jpg'),
        new Enemy('Mega Wild Boar', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.MEDIUM, 3, 'https://example.com/images/mega_wild_boar.jpg'),
        new Enemy('Shadow Crows', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.EASY, 2, 'https://example.com/images/shadow_crows.jpg'),
        new Enemy('Locust Drone Swarm', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.TRIVIAL, 2, 'https://example.com/images/locust_swarm.jpg'),
        new Enemy('Swarm of Micro Flies', EnemyTypes.WildAnimal, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 2, 'https://example.com/images/micro_flies.jpg'),
        new Enemy('Infected Pigs', EnemyTypes.WildAnimal, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1, 'https://example.com/images/infected_pigs.jpg'),
    
        // Humans (Futuristic Military Forces)
        new Enemy('T-72 Super Tank', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/t72_super_tank.jpg'),
        new Enemy('Grad Artillery Launcher', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/grad_artillery.jpg'),
        new Enemy('Surveillance Drone X1', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.MEDIUM, 2, 'https://example.com/images/surveillance_drone_x1.jpg'),
    
        new Enemy('T-64 Advanced Tank', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/t64_advanced_tank.jpg'),
        new Enemy('Msta Artillery System', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/msta_artillery.jpg'),
        new Enemy('Attack Drone A2', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.MEDIUM, 2, 'https://example.com/images/attack_drone_a2.jpg'),
    
        // Military Equipment and Vehicles (Categorized as Human)
        new Enemy('BTR-80 Armored Personnel Carrier', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.MEDIUM, 1, 'https://example.com/images/btr80_apc.jpg'),
        new Enemy('Mi-8 Transport Helicopter', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/mi8_helicopter.jpg'),
        new Enemy('Buk Missile Launcher', EnemyTypes.Human, Difficulties.IMPOSSIBILE, Difficulties.VERY_HARD, 1, 'https://example.com/images/buk_missile_launcher.jpg'),
    
        // Supernatural (Sci-Fi Enhanced)
        new Enemy('Phantom Entity', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.TRIVIAL, 2, 'https://example.com/images/phantom_entity.jpg'),
        new Enemy('Dual-Faced Specter', EnemyTypes.Supernatural, Difficulties.VERY_HARD, Difficulties.CHALLENGING, 1, 'https://example.com/images/dual_faced_specter.jpg'),
        new Enemy('Eyeless Abomination', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 1, 'https://example.com/images/eyeless_abomination.jpg'),
        new Enemy('Dimensional Anomaly', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.MEDIUM, 3, 'https://example.com/images/dimensional_anomaly.jpg'),
        new Enemy('Spectral Ghost', EnemyTypes.Supernatural, Difficulties.IMPOSSIBILE, Difficulties.EASY, 4, 'https://example.com/images/spectral_ghost.jpg'),
    
        // Additional Sci-Fi Related Enemies
        new Enemy('Improvised Explosive Device (IED)', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.MEDIUM, 1, 'https://example.com/images/ied_explosive.jpg'),
        new Enemy('Urban Gunfight', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.VERY_HARD, 3, 'https://example.com/images/urban_gunfight.jpg'),
        new Enemy('Supply Truck Assault', EnemyTypes.Human, Difficulties.VERY_HARD, Difficulties.MEDIUM, 1, 'https://example.com/images/supply_truck_assault.jpg'),
    ];
    

    public static getOneRandomEnemy(): Enemy {
        // TODO
        return EnemySeeds.enemies[EnemySeeds.getRandomArbitrary(0, EnemySeeds.enemies.length)];
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}