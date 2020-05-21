import { Game } from './Game';
import registerServiceWorker from './register-service-worker';

registerServiceWorker();
const game = Game.getInstance();
game.start();
