// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/entities/Event.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = exports.EventType = void 0;
var EventType;
(function (EventType) {
  EventType[EventType["Exploration"] = 0] = "Exploration";
  EventType[EventType["Combat"] = 1] = "Combat";
  EventType[EventType["Place"] = 2] = "Place";
})(EventType || (exports.EventType = EventType = {}));
var Event = /** @class */function () {
  function Event(title, subtitle, description, image, choices, type, items) {
    this._choices = [];
    this._items = [];
    this._title = title;
    this._subtitle = subtitle;
    this._description = description;
    this._image = image;
    if (choices.length > 4) {
      throw new RangeError('Four is the limit of choices per event');
    }
    this._choices = choices;
    this._type = type;
    this._items = items;
  }
  Object.defineProperty(Event.prototype, "title", {
    get: function get() {
      return this._title;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Event.prototype, "subtitle", {
    get: function get() {
      return this._subtitle;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Event.prototype, "description", {
    get: function get() {
      return this._description;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Event.prototype, "image", {
    get: function get() {
      return this._image;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Event.prototype, "choices", {
    get: function get() {
      return this._choices;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Event.prototype, "type", {
    get: function get() {
      return this._type;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Event.prototype, "items", {
    get: function get() {
      return this._items;
    },
    enumerable: false,
    configurable: true
  });
  Event.prototype.willGiveItems = function () {
    return this._items ? this._items.length > 0 : false;
  };
  return Event;
}();
exports.Event = Event;
},{}],"src/enums/GameStates.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStates = void 0;
var GameStates;
(function (GameStates) {
  GameStates[GameStates["TRAVEL"] = 0] = "TRAVEL";
  GameStates[GameStates["EVENT"] = 1] = "EVENT";
  GameStates[GameStates["SKILLCHECK"] = 2] = "SKILLCHECK";
  GameStates[GameStates["GAME_OVER"] = 3] = "GAME_OVER";
  GameStates[GameStates["RIP"] = 4] = "RIP";
  GameStates[GameStates["LOG"] = 5] = "LOG";
  GameStates[GameStates["BAG"] = 6] = "BAG";
  GameStates[GameStates["ITEM_PICKER"] = 7] = "ITEM_PICKER";
  GameStates[GameStates["DIALOG"] = 8] = "DIALOG";
  GameStates[GameStates["MAP"] = 9] = "MAP";
  GameStates[GameStates["SKILL_UP"] = 10] = "SKILL_UP";
})(GameStates || (exports.GameStates = GameStates = {}));
},{}],"src/managers/LogManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogManager = exports.LogType = void 0;
var Game_1 = require("../Game");
var GameStates_1 = require("../enums/GameStates");
var LogType;
(function (LogType) {
  LogType[LogType["Result"] = 0] = "Result";
  LogType[LogType["StatusChange"] = 1] = "StatusChange";
})(LogType || (exports.LogType = LogType = {}));
var LogManager = /** @class */function () {
  function LogManager() {
    var _this = this;
    this._tempResultLogs = [];
    this._tempoStatusChangeLogs = [];
    this._logs = [];
    this._game = Game_1.Game.getInstance();
    this._logListResult = document.querySelector("#log-list-result");
    this._logListStatusChange = document.querySelector("#log-list-status-change");
    this._travelBtn = document.querySelector("#log-back-character-btn");
    this._travelBtn.addEventListener('click', function () {
      _this.onClickTravel();
    });
  }
  LogManager.prototype.start = function () {
    this._travelBtn.disabled = true;
    this.showLogs();
  };
  LogManager.prototype.showLogs = function () {
    this._logs = this._tempoStatusChangeLogs;
    this._tempoStatusChangeLogs = [];
    this._logListResult.innerHTML = '';
    this._logListStatusChange.innerHTML = '';
    this.showResultLogs();
  };
  LogManager.prototype.showResultLogs = function () {
    var _this = this;
    var count = 0;
    var result_logs = '';
    var stop = setInterval(function () {
      if (count < _this._tempResultLogs.length) {
        _this._game.audioManager.playWriteSound();
        result_logs += '<li>' + _this._tempResultLogs[count] + '</li>';
        _this._logListResult.innerHTML = result_logs;
        count++;
      } else {
        _this._game.audioManager.playDingSound();
        clearInterval(stop);
        _this._logs = _this._tempResultLogs;
        _this._tempResultLogs = [];
        _this._logListStatusChange.innerHTML = _this.createLogsForStatusChange();
        _this._game.characterManager.savePreviousCharacters();
        _this._travelBtn.disabled = false;
      }
    }, 800);
  };
  LogManager.prototype.createLogsForStatusChange = function () {
    var previousCharacters = this._game.characterManager.previousCharacters;
    var currentCharacters = this._game.characterManager.characters;
    var status_change_logs = '';
    for (var i = 0; i < previousCharacters.length; i++) {
      var previousCharacter = previousCharacters[i];
      var currentCharacter = currentCharacters[i];
      if (!currentCharacter.isDead) {
        if (previousCharacter.health != currentCharacter.health || previousCharacter.hungry != currentCharacter.hungry || previousCharacter.stamina != currentCharacter.stamina) {
          status_change_logs += '<li> ' + currentCharacter.name + ' ';
          if (previousCharacter.health != currentCharacter.health) {
            if (previousCharacter.health > currentCharacter.health) {
              status_change_logs += '❤️ -' + (previousCharacter.health - currentCharacter.health) + '% ';
            } else {
              status_change_logs += '❤️ +' + (currentCharacter.health - previousCharacter.health) + '% ';
            }
          }
          if (previousCharacter.hungry != currentCharacter.hungry) {
            if (previousCharacter.hungry > currentCharacter.hungry) {
              status_change_logs += '🥫 -' + (previousCharacter.hungry - currentCharacter.hungry) + '% ';
            } else {
              status_change_logs += '🥫 +' + (currentCharacter.hungry - previousCharacter.hungry) + '% ';
            }
          }
          if (previousCharacter.stamina != currentCharacter.stamina) {
            if (previousCharacter.stamina > currentCharacter.stamina) {
              status_change_logs += '⚡ -' + (previousCharacter.stamina - currentCharacter.stamina) + '% ';
            } else {
              status_change_logs += '⚡ +' + (currentCharacter.stamina - previousCharacter.stamina) + '% ';
            }
          }
          status_change_logs += '</li>';
        }
      }
    }
    return status_change_logs;
  };
  LogManager.prototype.clearLogs = function () {
    this._logListResult.innerHTML = '';
    this._logListStatusChange.innerHTML = '';
  };
  LogManager.prototype.onClickTravel = function () {
    this._game.audioManager.playButtonSound();
    var characters = this._game.characterManager.getCharactersDead();
    for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
      var character = characters_1[_i];
      if (character.isDead && !character.buried) {
        this._game.stateManager.goToState(GameStates_1.GameStates.RIP);
        return;
      }
    }
    this._game.stateManager.goToState(GameStates_1.GameStates.TRAVEL);
  };
  LogManager.prototype.isThereAnyTemporaryLog = function () {
    return this._tempResultLogs.length > 0 || this._tempoStatusChangeLogs.length > 0;
  };
  LogManager.prototype.addTempLog = function (log, logType) {
    if (logType == LogType.Result) {
      this._tempResultLogs.push(log);
    } else if (logType == LogType.StatusChange) {
      this._tempoStatusChangeLogs.push(log);
    }
  };
  return LogManager;
}();
exports.LogManager = LogManager;
},{"../Game":"src/Game.ts","../enums/GameStates":"src/enums/GameStates.ts"}],"src/enums/Skills.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skills = void 0;
var Skills;
(function (Skills) {
  Skills[Skills["STRENGTH"] = 0] = "STRENGTH";
  Skills[Skills["SPEAK"] = 1] = "SPEAK";
  Skills[Skills["STEALTH"] = 2] = "STEALTH";
  Skills[Skills["EXPLORATION"] = 3] = "EXPLORATION";
})(Skills || (exports.Skills = Skills = {}));
},{}],"src/enums/Difficulties.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Difficulties = void 0;
var Difficulties;
(function (Difficulties) {
  Difficulties[Difficulties["TRIVIAL"] = 0] = "TRIVIAL";
  Difficulties[Difficulties["EASY"] = 1] = "EASY";
  Difficulties[Difficulties["MEDIUM"] = 2] = "MEDIUM";
  Difficulties[Difficulties["CHALLENGING"] = 3] = "CHALLENGING";
  Difficulties[Difficulties["VERY_HARD"] = 4] = "VERY_HARD";
  Difficulties[Difficulties["IMPOSSIBILE"] = 5] = "IMPOSSIBILE";
})(Difficulties || (exports.Difficulties = Difficulties = {}));
},{}],"src/entities/Enemy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enemy = void 0;
var Enemy = /** @class */function () {
  function Enemy(name, type, attack, runAway, timesThatAppears, imageUrl) {
    if (imageUrl === void 0) {
      imageUrl = '';
    }
    this._name = name;
    this._type = type;
    this._attack = attack;
    this._runAway = runAway;
    this._timesThatAppears = timesThatAppears;
    this._imageUrl = imageUrl;
  }
  Object.defineProperty(Enemy.prototype, "name", {
    get: function get() {
      return this._name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Enemy.prototype, "attack", {
    get: function get() {
      return this._attack;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Enemy.prototype, "runAway", {
    get: function get() {
      return this._runAway;
    },
    enumerable: false,
    configurable: true
  });
  return Enemy;
}();
exports.Enemy = Enemy;
},{}],"src/seeds/EnemySeeds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnemySeeds = exports.EnemyTypes = void 0;
var Enemy_1 = require("../entities/Enemy");
var Difficulties_1 = require("../enums/Difficulties");
var EnemyTypes;
(function (EnemyTypes) {
  EnemyTypes[EnemyTypes["WildAnimal"] = 0] = "WildAnimal";
  EnemyTypes[EnemyTypes["Human"] = 1] = "Human";
  EnemyTypes[EnemyTypes["Supernatural"] = 2] = "Supernatural";
})(EnemyTypes || (exports.EnemyTypes = EnemyTypes = {}));
var EnemySeeds = /** @class */function () {
  function EnemySeeds() {}
  EnemySeeds.getOneRandomEnemy = function () {
    // TODO
    return EnemySeeds.enemies[EnemySeeds.getRandomArbitrary(0, EnemySeeds.enemies.length)];
  };
  EnemySeeds.getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  EnemySeeds.enemies = [
  // Wild Animals
  new Enemy_1.Enemy('Angry dog', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.CHALLENGING, Difficulties_1.Difficulties.VERY_HARD, 3, 'https://pixabay.com/photos/dog-angry-aggressive-white-black-5287546/'), new Enemy_1.Enemy('Wild dog', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.MEDIUM, Difficulties_1.Difficulties.CHALLENGING, 3, 'https://pixabay.com/photos/dog-angry-rage-violent-furious-486550/'), new Enemy_1.Enemy('Hungry wild wolf', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.CHALLENGING, 1, 'https://pixabay.com/photos/wolf-predator-hunter-canis-lupus-635063/'), new Enemy_1.Enemy('Swarm of bees', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.CHALLENGING, 1, 'https://pixabay.com/photos/bees-insects-macro-honey-bees-276190/'), new Enemy_1.Enemy('Cloud of insects', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.MEDIUM, 1), new Enemy_1.Enemy('Hungry fox', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.CHALLENGING, Difficulties_1.Difficulties.MEDIUM, 1), new Enemy_1.Enemy('Brown bear', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.VERY_HARD, 1), new Enemy_1.Enemy('Amur tiger', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.VERY_HARD, 1, 'https://pixabay.com/photos/tiger-animal-roar-fangs-angry-5946115/'), new Enemy_1.Enemy('Grey wolf', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.CHALLENGING, 1), new Enemy_1.Enemy('White bear', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.CHALLENGING, 1), new Enemy_1.Enemy('Wild boar', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.MEDIUM, Difficulties_1.Difficulties.EASY, 1), new Enemy_1.Enemy('Northern viper', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.MEDIUM, Difficulties_1.Difficulties.EASY, 1), new Enemy_1.Enemy('Eurasian Lynx', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.CHALLENGING, Difficulties_1.Difficulties.MEDIUM, 1), new Enemy_1.Enemy('Deer', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.MEDIUM, Difficulties_1.Difficulties.EASY, 3), new Enemy_1.Enemy('Siberian Tiger', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.VERY_HARD, 1), new Enemy_1.Enemy('Wild Boar', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.MEDIUM, 3), new Enemy_1.Enemy('Deformed rats', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.MEDIUM, Difficulties_1.Difficulties.EASY, 3), new Enemy_1.Enemy('Flock of crows', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.EASY, 2), new Enemy_1.Enemy('Locust cloud', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.TRIVIAL, 2), new Enemy_1.Enemy('Swarm of flies', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.MEDIUM, 2), new Enemy_1.Enemy('Pigs with worms in the body', EnemyTypes.WildAnimal, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.CHALLENGING, 1),
  // Humans
  new Enemy_1.Enemy('Sick human', EnemyTypes.Human, Difficulties_1.Difficulties.MEDIUM, Difficulties_1.Difficulties.EASY, 3), new Enemy_1.Enemy('Thief with ax', EnemyTypes.Human, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.CHALLENGING, 1), new Enemy_1.Enemy('Militia hunter', EnemyTypes.Human, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.CHALLENGING, 1), new Enemy_1.Enemy('Man crawling with a knife', EnemyTypes.Human, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.MEDIUM, 1), new Enemy_1.Enemy('Two militia hunters', EnemyTypes.Human, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.VERY_HARD, 1),
  // Supernatural
  new Enemy_1.Enemy('Dark figure', EnemyTypes.Supernatural, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.TRIVIAL, 2), new Enemy_1.Enemy('Woman with two faces', EnemyTypes.Supernatural, Difficulties_1.Difficulties.VERY_HARD, Difficulties_1.Difficulties.CHALLENGING, 1), new Enemy_1.Enemy('Eyeless creature', EnemyTypes.Supernatural, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.MEDIUM, 1), new Enemy_1.Enemy('Anomaly', EnemyTypes.Supernatural, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.MEDIUM, 3), new Enemy_1.Enemy('Ghost', EnemyTypes.Supernatural, Difficulties_1.Difficulties.IMPOSSIBILE, Difficulties_1.Difficulties.EASY, 4)];
  return EnemySeeds;
}();
exports.EnemySeeds = EnemySeeds;
},{"../entities/Enemy":"src/entities/Enemy.ts","../enums/Difficulties":"src/enums/Difficulties.ts"}],"src/seeds/EventSeeds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventSeeds = void 0;
var Event_1 = require("../entities/Event");
var Game_1 = require("../Game");
var LogManager_1 = require("../managers/LogManager");
var Skills_1 = require("../enums/Skills");
var Difficulties_1 = require("../enums/Difficulties");
var EnemySeeds_1 = require("./EnemySeeds");
var EventSeeds = /** @class */function () {
  function EventSeeds() {
    this._game = Game_1.Game.getInstance();
    this._events = [];
  }
  EventSeeds.prototype.start = function () {
    var _this = this;
    this.events.push(new Event_1.Event('Wild Wolf Appeared', 'Something that catches your eye', 'He jumps furiously wanting blood!', '', [{
      buttonText: 'Throw a stone',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog('You hit the rock and killed the wolf!', LogManager_1.LogType.Result);
      }
    }, {
      buttonText: 'Run like a chicken',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog('Did you get away', LogManager_1.LogType.Result);
      }
    }], Event_1.EventType.Combat, null));
  };
  Object.defineProperty(EventSeeds.prototype, "events", {
    get: function get() {
      return this._events;
    },
    enumerable: false,
    configurable: true
  });
  EventSeeds.prototype.getPlaceEvent = function () {
    var _this = this;
    var events = [new Event_1.Event('Ferris wheel', 'When you look up you feel a chill in your belly', 'It seems like it’s not been used for a long time,' + ' a time when having fun still made sense', 'ferris-wheel', [{
      buttonText: 'Take a deep breath',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog("You don't find anything interesting", LogManager_1.LogType.Result);
        _this._game.log.addTempLog("Just look at the ferris wheel for a while, take a deep breath and walk away", LogManager_1.LogType.Result);
        _this._game.characterManager.makeSomeoneInTheGroupGetStatus();
      }
    }, {
      buttonText: 'Investigate',
      skillCheck: true,
      skillCheckFields: {
        difficulty: Difficulties_1.Difficulties.MEDIUM,
        skillToCheck: Skills_1.Skills.STRENGTH,
        canGiveItems: true,
        resultPath: {
          success: function success() {
            _this._game.log.addTempLog('You found some things of value', LogManager_1.LogType.Result);
          },
          failure: function failure() {
            _this._game.log.addTempLog("You couldn't find anything", LogManager_1.LogType.Result);
          }
        }
      },
      normalResultPath: null
    }, {
      buttonText: 'Continue the walk',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog("You just go by the ferris wheel and go away, without looking back", LogManager_1.LogType.Result);
      }
    }], Event_1.EventType.Combat, null), new Event_1.Event('Abandoned Barn', 'Just a normal place', 'There is something unsettling about this place', 'barn-abandoned-farm-homestead', [{
      buttonText: 'Investigate',
      skillCheck: true,
      skillCheckFields: {
        difficulty: Difficulties_1.Difficulties.CHALLENGING,
        skillToCheck: Skills_1.Skills.STRENGTH,
        canGiveItems: true,
        resultPath: {
          success: function success() {
            _this._game.log.addTempLog('You found some things of value', LogManager_1.LogType.Result);
          },
          failure: function failure() {
            _this._game.log.addTempLog("You couldn't find anything", LogManager_1.LogType.Result);
          }
        }
      },
      normalResultPath: null
    }, {
      buttonText: 'Continue',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog("You just continue walking...", LogManager_1.LogType.Result);
      }
    }], Event_1.EventType.Combat, null), new Event_1.Event('Theme Park', 'Just a normal place', 'This place brings you strange memories, about sad things', 'theme-park', [{
      buttonText: 'Forget memory',
      skillCheck: true,
      skillCheckFields: {
        difficulty: Difficulties_1.Difficulties.MEDIUM,
        skillToCheck: Skills_1.Skills.STRENGTH,
        canGiveItems: false,
        resultPath: {
          success: function success() {
            _this._game.log.addTempLog('You managed to overcome the negative memories', LogManager_1.LogType.Result);
          },
          failure: function failure() {
            _this._game.characterManager.makeSomeoneInTheGroupGetStatus('Depressed');
          }
        }
      },
      normalResultPath: null
    }, {
      buttonText: 'Just ignore.',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog("You just continue walking...", LogManager_1.LogType.Result);
      }
    }], Event_1.EventType.Combat, null), new Event_1.Event('Forest Fog', 'Just a normal place', 'There is something unsettling about this place', 'forest-fog', [{
      buttonText: 'Continue',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog("You just continue walking...", LogManager_1.LogType.Result);
      }
    }], Event_1.EventType.Combat, null), new Event_1.Event('Geyser', 'Just a normal place', 'There is something unsettling about this place', 'geyser', [{
      buttonText: 'Continue',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {
        _this._game.log.addTempLog("You just continue walking...", LogManager_1.LogType.Result);
      }
    }], Event_1.EventType.Combat, null)];
    return events[Math.floor(Math.random() * events.length)];
    //return events[1];
  };
  EventSeeds.prototype.getCombatEvent = function () {
    var _this = this;
    var enemy = EnemySeeds_1.EnemySeeds.getOneRandomEnemy();
    var possibleQuotes = ['Approaches more and more with an aggressive posture.', 'Closer and closer, making avoiding conflict almost impossible', 'Appears suddenly scaring everyone', 'Appears from the dark in a sadistic way', 'An inevitable encounter in this place', 'Hard to avoid conflict'];
    var quote = possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)];
    return new Event_1.Event(enemy.name, 'Conflict', quote, '2', [{
      buttonText: 'Attack',
      skillCheck: true,
      skillCheckFields: {
        difficulty: enemy.attack,
        skillToCheck: Skills_1.Skills.STRENGTH,
        canGiveItems: false,
        resultPath: {
          success: function success() {
            _this._game.log.addTempLog('You managed to scare the ' + enemy.name.toLowerCase() + ' and run away.', LogManager_1.LogType.Result);
          },
          failure: function failure() {
            _this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
            _this._game.characterManager.makeSomeoneInTheGroupGetStatus('Wounds');
            _this._game.log.addTempLog('You were attacked but managed to escape.', LogManager_1.LogType.Result);
          }
        }
      },
      normalResultPath: null
    }, {
      buttonText: 'Run away',
      skillCheck: true,
      skillCheckFields: {
        difficulty: enemy.runAway,
        skillToCheck: Skills_1.Skills.STRENGTH,
        canGiveItems: false,
        resultPath: {
          success: function success() {
            _this._game.log.addTempLog('You managed to escape.', LogManager_1.LogType.Result);
          },
          failure: function failure() {
            _this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
            _this._game.characterManager.makeSomeoneInTheGroupGetStatus('Fear');
            _this._game.log.addTempLog('You escaped but got hurt by the ' + enemy.name.toLowerCase(), LogManager_1.LogType.Result);
          }
        }
      },
      normalResultPath: null
    }], Event_1.EventType.Combat, null);
  };
  EventSeeds.prototype.getMileStoneEvent = function () {
    return new Event_1.Event('Milestone Reached! ', 'Something that catches your eye', this._game.distanceToTheBorder + ' miles to the border', 'milestone', [{
      buttonText: 'Back to travel',
      skillCheck: false,
      skillCheckFields: null,
      normalResultPath: function normalResultPath() {}
    }], Event_1.EventType.Exploration, null);
  };
  return EventSeeds;
}();
exports.EventSeeds = EventSeeds;
},{"../entities/Event":"src/entities/Event.ts","../Game":"src/Game.ts","../managers/LogManager":"src/managers/LogManager.ts","../enums/Skills":"src/enums/Skills.ts","../enums/Difficulties":"src/enums/Difficulties.ts","./EnemySeeds":"src/seeds/EnemySeeds.ts"}],"src/managers/DiceManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiceManager = void 0;
var Difficulties_1 = require("../enums/Difficulties");
var DiceManager = /** @class */function () {
  function DiceManager(canvasId) {
    this.percentageTable = {
      '2': 97,
      '3': 97,
      '4': 92,
      '5': 83,
      '6': 73,
      '7': 59,
      '8': 42,
      '9': 28,
      '10': 17,
      '11': 9,
      '12': 3
    };
    //this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    //this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.diceSize = 150;
    this.cornerRadius = 20;
    this.dotRadius = 10;
    // Definindo as posições das bolinhas para as faces do dado
    this.positions = [[],
    // 0 - nunca usado
    [[0, 0]],
    // 1
    [[-1, -1], [1, 1]],
    // 2
    [[-1, -1], [0, 0], [1, 1]],
    // 3
    [[-1, -1], [-1, 1], [1, -1], [1, 1]],
    // 4
    [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
    // 5
    [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]] // 6
    ];
  }
  DiceManager.prototype.start = function () {};
  DiceManager.prototype.getDifficult = function (difficulty) {
    switch (difficulty) {
      case Difficulties_1.Difficulties.TRIVIAL:
        return {
          value: this.getRandomNumber(3, 5),
          text: 'Trivial',
          class: 'green-color-border'
        };
      case Difficulties_1.Difficulties.EASY:
        return {
          value: this.getRandomNumber(6, 8),
          text: 'Easy',
          class: 'green-color-border'
        };
      case Difficulties_1.Difficulties.MEDIUM:
        return {
          value: this.getRandomNumber(9, 11),
          text: 'Medium',
          class: 'green-color-border'
        };
      case Difficulties_1.Difficulties.CHALLENGING:
        return {
          value: this.getRandomNumber(12, 14),
          text: 'Challenging',
          class: 'yellow-color-border'
        };
      case Difficulties_1.Difficulties.VERY_HARD:
        return {
          value: this.getRandomNumber(15, 17),
          text: 'Very Hard',
          class: 'red-color-border'
        };
      case Difficulties_1.Difficulties.IMPOSSIBILE:
        return {
          value: this.getRandomNumber(18, 20),
          text: 'Impossibile',
          class: 'red-color-border'
        };
    }
  };
  DiceManager.prototype.calculateProbabilityFrom = function (value) {
    if (value > 12) value = 12;
    if (value <= 1) value = 2;
    return this.percentageTable[value] + '%';
  };
  DiceManager.prototype.getRandomNumber = function (start, end) {
    var min = Math.ceil(start);
    var max = Math.floor(end);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  DiceManager.prototype.drawRoundedRect = function (x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
    this.ctx.fillStyle = "black"; // Preenchendo o dado com preto
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "white"; // Contorno branco para o dado
    this.ctx.stroke();
  };
  DiceManager.prototype.drawDots = function (diceValue) {
    var _this = this;
    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;
    var spacing = this.diceSize / 4;
    this.ctx.fillStyle = "white"; // Bolinhas brancas
    this.positions[diceValue].forEach(function (_a) {
      var xPos = _a[0],
        yPos = _a[1];
      var x = centerX + xPos * spacing;
      var y = centerY + yPos * spacing;
      _this.ctx.beginPath();
      _this.ctx.arc(x, y, _this.dotRadius, 0, Math.PI * 2);
      _this.ctx.fill();
    });
  };
  DiceManager.prototype.drawDice = function (diceValue) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Desenha o retângulo arredondado (o dado)
    var x = (this.canvas.width - this.diceSize) / 2;
    var y = (this.canvas.height - this.diceSize) / 2;
    this.drawRoundedRect(x, y, this.diceSize, this.diceSize, this.cornerRadius);
    // Desenha as bolinhas de acordo com o valor do dado
    this.drawDots(diceValue);
  };
  DiceManager.prototype.getRandomDiceValue = function () {
    return Math.floor(Math.random() * 6) + 1;
  };
  DiceManager.prototype.animateDice = function () {
    var _this = this;
    setInterval(function () {
      var diceValue = _this.getRandomDiceValue();
      _this.drawDice(diceValue);
    }, 1000);
  };
  return DiceManager;
}();
exports.DiceManager = DiceManager;
},{"../enums/Difficulties":"src/enums/Difficulties.ts"}],"src/managers/EventManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventManager = void 0;
var Event_1 = require("../entities/Event");
var Game_1 = require("../Game");
var EventSeeds_1 = require("../seeds/EventSeeds");
var GameStates_1 = require("../enums/GameStates");
var DiceManager_1 = require("./DiceManager");
var EventManager = /** @class */function () {
  function EventManager() {
    this._titleElement = document.getElementById("event-page-title");
    this._descriptionElement = document.getElementById("event-page-description");
    this._photographyBorder = document.querySelector(".photography-border");
    this._eventPageChoicesBtnListElement = document.getElementById("event-page-choices-btn-list");
    this._subtitleElement = document.getElementById("event-page-subtitle");
    this._imageElement = document.getElementById("event-page-image");
    this._game = Game_1.Game.getInstance();
  }
  EventManager.prototype.start = function () {
    this._eventPageChoicesBtnListElement.innerHTML = '';
    var eventSeeds = new EventSeeds_1.EventSeeds();
    eventSeeds.start();
    var events = eventSeeds.events;
    var randomEventType = this._game.getRandomArbitrary(2);
    if (this.checkForMileStone()) {
      this._currentEvent = eventSeeds.getMileStoneEvent();
    } else if (randomEventType == 0) {
      this._currentEvent = eventSeeds.getPlaceEvent();
    } else {
      this._currentEvent = eventSeeds.getCombatEvent();
    }
    this.showWaitingMessage();
  };
  EventManager.prototype.showChoices = function () {
    var _this = this;
    this._eventPageChoicesBtnListElement.innerHTML = '';
    var diceManager = new DiceManager_1.DiceManager();
    var _loop_1 = function _loop_1(choice) {
      var button = document.createElement("button");
      if (choice.skillCheck) {
        choice.skillCheckFields.difficult = diceManager.getDifficult(choice.skillCheckFields.difficulty);
        var buttonText = choice.buttonText + ' [' + choice.skillCheckFields.difficult.text + ': ' + choice.skillCheckFields.difficult.value + ' - ' + diceManager.calculateProbabilityFrom(choice.skillCheckFields.difficult.value - 3) + ']';
        button.appendChild(document.createTextNode(buttonText));
        button.classList.add(choice.skillCheckFields.difficult.class);
      } else {
        button.appendChild(document.createTextNode(choice.buttonText));
      }
      button.addEventListener('click', function () {
        return _this.selectChoice(choice);
      });
      this_1._eventPageChoicesBtnListElement.appendChild(button);
    };
    var this_1 = this;
    for (var _i = 0, _a = this.currentEvent.choices; _i < _a.length; _i++) {
      var choice = _a[_i];
      _loop_1(choice);
    }
  };
  EventManager.prototype.selectChoice = function (choice) {
    this._game.audioManager.playButtonSound();
    this.currentChoice = choice;
    if (this.currentChoice.skillCheck) {
      this._game.stateManager.goToState(GameStates_1.GameStates.SKILLCHECK);
      return;
    }
    if (this.currentEvent.type == Event_1.EventType.Place && choice.buttonText == 'Investigate') {
      this._game.stateManager.goToState(GameStates_1.GameStates.ITEM_PICKER);
      return;
    }
    this.currentChoice.normalResultPath();
    this.checkLogs();
  };
  Object.defineProperty(EventManager.prototype, "currentEvent", {
    get: function get() {
      return this._currentEvent;
    },
    enumerable: false,
    configurable: true
  });
  EventManager.prototype.checkForMileStone = function () {
    return this._game.distanceToTheBorder == 250 || this._game.distanceToTheBorder == 200 || this._game.distanceToTheBorder == 150 || this._game.distanceToTheBorder == 100 || this._game.distanceToTheBorder == 50;
  };
  EventManager.prototype.showWaitingMessage = function () {
    var _this = this;
    this._titleElement.style.display = 'none';
    this._subtitleElement.style.display = 'none';
    this._photographyBorder.style.display = 'none';
    this._descriptionElement.innerHTML = 'Something happened!';
    this._imageElement.style.display = 'none';
    setTimeout(function () {
      return _this.showEvent();
    }, 1000);
  };
  EventManager.prototype.showEvent = function () {
    this._titleElement.style.display = 'block';
    this._subtitleElement.style.display = 'block';
    this._photographyBorder.style.display = 'block';
    this._titleElement.innerHTML = this._currentEvent.title;
    this._subtitleElement.innerHTML = this._currentEvent.subtitle;
    this._descriptionElement.innerHTML = this._currentEvent.description;
    if (this._currentEvent.image != '') {
      this._imageElement.src = 'img\\places\\' + this._currentEvent.image + '.jpg';
    }
    this._imageElement.style.display = 'block';
    this.showChoices();
  };
  EventManager.prototype.checkLogs = function () {
    if (this._game.log.isThereAnyTemporaryLog()) {
      this._game.stateManager.goToState(GameStates_1.GameStates.LOG);
    } else {
      this._game.stateManager.goToState(GameStates_1.GameStates.TRAVEL);
    }
  };
  return EventManager;
}();
exports.EventManager = EventManager;
},{"../entities/Event":"src/entities/Event.ts","../Game":"src/Game.ts","../seeds/EventSeeds":"src/seeds/EventSeeds.ts","../enums/GameStates":"src/enums/GameStates.ts","./DiceManager":"src/managers/DiceManager.ts"}],"src/managers/GameOverManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverManager = void 0;
var Game_1 = require("../Game");
var GameOverManager = /** @class */function () {
  function GameOverManager() {
    this._game = Game_1.Game.getInstance();
    this._gameOverMessage = document.querySelector("#game-over-message");
    this._tryAgainBtn = document.querySelector('#try-again-btn');
  }
  GameOverManager.prototype.start = function () {
    var _this = this;
    this._tryAgainBtn.addEventListener('click', function () {
      _this.onClickTryAgainBtn();
    });
    this.setGameOverMessage('You died with ' + this._game.distanceToTheBorder + ' miles to the border');
  };
  GameOverManager.prototype.onClickTryAgainBtn = function () {
    this._game.audioManager.playButtonSound();
    location.reload();
  };
  GameOverManager.prototype.setGameOverMessage = function (message) {
    this._gameOverMessage.innerHTML = message;
  };
  return GameOverManager;
}();
exports.GameOverManager = GameOverManager;
},{"../Game":"src/Game.ts"}],"src/managers/RipManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RipManager = void 0;
var Game_1 = require("../Game");
var GameStates_1 = require("../enums/GameStates");
var RipManager = /** @class */function () {
  function RipManager() {
    var _this = this;
    this._game = Game_1.Game.getInstance();
    this._ripPageImageElement = document.querySelector("#rip-page-image");
    this._ripPageNameElement = document.querySelector("#rip-page-name");
    this._ripPageDatesElement = document.querySelector("#rip-page-dates");
    this._ripPageQuoteElement = document.querySelector("#rip-page-quote");
    this._ripPageStatusElement = document.querySelector("#rip-page-status");
    this._travelBtn = document.querySelector('#rip-page-back-btn');
    this._travelBtn.addEventListener('click', function () {
      _this.onClickTravel();
    });
  }
  RipManager.prototype.start = function () {
    var character = this._game.characterManager.getFirstCharacterDeadAndNotBuried();
    this.showCharater(character);
    character.buried = true;
  };
  RipManager.prototype.showCharater = function (character) {
    this._ripPageImageElement.src = character.imageURL;
    this._ripPageNameElement.innerHTML = character.name + ' Miller';
    this._ripPageDatesElement.innerHTML = '⭐ 02/02/1996 - 20/03/2020 ✝️';
    this._ripPageQuoteElement.innerHTML = 'I pray you find peace and rest wherever you are';
    this._ripPageStatusElement.innerHTML = '<span style="font-weight: bold;">Status:</span> Starved to death';
  };
  RipManager.prototype.onClickTravel = function () {
    this._game.audioManager.playButtonSound();
    var character = this._game.characterManager.getFirstCharacterDeadAndNotBuried();
    if (character != null) {
      this.showCharater(character);
      character.buried = true;
    } else {
      this._game.stateManager.goToState(GameStates_1.GameStates.TRAVEL);
    }
  };
  return RipManager;
}();
exports.RipManager = RipManager;
},{"../Game":"src/Game.ts","../enums/GameStates":"src/enums/GameStates.ts"}],"src/managers/TravelManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TravelManager = void 0;
var Game_1 = require("../Game");
var GameStates_1 = require("../enums/GameStates");
var LogManager_1 = require("../managers/LogManager");
var TravelManager = /** @class */function () {
  function TravelManager() {
    var _this = this;
    this._game = Game_1.Game.getInstance();
    this._travelledDistanceField = document.querySelector("#travelled-distance");
    this._progressBarCanvasElement = document.getElementById("progress-bar");
    this._walkBtn = document.querySelector("#walk-btn");
    this._campBtn = document.querySelector("#camp-btn");
    this._yourFamily = document.querySelector('#your-family');
    this._walkBtn.addEventListener('click', function () {
      _this.onClickWalkBtn();
    });
    this._campBtn.addEventListener('click', function () {
      _this.onClickCampBtn();
    });
    this.showTravelledDistance();
    this._charactersList = [];
    this._bagBtn = document.querySelector('#bag-btn');
    this._bagBtn.addEventListener('click', function () {
      _this.onClickBag();
    });
    this.getAtributesPageElements();
  }
  TravelManager.prototype.start = function () {
    this.showProgressBarCanvas();
    this._walkBtn.innerHTML = this._game.loc.l('walk-one-hour');
    this._yourFamily.innerHTML = this._game.loc.l('your-family');
    /*
    if (this._game.characterManager.isInDanger()) {
        this._statsBtn.innerHTML = '⚠️Your Family';
    } else {
        this._statsBtn.innerHTML = 'Your Family';
    }*/
    if (this._game.bagManager.isEmpty()) {
      this._bagBtn.innerHTML = this._game.loc.l('bag-is-empty');
      this._bagBtn.disabled = true;
    } else {
      this._bagBtn.disabled = false;
      this._bagBtn.innerHTML = 'Open bag (' + this._game.bagManager.showQuantityOfItems() + ') ';
    }
    this.showCharacters();
    this.checkCampBtn();
  };
  TravelManager.prototype.showProgressBarCanvas = function () {
    this._progressBarCanvasElement.width = 300;
    this._progressBarCanvasElement.height = 8;
    this._progressBarCanvasContext = this._progressBarCanvasElement.getContext("2d");
    this.drawBackground();
    console.log(this._game.distanceToTheBorder);
    this.drawPlayerPositionOnProgressBarCanvas(300 - this._game.distanceToTheBorder);
  };
  TravelManager.prototype.drawBackground = function () {
    this._progressBarCanvasContext.clearRect(0, 0, this._progressBarCanvasElement.width, this._progressBarCanvasElement.height);
    this._progressBarCanvasContext.beginPath();
    this._progressBarCanvasContext.fillStyle = 'black';
    this._progressBarCanvasContext.fillRect(0, 0, this._progressBarCanvasElement.width, this._progressBarCanvasElement.height);
    this._progressBarCanvasContext.strokeStyle = "#2c3e50";
    this._progressBarCanvasContext.lineWidth = 1;
    this._progressBarCanvasContext.moveTo(10, this._progressBarCanvasElement.height / 2);
    this._progressBarCanvasContext.lineTo(300 - 10, this._progressBarCanvasElement.height / 2);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.moveTo(10, this._progressBarCanvasElement.height / 2 - 5);
    this._progressBarCanvasContext.lineTo(10, this._progressBarCanvasElement.height / 2 + 5);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width / 2, this._progressBarCanvasElement.height / 2 - 5);
    this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width / 2, this._progressBarCanvasElement.height / 2 + 5);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width / 4, this._progressBarCanvasElement.height / 2 - 5);
    this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width / 4, this._progressBarCanvasElement.height / 2 + 5);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width / 4 * 3, this._progressBarCanvasElement.height / 2 - 5);
    this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width / 4 * 3, this._progressBarCanvasElement.height / 2 + 5);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width - 10, this._progressBarCanvasElement.height / 2 - 5);
    this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width - 10, this._progressBarCanvasElement.height / 2 + 5);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.beginPath();
    this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width - 10, this._progressBarCanvasElement.height / 2 - 5);
    this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width - 10, this._progressBarCanvasElement.height / 2 + 5);
    this._progressBarCanvasContext.stroke();
    this._progressBarCanvasContext.closePath();
  };
  TravelManager.prototype.drawPlayerPositionOnProgressBarCanvas = function (mile) {
    var lineSize = this._progressBarCanvasElement.width - 20;
    var unit = lineSize / 300;
    var unitsToWalk = mile * unit;
    this._progressBarCanvasContext.beginPath();
    this._progressBarCanvasContext.arc(unitsToWalk + 10, this._progressBarCanvasElement.height / 2, 3.5, 0, 2 * Math.PI);
    this._progressBarCanvasContext.lineWidth = 0;
    this._progressBarCanvasContext.fillStyle = "#27ae60";
    this._progressBarCanvasContext.fill();
  };
  TravelManager.prototype.onClickCampBtn = function () {
    var _this = this;
    this._bagBtn.disabled = true;
    this._campBtn.disabled = true;
    this._walkBtn.disabled = true;
    this._yourFamily.innerHTML = 'Camping...';
    this._hoursSleeping = 0;
    this._sleepIntervalId = window.setInterval(function () {
      return _this.sleeping();
    }, 500);
  };
  TravelManager.prototype.sleeping = function () {
    if (this._hoursSleeping <= 6) {
      var characters = this._game.characters;
      for (var i = 0; i < characters.length; i++) {
        var character = characters[i];
        if (!character.isDead) {
          var randomNumber = this._game.getRandomArbitrary(3);
          this._charactersList[i].atributesField.innerHTML = randomNumber == 0 ? "Zzz" : randomNumber == 1 ? "zZz" : "zzZ";
        }
      }
      this._game.passOneHour();
      this._hoursSleeping++;
    } else {
      this._game.characterManager.increaseStaminaOfAllCharactersToMax();
      this.showCharacters();
      this._bagBtn.disabled = false;
      this._campBtn.disabled = false;
      this._walkBtn.disabled = false;
      this._yourFamily.innerHTML = this._game.loc.l('your-family');
      clearInterval(this._sleepIntervalId);
    }
  };
  TravelManager.prototype.onClickWalkBtn = function () {
    if (this._game.distanceToTheBorder == 300) {
      this._game.audioManager.playRainSound();
    }
    this._game.audioManager.playButtonSound();
    this._game.passOneHour();
    this.walkOneHour();
    var foundEvent = this.checkEvent();
    if (foundEvent) {
      this._game.stateManager.goToState(GameStates_1.GameStates.EVENT);
    } else if (this._game.log.isThereAnyTemporaryLog()) {
      var randomCharacter = this._game.characterManager.picksACharacterAtRandom();
      var walkMessages = [randomCharacter.name + ' is feeling anxious...', randomCharacter.name + ' is thoughtful...', randomCharacter.name + ' feels a tightness in the heart...', 'The family continued walking...', 'The walk was smooth...', 'Nothing different...'];
      var message = walkMessages[this._game.getRandomArbitrary(walkMessages.length - 1)];
      this._game.log.addTempLog(message, LogManager_1.LogType.Result);
      this._game.stateManager.goToState(GameStates_1.GameStates.LOG);
    }
    this.checkCampBtn();
  };
  TravelManager.prototype.checkCampBtn = function () {
    if (this._game.isDayLight()) {
      this._campBtn.disabled = true;
      this._campBtn.innerHTML = "It's not safe to camp";
    } else {
      this._campBtn.disabled = false;
      this._campBtn.innerHTML = 'Camp (+6 hour)';
    }
  };
  TravelManager.prototype.onClickBag = function () {
    this._game.audioManager.playButtonSound();
    this._game.stateManager.goToState(GameStates_1.GameStates.BAG);
  };
  TravelManager.prototype.getAtributesPageElements = function () {
    this._charactersList[0] = {};
    this._charactersList[0].nameField = document.querySelector("#first-character-name-field");
    this._charactersList[0].atributesField = document.querySelector("#first-character-atributes-field");
    this._charactersList[0].afflictionsField = document.querySelector("#first-character-afflictions-field");
    this._charactersList[1] = {};
    this._charactersList[1].nameField = document.querySelector("#second-character-name-field");
    this._charactersList[1].atributesField = document.querySelector("#second-character-atributes-field");
    this._charactersList[1].afflictionsField = document.querySelector("#second-character-afflictions-field");
    this._charactersList[2] = {};
    this._charactersList[2].nameField = document.querySelector("#third-character-name-field");
    this._charactersList[2].atributesField = document.querySelector("#third-character-atributes-field");
    this._charactersList[2].afflictionsField = document.querySelector("#third-character-afflictions-field");
    this._charactersList[3] = {};
    this._charactersList[3].nameField = document.querySelector("#fourth-character-name-field");
    this._charactersList[3].atributesField = document.querySelector("#fourth-character-atributes-field");
    this._charactersList[3].afflictionsField = document.querySelector("#fourth-character-afflictions-field");
  };
  TravelManager.prototype.showCharacters = function () {
    var characters = this._game.characters;
    for (var i = 0; i < characters.length; i++) {
      var character = characters[i];
      if (character.isDead) {
        this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship + ' 💀';
        this._charactersList[i].atributesField.innerHTML = character.getDateOfBirth() + ' - 2020';
        this._charactersList[i].afflictionsField.innerHTML = '';
      } else {
        var healthPerHour = character.showHealthLostPerHourDueToAllStatus();
        this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;
        this._charactersList[i].nameField.innerHTML += character.getSickness() == 'Sick' ? ' [ Sick ]' : '';
        this._charactersList[i].atributesField.innerHTML = character.getHealth() + (healthPerHour == 0 ? ' ' : ' <span class="character-afflictions-field">(-' + character.showHealthLostPerHourDueToAllStatus() + '%) </span>') + character.getStamina() + ' ' + character.getHungry();
        this._charactersList[i].afflictionsField.innerHTML = character.showAfflictions();
      }
    }
  };
  TravelManager.prototype.checkEvent = function () {
    return this.getRandomArbitrary(1, 100) <= 50;
  };
  TravelManager.prototype.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
  };
  TravelManager.prototype.walkOneHour = function () {
    this._game.characterManager.decreaseStaminaOfAllCharacters(5);
    this._game.characterManager.increaseHungryOfAllCharacters();
    var characters = this._game.characterManager.getCharactersAlive();
    for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
      var character = characters_1[_i];
      character.walkOneHour();
    }
    this._game.decreaseTheDistanceToTheBorder(2);
    this.showTravelledDistance();
    if (this._game.distanceToTheBorder <= 0) {
      this.arrivedAtTheBorder();
    }
  };
  TravelManager.prototype.getRandomCharacter = function () {
    return Math.floor(Math.random() * this._game.characters.length);
  };
  TravelManager.prototype.showTravelledDistance = function () {
    this._travelledDistanceField.innerHTML = this._game.distanceToTheBorder + ' ' + this._game.loc.l('miles-to-the-border');
  };
  TravelManager.prototype.arrivedAtTheBorder = function () {
    this._game.stateManager.goToState(GameStates_1.GameStates.GAME_OVER);
  };
  return TravelManager;
}();
exports.TravelManager = TravelManager;
},{"../Game":"src/Game.ts","../enums/GameStates":"src/enums/GameStates.ts","../managers/LogManager":"src/managers/LogManager.ts"}],"src/entities/Item.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = exports.ItemType = void 0;
var ItemType;
(function (ItemType) {
  ItemType[ItemType["FirstAid"] = 0] = "FirstAid";
  ItemType[ItemType["Food"] = 1] = "Food";
  ItemType[ItemType["Drink"] = 2] = "Drink";
})(ItemType || (exports.ItemType = ItemType = {}));
var Item = /** @class */function () {
  function Item(name, type, effectValue, status) {
    if (status === void 0) {
      status = [];
    }
    this._status = [];
    this._name = name;
    this._type = type;
    this._amount = 0;
    this._effectValue = effectValue;
    this._status = status;
  }
  Object.defineProperty(Item.prototype, "name", {
    get: function get() {
      return this._name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Item.prototype, "amount", {
    get: function get() {
      return this._amount;
    },
    set: function set(amount) {
      this._amount = amount;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Item.prototype, "type", {
    get: function get() {
      return this._type;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Item.prototype, "status", {
    get: function get() {
      return this._status;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Item.prototype, "effect", {
    get: function get() {
      var effect = '';
      switch (this._type) {
        case ItemType.FirstAid:
          effect += '❤️';
          break;
        case ItemType.Food:
          effect += '🥫';
          break;
      }
      effect += ' +' + this.effectValue + '%';
      return effect;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Item.prototype, "effectValue", {
    get: function get() {
      return this._effectValue;
    },
    enumerable: false,
    configurable: true
  });
  Item.prototype.showAmount = function () {
    return this._amount > 1 ? ' x ' + this._amount : '';
  };
  Item.prototype.decreaseAmount = function () {
    this._amount--;
  };
  Item.prototype.increaseAmount = function () {
    this._amount++;
  };
  Item.prototype.showStatus = function () {
    if (this._status.length == 0) {
      return '';
    }
    var afflictions = '';
    for (var _i = 0, _a = this._status; _i < _a.length; _i++) {
      var affliction = _a[_i];
      if (affliction) {
        afflictions += ' -' + affliction.name;
      }
    }
    return afflictions;
  };
  return Item;
}();
exports.Item = Item;
},{}],"src/managers/BagManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BagManager = void 0;
var Game_1 = require("../Game");
var Item_1 = require("../entities/Item");
var GameStates_1 = require("../enums/GameStates");
var BagManager = /** @class */function () {
  function BagManager() {
    var _this = this;
    this._items = [];
    this._game = Game_1.Game.getInstance();
    this._itemListElement = document.querySelector('#bag-item-list');
    this._selectedItemElement = document.getElementById('bag-selected-item');
    this._selectedItemDescriptionElement = document.getElementById('bag-selected-item-description');
    this._bagCloseBtn = document.querySelector('#bag-close-btn');
    this._bagThrowAwayBtn = document.getElementById('bag-throw-away-btn');
    this._bagCloseBtn.addEventListener('click', function () {
      _this.onClickBagClose();
    });
    this._bagThrowAwayBtn.addEventListener('click', function () {
      _this.onClickThrowAway();
    });
  }
  BagManager.prototype.start = function () {
    this.hideSelectedItem();
    this.showItems();
    this._bagThrowAwayBtn.style.display = 'none';
  };
  BagManager.prototype.onClickBagClose = function () {
    this._game.audioManager.playButtonSound();
    this._game.stateManager.goToState(GameStates_1.GameStates.TRAVEL);
  };
  BagManager.prototype.onClickThrowAway = function () {
    this._game.audioManager.playButtonSound();
    this.removeOrDecreaseItem();
    this._itemListElement.innerHTML = '';
    this._selectedItemElement.style.display = 'none';
    this._selectedItemDescriptionElement.style.display = 'none';
    this.showItems();
    this._bagThrowAwayBtn.style.display = 'none';
  };
  BagManager.prototype.hideSelectedItem = function () {
    this._selectedItemElement.innerHTML = '';
    this._selectedItemElement.style.display = 'none';
    this._selectedItemDescriptionElement.style.display = 'none';
  };
  BagManager.prototype.showSelectedItem = function () {
    this._selectedItemElement.style.display = 'block';
    if (this._selectedItem.type == Item_1.ItemType.FirstAid) {
      this._selectedItemDescriptionElement.style.display = 'block';
    }
  };
  BagManager.prototype.showItems = function () {
    var _this = this;
    this._itemListElement.innerHTML = '';
    if (this._items.length == 0) {
      this._itemListElement.innerHTML = 'Empty';
      return;
    }
    var _loop_1 = function _loop_1(item) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.appendChild(document.createTextNode(item.name + ' (' + item.effect + ') ' + item.showAmount()));
      button.addEventListener('click', function () {
        return _this.selectItem(item);
      });
      li.appendChild(button);
      this_1._itemListElement.appendChild(li);
    };
    var this_1 = this;
    for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
      var item = _a[_i];
      _loop_1(item);
    }
  };
  BagManager.prototype.putItem = function (itemToPut) {
    var existingItemIndex = this._items.findIndex(function (item) {
      return item.name == itemToPut.name;
    });
    if (existingItemIndex >= 0) {
      this._items[existingItemIndex].increaseAmount();
    } else {
      this._items.push(itemToPut);
    }
  };
  BagManager.prototype.showCharacters = function () {
    var _this = this;
    var _loop_2 = function _loop_2(character) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.classList.add('bag-item');
      var buttonText = character.name;
      paragraph = document.createElement("p");
      if (character.isDead) {
        button.disabled = true;
        paragraph.classList.add('line');
        paragraph.style.color = '#2c3e50';
      } else {
        switch (this_2._selectedItem.type) {
          case Item_1.ItemType.FirstAid:
            buttonText += character.getHealth();
            buttonText += character.showAfflictions();
            break;
          case Item_1.ItemType.Food:
            buttonText += character.getHungry();
            break;
        }
      }
      paragraph.appendChild(document.createTextNode(buttonText));
      button.appendChild(paragraph);
      button.addEventListener('click', function () {
        return _this.useItem(character);
      });
      li.appendChild(button);
      this_2._itemListElement.appendChild(li);
    };
    var this_2 = this,
      paragraph;
    for (var _i = 0, _a = this._game.characters; _i < _a.length; _i++) {
      var character = _a[_i];
      _loop_2(character);
    }
  };
  BagManager.prototype.selectItem = function (selectedItem) {
    this._selectedItem = selectedItem;
    this._itemListElement.innerHTML = '';
    this._selectedItemElement.innerHTML = "Give ".concat(this._selectedItem.name, " ").concat(this._selectedItem.effect, " to:");
    if (this._selectedItem.type == Item_1.ItemType.FirstAid) {
      this._selectedItemDescriptionElement.innerHTML = 'Can help with ' + this._selectedItem.showStatus();
    }
    this.showSelectedItem();
    this.showCharacters();
    this._bagThrowAwayBtn.style.display = 'block';
  };
  BagManager.prototype.useItem = function (character) {
    this.removeOrDecreaseItem();
    this.hideSelectedItem();
    this.showItems();
    switch (this._selectedItem.type) {
      case Item_1.ItemType.FirstAid:
        character.increaseHealth(this._selectedItem.effectValue);
        break;
      case Item_1.ItemType.Food:
        character.decreaseHungry(this._selectedItem.effectValue);
        break;
    }
    for (var _i = 0, _a = this._selectedItem.status; _i < _a.length; _i++) {
      var status = _a[_i];
      character.removeStatus(status);
    }
    this._bagThrowAwayBtn.style.display = 'none';
  };
  BagManager.prototype.removeOrDecreaseItem = function () {
    if (this._selectedItem.amount > 1) {
      this._selectedItem.decreaseAmount();
    } else {
      this.removeItem(this._selectedItem.name);
    }
  };
  BagManager.prototype.removeItem = function (itemName) {
    this._items = this._items.filter(function (item) {
      return item.name !== itemName;
    });
  };
  BagManager.prototype.checksIfAnItemExists = function (itemName) {
    var existingItemIndex = this._items.findIndex(function (item) {
      return item.name == itemName;
    });
    return existingItemIndex != -1 ? true : false;
  };
  BagManager.prototype.isEmpty = function () {
    return this._items.length <= 0;
  };
  BagManager.prototype.showQuantityOfItems = function () {
    var itemCount = 0;
    for (var i = 0; i < this._items.length; i++) {
      itemCount += this._items[i].amount == 0 ? 1 : this._items[i].amount;
    }
    return itemCount;
  };
  return BagManager;
}();
exports.BagManager = BagManager;
},{"../Game":"src/Game.ts","../entities/Item":"src/entities/Item.ts","../enums/GameStates":"src/enums/GameStates.ts"}],"src/managers/StateManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateManager = void 0;
var Game_1 = require("../Game");
var GameStates_1 = require("../enums/GameStates");
var StateManager = /** @class */function () {
  function StateManager() {
    this.currentState = GameStates_1.GameStates.TRAVEL;
    this._game = Game_1.Game.getInstance();
  }
  StateManager.prototype.start = function () {};
  StateManager.prototype.setState = function () {
    this._game.hideAllPages();
    switch (this.currentState) {
      case GameStates_1.GameStates.TRAVEL:
        this._game.showPage(this._game.travelPage);
        this._game.travelManager.start();
        break;
      case GameStates_1.GameStates.EVENT:
        this._game.showPage(this._game.eventPage);
        this._game.eventManager.start();
        break;
      case GameStates_1.GameStates.SKILLCHECK:
        this._game.showPage(this._game.skillCheckPage);
        this._game.skillCheckManager.start();
        break;
      case GameStates_1.GameStates.LOG:
        this._game.showPage(this._game.logPage);
        this._game.logManager.start();
        break;
      case GameStates_1.GameStates.GAME_OVER:
        this._game.showPage(this._game.gameOverPage);
        this._game.gameOverManager.start();
        break;
      case GameStates_1.GameStates.RIP:
        this._game.showPage(this._game.ripPage);
        this._game.ripManager.start();
        break;
      case GameStates_1.GameStates.BAG:
        this._game.showPage(this._game.bagPage);
        this._game.bagManager.start();
        break;
      case GameStates_1.GameStates.ITEM_PICKER:
        this._game.showPage(this._game.itemPickerPage);
        this._game.itemPickerManager.start();
        break;
      case GameStates_1.GameStates.SKILL_UP:
        this._game.showPage(this._game.skillUpPage);
        this._game.skillUpManager.start();
        break;
      case GameStates_1.GameStates.DIALOG:
        this._game.showPage(this._game.dialogPage);
        this._game.dialogManager.start();
        break;
      case GameStates_1.GameStates.MAP:
        this._game.showPage(this._game.mapPage);
        this._game.mapManager.start();
    }
  };
  StateManager.prototype.goToState = function (state) {
    if (this.currentState == GameStates_1.GameStates.GAME_OVER) return;
    this.currentState = state;
    this.setState();
  };
  return StateManager;
}();
exports.StateManager = StateManager;
},{"../Game":"src/Game.ts","../enums/GameStates":"src/enums/GameStates.ts"}],"src/entities/Character.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Character = void 0;
var Game_1 = require("../Game");
var LogManager_1 = require("../managers/LogManager");
var GameStates_1 = require("../enums/GameStates");
var Character = /** @class */function () {
  function Character(name, kinship, health, stamina, hungry, dateOfBirth, isDead) {
    if (health === void 0) {
      health = 100;
    }
    if (stamina === void 0) {
      stamina = 100;
    }
    if (hungry === void 0) {
      hungry = 100;
    }
    this._health = 100;
    this._stamina = 100;
    this._hungry = 100;
    this._status = [];
    this._isDead = false;
    this._buried = false;
    this._sick = false;
    this._name = name;
    this._kinship = kinship;
    this._health = health;
    this._stamina = stamina;
    this._hungry = hungry;
    this._dateOfBirth = dateOfBirth;
    this._isDead = isDead;
    this._game = Game_1.Game.getInstance();
  }
  Object.defineProperty(Character.prototype, "name", {
    get: function get() {
      return this._name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "isDead", {
    get: function get() {
      return this._isDead;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "health", {
    get: function get() {
      return this._health;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "stamina", {
    get: function get() {
      return this._stamina;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "kinship", {
    get: function get() {
      return this._game.loc.l(this._kinship);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "hungry", {
    get: function get() {
      return this._hungry;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "buried", {
    get: function get() {
      return this._buried;
    },
    set: function set(buried) {
      this._buried = buried;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Character.prototype, "imageURL", {
    get: function get() {
      return this._imageURL;
    },
    set: function set(imageURL) {
      this._imageURL = imageURL;
    },
    enumerable: false,
    configurable: true
  });
  Character.prototype.walkOneHour = function () {
    for (var _i = 0, _a = this._status; _i < _a.length; _i++) {
      var affliction = _a[_i];
      this.looseHealth(affliction.healthPerHour);
      this._game.logManager.addTempLog(this._name + ' has ' + affliction.name, LogManager_1.LogType.Result);
    }
  };
  Character.prototype.showHealthLostPerHourDueToAllStatus = function () {
    var totalHealth = 0;
    for (var _i = 0, _a = this._status; _i < _a.length; _i++) {
      var status = _a[_i];
      totalHealth += status.healthPerHour;
    }
    return totalHealth;
  };
  Character.prototype.checksIfAnStatusExists = function (statusName) {
    var existingStatusIndex = this._status.findIndex(function (status) {
      return status.name == statusName;
    });
    return existingStatusIndex != -1 ? true : false;
  };
  Character.prototype.addStatus = function (affliction) {
    if (!this.checksIfAnStatusExists(affliction.name)) {
      this._game.logManager.addTempLog(this._name + ' got: ' + affliction.name, LogManager_1.LogType.Result);
      this._status.push(affliction);
    }
  };
  Character.prototype.removeStatus = function (statusToRemove) {
    this._status = this._status.filter(function (status) {
      return status !== statusToRemove;
    });
  };
  Character.prototype.showAfflictions = function () {
    if (this._status.length == 0) {
      return '';
    }
    var afflictions = '';
    for (var _i = 0, _a = this._status; _i < _a.length; _i++) {
      var affliction = _a[_i];
      if (affliction) {
        afflictions += ' -' + affliction.name;
      }
    }
    return afflictions;
  };
  Character.prototype.increaseHungry = function () {
    if (this._hungry <= 0) {
      this.looseHealth(10);
      if (this._isDead) {
        this._game.log.addTempLog(this._name + ' starved to death at day ' + this._game.currentDay, LogManager_1.LogType.StatusChange);
      }
    } else {
      this._hungry = this._hungry - 5;
    }
  };
  Character.prototype.increaseStaminaToMax = function () {
    this._stamina = 100;
  };
  Character.prototype.increaseStamina = function () {
    this._stamina = 20;
  };
  Character.prototype.decreaseStamina = function (staminaToDecrease) {
    if (staminaToDecrease <= 0) {
      throw new Error('Stamina value must be greater than zero');
    }
    this._stamina = this._stamina - staminaToDecrease;
    if (this._stamina <= 0) {
      this._stamina = 0;
      this.looseHealth(20);
      if (this._isDead) {
        this._game.log.addTempLog(this._name + ' died of exhaustion at day ' + this._game.currentDay, LogManager_1.LogType.StatusChange);
      } else {
        this._game.log.addTempLog(this._name + ' is dying of tiredness', LogManager_1.LogType.Result);
      }
    }
  };
  Character.prototype.decreaseHungry = function (hungryToDecrease) {
    if (hungryToDecrease < 0) {
      throw new Error('Hungry to decrease value must be greater than zero');
    }
    if (this._hungry < 100) {
      this._hungry = this._hungry + hungryToDecrease;
    }
    if (this._hungry > 100) {
      this._hungry = 100;
    }
  };
  Character.prototype.getHungry = function () {
    return '🥫' + this._hungry + '%';
  };
  Character.prototype.getHealth = function () {
    return '❤️' + this._health + '%';
  };
  Character.prototype.getStamina = function () {
    return '⚡' + this._stamina + '%';
  };
  Character.prototype.getSickness = function () {
    return this._sick ? 'Sick' : 'Not sick';
  };
  Character.prototype.getDateOfBirth = function () {
    return this._dateOfBirth;
  };
  Character.prototype.sicken = function () {
    this._sick = true;
  };
  Character.prototype.looseHealth = function (healthToLoose) {
    if (healthToLoose < 0 || healthToLoose > 100) {
      throw new Error('Invalid value for healthToLoose');
    }
    if (this._health > 0) {
      this._health -= healthToLoose;
      if (this._health <= 0) {
        this._health = 0;
        this._isDead = true;
        if (this._kinship == 'you') {
          this._game.stateManager.goToState(GameStates_1.GameStates.GAME_OVER);
        }
      }
    }
  };
  Character.prototype.increaseHealth = function (healthToIncrease) {
    this._health += healthToIncrease;
    if (this._health > 100) {
      this._health = 100;
    }
  };
  return Character;
}();
exports.Character = Character;
},{"../Game":"src/Game.ts","../managers/LogManager":"src/managers/LogManager.ts","../enums/GameStates":"src/enums/GameStates.ts"}],"src/entities/Status.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;
var Status = /** @class */function () {
  function Status(name, healthPerHour) {
    this._name = name;
    this._healthPerHour = healthPerHour;
  }
  Object.defineProperty(Status.prototype, "name", {
    get: function get() {
      return this._name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Status.prototype, "healthPerHour", {
    get: function get() {
      return this._healthPerHour;
    },
    enumerable: false,
    configurable: true
  });
  return Status;
}();
exports.Status = Status;
},{}],"src/seeds/AfflictionSeeds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusSeeds = void 0;
var Status_1 = require("../entities/Status");
var StatusSeeds = /** @class */function () {
  function StatusSeeds() {}
  StatusSeeds.getStatusByName = function (name) {
    return StatusSeeds.items.find(function (affliction) {
      return affliction.name == name;
    });
  };
  StatusSeeds.getOneRandomStatus = function () {
    return StatusSeeds.items[StatusSeeds.getRandomArbitrary(0, StatusSeeds.items.length)];
  };
  StatusSeeds.getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  StatusSeeds.items = [new Status_1.Status('Anxiety', 5), new Status_1.Status('Blood loss', 30), new Status_1.Status('Broken ribs', 25), new Status_1.Status('Depressed', 5), new Status_1.Status('Dysentery', 30), new Status_1.Status('Fear', 10), new Status_1.Status('Food poisoning', 20), new Status_1.Status('Infection', 10), new Status_1.Status('Pain', 5), new Status_1.Status('Wounds', 15)];
  return StatusSeeds;
}();
exports.StatusSeeds = StatusSeeds;
},{"../entities/Status":"src/entities/Status.ts"}],"src/managers/CharacterManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterManager = void 0;
var Game_1 = require("../Game");
var Character_1 = require("../entities/Character");
var AfflictionSeeds_1 = require("../seeds/AfflictionSeeds");
var CharacterManager = /** @class */function () {
  function CharacterManager() {
    this.previousCharacters = [];
    this.characters = [];
    this._game = Game_1.Game.getInstance();
    this.createAllCharacters();
    this.savePreviousCharacters();
  }
  CharacterManager.prototype.start = function () {
    for (var i = 0; i < this._game.characters.length; i++) {
      this._game.characters[i].imageURL = document.getElementById("rip-page-image-" + (i + 1)).src;
    }
  };
  CharacterManager.prototype.createAllCharacters = function () {
    this.characters.push(new Character_1.Character('Ethan', 'you', 100, 100, 100, '1985', false));
    this.characters.push(new Character_1.Character('Olivia', 'wife', 100, 100, 100, '1988', false));
    this.characters.push(new Character_1.Character('Michael', 'son', 100, 100, 100, '2003', false));
    this.characters.push(new Character_1.Character('Sophia', 'daughter', 100, 100, 100, '2005', false));
  };
  CharacterManager.prototype.savePreviousCharacters = function () {
    this.previousCharacters = [];
    for (var _i = 0, _a = this.characters; _i < _a.length; _i++) {
      var character = _a[_i];
      this.previousCharacters.push(new Character_1.Character(character.name, character.kinship, character.health, character.stamina, character.hungry, character.getDateOfBirth(), character.isDead));
    }
  };
  CharacterManager.prototype.increaseHungryOfAllCharacters = function () {
    var characters = this.getCharactersAlive();
    for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
      var character = characters_1[_i];
      character.increaseHungry();
    }
  };
  CharacterManager.prototype.decreaseStaminaOfAllCharacters = function (staminToDecrease) {
    var characters = this.getCharactersAlive();
    for (var _i = 0, characters_2 = characters; _i < characters_2.length; _i++) {
      var character = characters_2[_i];
      character.decreaseStamina(staminToDecrease);
    }
  };
  CharacterManager.prototype.increaseStaminaOfAllCharactersToMax = function () {
    var characters = this.getCharactersAlive();
    for (var _i = 0, characters_3 = characters; _i < characters_3.length; _i++) {
      var character = characters_3[_i];
      character.increaseStaminaToMax();
    }
  };
  CharacterManager.prototype.increaseStaminaOfAllCharacters = function () {
    var characters = this.getCharactersAlive();
    for (var _i = 0, characters_4 = characters; _i < characters_4.length; _i++) {
      var character = characters_4[_i];
      character.increaseStamina();
    }
  };
  CharacterManager.prototype.getNumberOfCharactersAlive = function () {
    return this._game.characters.filter(function (character) {
      return !character.isDead;
    }).length;
  };
  CharacterManager.prototype.getCharactersAlive = function () {
    return this._game.characters.filter(function (character) {
      return !character.isDead;
    });
  };
  CharacterManager.prototype.getCharactersDead = function () {
    return this._game.characters.filter(function (character) {
      return character.isDead;
    });
  };
  CharacterManager.prototype.getFirstCharacterDeadAndNotBuried = function () {
    return this._game.characters.find(function (character) {
      return character.isDead && !character.buried;
    });
  };
  CharacterManager.prototype.isInDanger = function () {
    var characters = this.getCharactersAlive();
    for (var _i = 0, characters_5 = characters; _i < characters_5.length; _i++) {
      var character = characters_5[_i];
      if (character.health <= 25 || character.stamina <= 25 || character.hungry <= 25) return true;
    }
    return false;
  };
  CharacterManager.prototype.picksACharacterAtRandom = function () {
    var characters = this.getCharactersAlive();
    var randomNumber = this._game.getRandomArbitrary(characters.length - 1);
    var character = characters[randomNumber];
    return character;
  };
  CharacterManager.prototype.makeSomeoneInTheGroupGetStatus = function (status) {
    var character = this.picksACharacterAtRandom();
    if (status != null) {
      character.addStatus(AfflictionSeeds_1.StatusSeeds.getStatusByName(status));
    } else {
      character.addStatus(AfflictionSeeds_1.StatusSeeds.getOneRandomStatus());
    }
    return character;
  };
  CharacterManager.prototype.decreasesTheHealthOfSomeoneInTheGroup = function () {
    var character = this.picksACharacterAtRandom();
    character.looseHealth(30);
    return character;
  };
  CharacterManager.prototype.statusOfTheCharactersChange = function () {
    for (var i = 0; i < this.previousCharacters.length; i++) {
      if (!this.previousCharacters[i].isDead && (this.previousCharacters[i].health != this.characters[i].health || this.previousCharacters[i].stamina != this.characters[i].stamina || this.previousCharacters[i].hungry != this.characters[i].hungry)) {
        this.previousCharacters = this.characters;
        return true;
      }
    }
    return false;
  };
  return CharacterManager;
}();
exports.CharacterManager = CharacterManager;
},{"../Game":"src/Game.ts","../entities/Character":"src/entities/Character.ts","../seeds/AfflictionSeeds":"src/seeds/AfflictionSeeds.ts"}],"src/localization/en-us.json":[function(require,module,exports) {
module.exports = {
  "walk-one-hour": "Walk (+1 hour)",
  "your-family": "Your Family",
  "miles-to-the-border": "miles to the border",
  "you": "you",
  "wife": "wife",
  "son": "son",
  "daughter": "daughter",
  "day": "day",
  "daylight": "daylight",
  "strength": "Strength",
  "speak": "Speak",
  "stealth": "Stealth",
  "exploration": "Exploration",
  "bag-is-empty": "Bag is empty"
};
},{}],"src/localization/pt-br.json":[function(require,module,exports) {
module.exports = {
  "walk-one-hour": "Andar (+1 hora)",
  "your-family": "Sua Família",
  "miles-to-the-border": "milhas até a fronteira",
  "you": "você",
  "wife": "esposa",
  "son": "filho",
  "daughter": "filha",
  "day": "dia",
  "daylight": "luz do dia",
  "strength": "Força",
  "speak": "Labia",
  "stealth": "Furtividade",
  "exploration": "Exploração",
  "bag-is-empty": "A bolsa esta vazia"
};
},{}],"src/managers/LocalizationManager.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizationManager = exports.Language = void 0;
var Game_1 = require("../Game");
var EnUs = __importStar(require("../localization/en-us.json"));
var PtBr = __importStar(require("../localization/pt-br.json"));
var Language;
(function (Language) {
  Language[Language["EnUs"] = 0] = "EnUs";
  Language[Language["PtBr"] = 1] = "PtBr";
})(Language || (exports.Language = Language = {}));
var LocalizationManager = /** @class */function () {
  function LocalizationManager(language) {
    this._game = Game_1.Game.getInstance();
    this._currentLanguage = language;
  }
  LocalizationManager.prototype.l = function (key) {
    switch (this._currentLanguage) {
      case Language.EnUs:
        return EnUs[key];
      case Language.PtBr:
        return PtBr[key];
      default:
        return 'Localization Error';
    }
  };
  return LocalizationManager;
}();
exports.LocalizationManager = LocalizationManager;
},{"../Game":"src/Game.ts","../localization/en-us.json":"src/localization/en-us.json","../localization/pt-br.json":"src/localization/pt-br.json"}],"src/managers/DialogManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogManager = void 0;
var Game_1 = require("../Game");
var DialogManager = /** @class */function () {
  function DialogManager() {
    this._game = Game_1.Game.getInstance();
  }
  DialogManager.prototype.start = function () {};
  return DialogManager;
}();
exports.DialogManager = DialogManager;
},{"../Game":"src/Game.ts"}],"src/managers/MapManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapManager = void 0;
var Game_1 = require("../Game");
var MapManager = /** @class */function () {
  function MapManager() {
    this._game = Game_1.Game.getInstance();
  }
  MapManager.prototype.start = function () {};
  return MapManager;
}();
exports.MapManager = MapManager;
},{"../Game":"src/Game.ts"}],"src/managers/SkillUpManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillUpManager = void 0;
var Game_1 = require("../Game");
var SkillUpManager = /** @class */function () {
  function SkillUpManager() {
    this._game = Game_1.Game.getInstance();
  }
  SkillUpManager.prototype.start = function () {};
  return SkillUpManager;
}();
exports.SkillUpManager = SkillUpManager;
},{"../Game":"src/Game.ts"}],"src/entities/Clock.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;
var Clock = /** @class */function () {
  function Clock(currentHour, anteMediem) {
    this._currentHour = currentHour;
    this._anteMeridiem = anteMediem;
  }
  Object.defineProperty(Clock.prototype, "currentHour", {
    get: function get() {
      return this._currentHour;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Clock.prototype, "anteMeridiem", {
    get: function get() {
      return this._anteMeridiem;
    },
    enumerable: false,
    configurable: true
  });
  Clock.prototype.nextHour = function () {
    if (this._currentHour == 11) {
      this._anteMeridiem = !this._anteMeridiem;
    }
    if (this._currentHour == 12) {
      this._currentHour = 1;
    } else {
      this._currentHour++;
    }
  };
  Clock.prototype.showTime = function () {
    return (this._currentHour <= 9 ? '0' : '') + this._currentHour.toString() + ':00 ' + (this._anteMeridiem ? 'a.m' : 'p.m');
  };
  return Clock;
}();
exports.Clock = Clock;
},{}],"src/seeds/ItemSeeds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemSeeds = exports.ItemsNames = void 0;
var Item_1 = require("../entities/Item");
var AfflictionSeeds_1 = require("./AfflictionSeeds");
var ItemsNames;
(function (ItemsNames) {
  ItemsNames[ItemsNames["FirstAid"] = 0] = "FirstAid";
  ItemsNames[ItemsNames["Food"] = 1] = "Food";
})(ItemsNames || (exports.ItemsNames = ItemsNames = {}));
var ItemSeeds = /** @class */function () {
  function ItemSeeds() {}
  ItemSeeds.getItens = function (name, amount) {
    this.items[name].amount = amount;
    return this.items[name];
  };
  ItemSeeds.getOneRandomItem = function () {
    return ItemSeeds.items[ItemSeeds.getRandomArbitrary(0, ItemSeeds.items.length)];
  };
  ItemSeeds.getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  ItemSeeds.items = [new Item_1.Item('Bandages', Item_1.ItemType.FirstAid, 10, [AfflictionSeeds_1.StatusSeeds.getStatusByName('Blood ribs'), AfflictionSeeds_1.StatusSeeds.getStatusByName('Broken ribs')]), new Item_1.Item('Herbal Meds', Item_1.ItemType.FirstAid, 5, [AfflictionSeeds_1.StatusSeeds.getStatusByName('Anxiety')]), new Item_1.Item('Antibiotics', Item_1.ItemType.FirstAid, 15, [AfflictionSeeds_1.StatusSeeds.getStatusByName('Infection'), AfflictionSeeds_1.StatusSeeds.getStatusByName('Food poisoning'), AfflictionSeeds_1.StatusSeeds.getStatusByName('Dysentery')]), new Item_1.Item('Antiseptic', Item_1.ItemType.FirstAid, 15, [AfflictionSeeds_1.StatusSeeds.getStatusByName('Wounds')]), new Item_1.Item('Painkillers', Item_1.ItemType.FirstAid, 15, [AfflictionSeeds_1.StatusSeeds.getStatusByName('Pain'), AfflictionSeeds_1.StatusSeeds.getStatusByName('Broken ribs')]), new Item_1.Item('Raw Food', Item_1.ItemType.Food, 10), new Item_1.Item('Vegetables', Item_1.ItemType.Food, 5), new Item_1.Item('Canned Food', Item_1.ItemType.Food, 10), new Item_1.Item('Cigarette', Item_1.ItemType.Food, 15), new Item_1.Item('Beef jerky', Item_1.ItemType.Food, 15), new Item_1.Item('Bear meat', Item_1.ItemType.Food, 15), new Item_1.Item('Chocolate Bar', Item_1.ItemType.Food, 20), new Item_1.Item('Condensed milk', Item_1.ItemType.Food, 15), new Item_1.Item('Cup of coffee', Item_1.ItemType.Food, 10), new Item_1.Item('Cup of herbal tea', Item_1.ItemType.Food, 10), new Item_1.Item('Dog food', Item_1.ItemType.Food, 15), new Item_1.Item('Energy bar', Item_1.ItemType.Food, 25), new Item_1.Item('Water (unsafe)', Item_1.ItemType.Food, 10), new Item_1.Item('Granola bar', Item_1.ItemType.Food, 15), new Item_1.Item('Orange soda', Item_1.ItemType.Food, 20)];
  return ItemSeeds;
}();
exports.ItemSeeds = ItemSeeds;
},{"../entities/Item":"src/entities/Item.ts","./AfflictionSeeds":"src/seeds/AfflictionSeeds.ts"}],"src/entities/Dice.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dice = void 0;
var Dice = /** @class */function () {
  function Dice() {}
  Dice.prototype.roll = function () {
    var min = Math.ceil(1);
    var max = Math.floor(6);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return Dice;
}();
exports.Dice = Dice;
},{}],"src/managers/SkillCheckManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillCheckManager = exports.SkillCheckResults = void 0;
var Dice_1 = require("../entities/Dice");
var Game_1 = require("../Game");
var GameStates_1 = require("../enums/GameStates");
var DiceManager_1 = require("./DiceManager");
var SkillCheckResults;
(function (SkillCheckResults) {
  SkillCheckResults[SkillCheckResults["Success"] = 0] = "Success";
  SkillCheckResults[SkillCheckResults["Failure"] = 1] = "Failure";
})(SkillCheckResults || (exports.SkillCheckResults = SkillCheckResults = {}));
var SkillCheckManager = /** @class */function () {
  function SkillCheckManager() {
    var _this = this;
    this._game = Game_1.Game.getInstance();
    this._resultLabel = document.querySelector("#skill-check-result-label");
    this._skillCheckResultValue = document.querySelector("#skill-check-result-value");
    this._skillCheckResultValueLabel = document.querySelector("#skill-check-result-value-label");
    this._travelBtn = document.querySelector("#skill-check-back-btn");
    this._firstDice = document.querySelector("#first-dice");
    this._secondDice = document.querySelector("#second-dice");
    this._skillCheckExpected = document.querySelector("#skill-check-expected");
    this._travelBtn.addEventListener('click', function () {
      _this.onClickTravel();
    });
    this._diceManager = new DiceManager_1.DiceManager("teste");
  }
  SkillCheckManager.prototype.start = function () {
    var _this = this;
    this._travelBtn.disabled = true;
    this._resultLabel.style.visibility = 'hidden';
    setTimeout(function () {
      _this.startDiceRoll();
    }, 100);
  };
  SkillCheckManager.prototype.startDiceRoll = function () {
    var _this = this;
    var dice = new Dice_1.Dice();
    this._game.audioManager.playDiceSound();
    this._diceTimer = setInterval(function () {
      _this.shakeDice(dice);
    }, 50);
    setTimeout(function () {
      _this.stopShakeDice(dice);
    }, 500);
    this._currentChoice = this._game.eventManager.currentChoice;
  };
  SkillCheckManager.prototype.onClickTravel = function () {
    this._game.audioManager.playButtonSound();
    if (this._game.skillCheckResult == SkillCheckResults.Success) {
      this._currentChoice.skillCheckFields.resultPath.success();
      if (this._currentChoice.skillCheckFields.canGiveItems) {
        this._game.stateManager.goToState(GameStates_1.GameStates.ITEM_PICKER);
        return;
      }
    } else if (this._game.skillCheckResult == SkillCheckResults.Failure) {
      this._currentChoice.skillCheckFields.resultPath.failure();
    }
    this._game.stateManager.goToState(GameStates_1.GameStates.LOG);
  };
  SkillCheckManager.prototype.shakeDice = function (dice) {
    var firstDiceValue = dice.roll();
    var secondDiceValue = dice.roll();
    this.showDiceValues(firstDiceValue, secondDiceValue);
  };
  SkillCheckManager.prototype.stopShakeDice = function (dice) {
    clearInterval(this._diceTimer);
    this._resultLabel.style.visibility = 'visible';
    var firstDiceValue = dice.roll();
    var secondDiceValue = dice.roll();
    var characterStrength = 3;
    var expectedValue = this._currentChoice.skillCheckFields.difficult.value;
    var finalValue = firstDiceValue + secondDiceValue + characterStrength;
    this.showDiceValues(firstDiceValue, secondDiceValue);
    this._skillCheckResultValue.style.textAlign = 'center';
    this._skillCheckResultValue.innerHTML = finalValue.toString();
    this._skillCheckExpected.innerHTML = 'Expected: ' + expectedValue.toString();
    this._travelBtn.disabled = false;
    if (firstDiceValue + secondDiceValue == 12) {
      this._game.audioManager.playSuccessSound();
      this.setCriticalSuccess();
      this._game.skillCheckResult = SkillCheckResults.Success;
      return;
    }
    if (firstDiceValue + secondDiceValue == 2) {
      this._game.audioManager.playFailSound();
      this.setCriticalFailure();
      this._game.skillCheckResult = SkillCheckResults.Failure;
      return;
    }
    if (finalValue >= expectedValue) {
      this._game.audioManager.playSuccessSound();
      this.setSuccess();
      this._game.skillCheckResult = SkillCheckResults.Success;
      return;
    }
    if (finalValue < expectedValue) {
      this._game.audioManager.playFailSound();
      this.setFailure();
      this._game.skillCheckResult = SkillCheckResults.Failure;
      return;
    }
  };
  SkillCheckManager.prototype.showDiceValues = function (firstDiceValue, secondDiceValue) {
    this._firstDice.innerHTML = firstDiceValue.toString();
    this._secondDice.innerHTML = secondDiceValue.toString();
  };
  SkillCheckManager.prototype.setCriticalSuccess = function () {
    this._skillCheckResultValue.style.visibility = 'hidden';
    this._skillCheckResultValueLabel.style.visibility = 'hidden';
    this._skillCheckResultValue.classList.remove('red-color');
    this._skillCheckResultValue.classList.add('green-color');
    this._firstDice.classList.add('green-color');
    this._secondDice.classList.add('green-color');
    this._firstDice.classList.remove('red-color');
    this._secondDice.classList.remove('red-color');
    this._resultLabel.innerHTML = ' CRITICIAL SUCCESS ';
    this._resultLabel.style.fontSize = '1.3em';
    this._resultLabel.classList.remove('red-color');
    this._resultLabel.classList.add('green-color');
  };
  SkillCheckManager.prototype.setSuccess = function () {
    this._skillCheckResultValue.style.visibility = 'visible';
    this._skillCheckResultValueLabel.style.visibility = 'visible';
    this._skillCheckResultValue.classList.remove('red-color');
    this._skillCheckResultValue.classList.add('green-color');
    this._firstDice.classList.remove('green-color');
    this._secondDice.classList.remove('green-color');
    this._firstDice.classList.remove('red-color');
    this._secondDice.classList.remove('red-color');
    this._resultLabel.innerHTML = ' SUCCESS ';
    this._resultLabel.style.fontSize = '2.5em';
    this._resultLabel.classList.remove('red-color');
    this._resultLabel.classList.add('green-color');
  };
  SkillCheckManager.prototype.setCriticalFailure = function () {
    this._skillCheckResultValue.style.visibility = 'hidden';
    this._skillCheckResultValueLabel.style.visibility = 'hidden';
    this._skillCheckResultValue.classList.add('red-color');
    this._skillCheckResultValue.classList.remove('green-color');
    this._firstDice.classList.remove('green-color');
    this._secondDice.classList.remove('green-color');
    this._firstDice.classList.add('red-color');
    this._secondDice.classList.add('red-color');
    this._resultLabel.innerHTML = ' CRITICIAL FAILURE ';
    this._resultLabel.style.fontSize = '1.3em';
    this._resultLabel.classList.add('red-color');
    this._resultLabel.classList.remove('green-color');
  };
  SkillCheckManager.prototype.setFailure = function () {
    this._skillCheckResultValue.style.visibility = 'visible';
    this._skillCheckResultValueLabel.style.visibility = 'visible';
    this._skillCheckResultValue.classList.add('red-color');
    this._skillCheckResultValue.classList.remove('green-color');
    this._firstDice.classList.remove('green-color');
    this._secondDice.classList.remove('green-color');
    this._firstDice.classList.remove('red-color');
    this._secondDice.classList.remove('red-color');
    this._resultLabel.innerHTML = ' FAILURE ';
    this._resultLabel.style.fontSize = '2.5em';
    this._resultLabel.classList.add('red-color');
    this._resultLabel.classList.remove('green-color');
  };
  return SkillCheckManager;
}();
exports.SkillCheckManager = SkillCheckManager;
},{"../entities/Dice":"src/entities/Dice.ts","../Game":"src/Game.ts","../enums/GameStates":"src/enums/GameStates.ts","./DiceManager":"src/managers/DiceManager.ts"}],"src/managers/ItemPickerManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemPickerManager = void 0;
var Game_1 = require("../Game");
var ItemSeeds_1 = require("../seeds/ItemSeeds");
var GameStates_1 = require("../enums/GameStates");
var LogManager_1 = require("../managers/LogManager");
var ItemPickerManager = /** @class */function () {
  function ItemPickerManager() {
    var _this = this;
    this._itemsToPick = [];
    this._myItems = [];
    this._myItemsMax = 2;
    this.itemsFound = 4;
    this._game = Game_1.Game.getInstance();
    this._continueBtn = document.querySelector('#item-picker-page-continue-btn');
    this._continueBtn.addEventListener('click', function () {
      _this.onContinueBtn();
    });
    this._itemsToPickListElement = document.querySelector('#item-picker-page-items-to-pick');
    this._itemsFoundTitle = document.querySelector('#items-found-title');
    this._pageMessageElement = document.querySelector('#item-picker-page-message');
    this._myItemsListElement = document.querySelector('#item-picker-page-item-my-items');
    this._yourItemsTitle = document.querySelector('#your-items-title');
    this._takeAllBtn = document.querySelector('#item-picker-page-take-all-btn');
  }
  ItemPickerManager.prototype.start = function () {
    this.showPageMessage();
    this._itemsToPick = [];
    this._myItems = [];
    this.character = this._game.characterManager.picksACharacterAtRandom();
    for (var i = 0; i < this.itemsFound; i++) {
      var itemFounded = ItemSeeds_1.ItemSeeds.getOneRandomItem();
      this.addItemToPick(itemFounded);
    }
    this.showItems();
  };
  ItemPickerManager.prototype.showPageMessage = function () {
    var _this = this;
    this._itemsFoundTitle.style.display = 'none';
    this._continueBtn.style.display = 'none';
    this._itemsToPickListElement.style.display = 'none';
    this._myItemsListElement.style.display = 'none';
    this._yourItemsTitle.style.display = 'none';
    this._takeAllBtn.style.display = 'none';
    this._pageMessageElement.style.display = 'block';
    setTimeout(function () {
      return _this.showPageElements();
    }, 1500);
  };
  ItemPickerManager.prototype.showPageElements = function () {
    this._itemsFoundTitle.style.display = 'block';
    this._continueBtn.style.display = 'block';
    this._itemsToPickListElement.style.display = 'block';
    this._myItemsListElement.style.display = 'block';
    this._yourItemsTitle.style.display = 'block';
    this._takeAllBtn.style.display = 'block';
    this._pageMessageElement.style.display = 'none';
  };
  ItemPickerManager.prototype.showItems = function () {
    if (this._itemsToPick.length <= this._myItemsMax - this._myItems.length) {
      this._takeAllBtn.disabled = false;
    } else {
      this._takeAllBtn.disabled = true;
    }
    this.showItemsToPick();
    this.showMyItems();
  };
  ItemPickerManager.prototype.showItemsToPick = function () {
    var _this = this;
    this._itemsToPickListElement.innerHTML = '';
    var _loop_1 = function _loop_1(item) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.appendChild(document.createTextNode(item.name + ' (' + item.effect + ') ' + item.showAmount()));
      button.addEventListener('click', function () {
        return _this.selectItemToPick(item);
      });
      if (this_1._myItems.length >= this_1._myItemsMax) {
        button.disabled = true;
      }
      li.appendChild(button);
      this_1._itemsToPickListElement.appendChild(li);
    };
    var this_1 = this;
    for (var _i = 0, _a = this._itemsToPick; _i < _a.length; _i++) {
      var item = _a[_i];
      _loop_1(item);
    }
  };
  ItemPickerManager.prototype.showMyItems = function () {
    var _this = this;
    this._yourItemsTitle.innerHTML = 'Your items - (' + this._myItems.length + '/' + this._myItemsMax + ')';
    this._myItemsListElement.innerHTML = '';
    var _loop_2 = function _loop_2(item) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.appendChild(document.createTextNode(item.name + ' (' + item.effect + ') ' + item.showAmount()));
      button.addEventListener('click', function () {
        return _this.selectItemMyItem(item);
      });
      li.appendChild(button);
      this_2._myItemsListElement.appendChild(li);
    };
    var this_2 = this;
    for (var _i = 0, _a = this._myItems; _i < _a.length; _i++) {
      var item = _a[_i];
      _loop_2(item);
    }
  };
  ItemPickerManager.prototype.selectItemToPick = function (selectedItem) {
    this._game.audioManager.playTakeItemSound();
    this.removeItemToPick(selectedItem.name);
    this.addMyItem(selectedItem);
    this.showItems();
  };
  ItemPickerManager.prototype.selectItemMyItem = function (selectedItem) {
    this._game.audioManager.playThrowSound();
    this.removeMyItem(selectedItem.name);
    this.addItemToPick(selectedItem);
    this.showItems();
  };
  ItemPickerManager.prototype.removeItemToPick = function (itemName) {
    this._itemsToPick = this._itemsToPick.filter(function (item) {
      return item.name !== itemName;
    });
  };
  ItemPickerManager.prototype.removeMyItem = function (itemName) {
    this._myItems = this._myItems.filter(function (item) {
      return item.name !== itemName;
    });
  };
  ItemPickerManager.prototype.addItemToPick = function (itemToPut) {
    var existingItemIndex = this._itemsToPick.findIndex(function (item) {
      return item.name == itemToPut.name;
    });
    if (existingItemIndex >= 0) {
      this._itemsToPick[existingItemIndex].increaseAmount();
    } else {
      this._itemsToPick.push(itemToPut);
    }
  };
  ItemPickerManager.prototype.addMyItem = function (itemToPut) {
    var existingItemIndex = this._myItems.findIndex(function (item) {
      return item.name == itemToPut.name;
    });
    if (existingItemIndex >= 0) {
      this._myItems[existingItemIndex].increaseAmount();
    } else {
      this._myItems.push(itemToPut);
    }
  };
  ItemPickerManager.prototype.onContinueBtn = function () {
    this._game.audioManager.playButtonSound();
    for (var i = 0; i < this._myItems.length; i++) {
      this._game.bagManager.putItem(this._myItems[i]);
      this._game.log.addTempLog(this.character.name + ' picked up ' + this._myItems[i].name, LogManager_1.LogType.Result);
    }
    this._game.stateManager.goToState(GameStates_1.GameStates.LOG);
  };
  return ItemPickerManager;
}();
exports.ItemPickerManager = ItemPickerManager;
},{"../Game":"src/Game.ts","../seeds/ItemSeeds":"src/seeds/ItemSeeds.ts","../enums/GameStates":"src/enums/GameStates.ts","../managers/LogManager":"src/managers/LogManager.ts"}],"src/managers/AudioManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioManager = void 0;
var Game_1 = require("../Game");
var AudioManager = /** @class */function () {
  function AudioManager() {
    this.audioFiles = [];
    this.noSound = false;
    this._game = Game_1.Game.getInstance();
    this.audioFiles = ['success.wav', 'button1.wav', 'dice.mp3', 'fail.mp3', 'take-item.wav', 'write.wav', 'throw.wav', 'ding.wav', 'walk.mpeg'];
    this.audioEffects = new Audio();
    this.audioBackground = new Audio();
    for (var i in this.audioFiles) {
      this.preloadAudio(this.audioFiles[i]);
    }
  }
  AudioManager.prototype.preloadAudio = function (url) {
    var audio = new Audio();
    audio.addEventListener('canplaythrough', this.loadedAudio, false);
    audio.src = url;
  };
  AudioManager.prototype.loadedAudio = function () {
    this.audioLoaded++;
    if (this.audioLoaded == this.audioFiles.length - 1) {
      this.allAudioHaveBeenLoaded();
    }
  };
  AudioManager.prototype.allAudioHaveBeenLoaded = function () {
    console.log('load all audios');
  };
  AudioManager.prototype.playButtonSound = function () {
    this.playAudioEffect('button1.wav');
  };
  AudioManager.prototype.playDiceSound = function () {
    this.playAudioEffect('dice.mp3');
  };
  AudioManager.prototype.playSuccessSound = function () {
    this.playAudioEffect('success.wav');
  };
  AudioManager.prototype.playFailSound = function () {
    this.playAudioEffect('fail.mp3');
  };
  AudioManager.prototype.playTakeItemSound = function () {
    this.playAudioEffect('take-item.wav');
  };
  AudioManager.prototype.playWriteSound = function () {
    this.playAudioEffect('write.wav');
  };
  AudioManager.prototype.playThrowSound = function () {
    this.playAudioEffect('throw.wav');
  };
  AudioManager.prototype.playDingSound = function () {
    this.playAudioEffect('ding.wav');
  };
  AudioManager.prototype.playRainSound = function () {
    this.playAudioLoop('walk.mpeg');
  };
  AudioManager.prototype.playAudioEffect = function (soundName) {
    if (this.noSound) return;
    this.audioEffects.src = 'audio/' + soundName;
    this.audioEffects.play();
  };
  AudioManager.prototype.playAudioLoop = function (soundName) {
    if (this.noSound) return;
    this.audioBackground.src = 'audio/' + soundName;
    this.audioBackground.volume = 0.2;
    if (typeof this.audioBackground.loop == 'boolean') {
      this.audioBackground.loop = true;
    } else {
      this.audioBackground.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
        console.log('loop');
      }, false);
    }
    this.audioBackground.play();
  };
  return AudioManager;
}();
exports.AudioManager = AudioManager;
},{"../Game":"src/Game.ts"}],"src/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;
var EventManager_1 = require("./managers/EventManager");
var GameOverManager_1 = require("./managers/GameOverManager");
var RipManager_1 = require("./managers/RipManager");
var TravelManager_1 = require("./managers/TravelManager");
var LogManager_1 = require("./managers/LogManager");
var BagManager_1 = require("./managers/BagManager");
var StateManager_1 = require("./managers/StateManager");
var GameStates_1 = require("./enums/GameStates");
var CharacterManager_1 = require("./managers/CharacterManager");
var LocalizationManager_1 = require("./managers/LocalizationManager");
var DialogManager_1 = require("./managers/DialogManager");
var MapManager_1 = require("./managers/MapManager");
var SkillUpManager_1 = require("./managers/SkillUpManager");
var Clock_1 = require("./entities/Clock");
var ItemSeeds_1 = require("./seeds/ItemSeeds");
var DiceManager_1 = require("./managers/DiceManager");
var SkillCheckManager_1 = require("./managers/SkillCheckManager");
var ItemPickerManager_1 = require("./managers/ItemPickerManager");
var AudioManager_1 = require("./managers/AudioManager");
var Game = /** @class */function () {
  function Game() {
    this._currentDay = 1;
    this._hours = 0;
    this._distanceToTheBorder = 300;
    this.travelPage = document.getElementById("travel-page");
    this.logPage = document.getElementById("log-page");
    this.eventPage = document.getElementById("event-page");
    this.skillCheckPage = document.getElementById("skill-check-page");
    this.gameOverPage = document.getElementById("game-over-page");
    this.ripPage = document.getElementById("rip-page");
    this.bagPage = document.getElementById("bag-page");
    this.itemPickerPage = document.getElementById("item-picker-page");
    this.dialogPage = document.querySelector("#dialog-page");
    this.mapPage = document.querySelector("#map-page");
    this.skillUpPage = document.querySelector("#skill-up-page");
    this._currentTimeField = document.querySelector("#current-time-field");
    this.playerGuid = this.generateGuid();
  }
  Game.getInstance = function () {
    if (!Game._instance) {
      Game._instance = new Game();
    }
    return Game._instance;
  };
  Game.prototype.start = function () {
    this.loc = new LocalizationManager_1.LocalizationManager(LocalizationManager_1.Language.EnUs);
    var dice = new DiceManager_1.DiceManager("dice-canvas");
    dice.start();
    this.bagManager = new BagManager_1.BagManager();
    //this.addItemsToBag();
    this.characterManager = new CharacterManager_1.CharacterManager();
    this.characterManager.start();
    this.eventManager = new EventManager_1.EventManager();
    this.gameOverManager = new GameOverManager_1.GameOverManager();
    this.skillCheckManager = new SkillCheckManager_1.SkillCheckManager();
    this.ripManager = new RipManager_1.RipManager();
    this.travelManager = new TravelManager_1.TravelManager();
    this._clock = new Clock_1.Clock(8, true);
    this.logManager = new LogManager_1.LogManager();
    this.stateManager = new StateManager_1.StateManager();
    this.itemPickerManager = new ItemPickerManager_1.ItemPickerManager();
    this.dialogManager = new DialogManager_1.DialogManager();
    this.mapManager = new MapManager_1.MapManager();
    this.skillUpManager = new SkillUpManager_1.SkillUpManager();
    this.audioManager = new AudioManager_1.AudioManager();
    this.showDataTime();
    this.stateManager.goToState(GameStates_1.GameStates.TRAVEL);
  };
  Object.defineProperty(Game.prototype, "events", {
    get: function get() {
      return this.eventManager;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Game.prototype, "log", {
    get: function get() {
      return this.logManager;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Game.prototype, "clock", {
    get: function get() {
      return this._clock;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Game.prototype, "hours", {
    get: function get() {
      return this._hours;
    },
    set: function set(hours) {
      this._hours = hours;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Game.prototype, "currentDay", {
    get: function get() {
      return this._currentDay;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Game.prototype, "distanceToTheBorder", {
    get: function get() {
      return this._distanceToTheBorder;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Game.prototype, "characters", {
    get: function get() {
      return this.characterManager.characters;
    },
    enumerable: false,
    configurable: true
  });
  Game.prototype.decreaseTheDistanceToTheBorder = function (distanceToDecrease) {
    this._distanceToTheBorder -= distanceToDecrease;
  };
  Game.prototype.addDaysToCurrentDay = function (daysToAdd) {
    this._currentDay += daysToAdd;
  };
  Game.prototype.addItemsToBag = function () {
    for (var i = 0; i < 10; i++) {
      this.bagManager.putItem(ItemSeeds_1.ItemSeeds.getOneRandomItem());
    }
  };
  Game.prototype.showPage = function (page) {
    page.style.display = 'flex';
  };
  Game.prototype.hidePage = function (page) {
    page.style.display = "none";
  };
  Game.prototype.hideAllPages = function () {
    this.hidePage(this.travelPage);
    this.hidePage(this.logPage);
    this.hidePage(this.eventPage);
    this.hidePage(this.skillCheckPage);
    this.hidePage(this.gameOverPage);
    this.hidePage(this.bagPage);
    this.hidePage(this.ripPage);
    this.hidePage(this.itemPickerPage);
    this.hidePage(this.skillUpPage);
    this.hidePage(this.dialogPage);
    this.hidePage(this.mapPage);
  };
  Game.prototype.showDataTime = function () {
    this._currentTimeField.innerHTML = this._clock.showTime() + ' - day ' + this._currentDay;
    if (this.isDayLight()) {
      this._currentTimeField.innerHTML += ' - daylight';
    } else {
      this._currentTimeField.innerHTML += ' - night';
    }
  };
  Game.prototype.isDayLight = function () {
    if (this._clock.anteMeridiem) {
      if (this._clock.currentHour > 6 && this._clock.currentHour < 12) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this._clock.currentHour > 6 && this._clock.currentHour < 12) {
        return false;
      } else {
        return true;
      }
    }
  };
  Game.prototype.passOneHour = function () {
    if (this._clock.currentHour == 12 && this._clock.anteMeridiem) {
      this.addDaysToCurrentDay(1);
    }
    this._clock.nextHour();
    this.showDataTime();
  };
  Game.prototype.generateGuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };
  Game.prototype.getRandomArbitrary = function (max) {
    return Math.floor(Math.random() * max);
  };
  return Game;
}();
exports.Game = Game;
},{"./managers/EventManager":"src/managers/EventManager.ts","./managers/GameOverManager":"src/managers/GameOverManager.ts","./managers/RipManager":"src/managers/RipManager.ts","./managers/TravelManager":"src/managers/TravelManager.ts","./managers/LogManager":"src/managers/LogManager.ts","./managers/BagManager":"src/managers/BagManager.ts","./managers/StateManager":"src/managers/StateManager.ts","./enums/GameStates":"src/enums/GameStates.ts","./managers/CharacterManager":"src/managers/CharacterManager.ts","./managers/LocalizationManager":"src/managers/LocalizationManager.ts","./managers/DialogManager":"src/managers/DialogManager.ts","./managers/MapManager":"src/managers/MapManager.ts","./managers/SkillUpManager":"src/managers/SkillUpManager.ts","./entities/Clock":"src/entities/Clock.ts","./seeds/ItemSeeds":"src/seeds/ItemSeeds.ts","./managers/DiceManager":"src/managers/DiceManager.ts","./managers/SkillCheckManager":"src/managers/SkillCheckManager.ts","./managers/ItemPickerManager":"src/managers/ItemPickerManager.ts","./managers/AudioManager":"src/managers/AudioManager.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Game_1 = require("./Game");
var game = Game_1.Game.getInstance();
game.start();
},{"./Game":"src/Game.ts"}],"../../AppData/Roaming/nvm/v16.20.2/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52577" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../AppData/Roaming/nvm/v16.20.2/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map