const c_classes = "classes.js";

class Player {
    _hp;
    _dmgMultiplier;
    defeatedOpponent = false;

    constructor (initHP, initDmgMultiplier) {
        this._hp = initHP;
        this._dmgMultiplier = initDmgMultiplier;
    }

    takeDamage (dmg) {
        this._hp -= dmg;
    }

    dealDamage (target, outDmg, recoilDmg) {
        target.takeDamage(this._dmgMultiplier * outDmg);
        if (target.dead()) {
            this.defeatedOpponent = true;
        }

        this.takeDamage(recoilDmg);
    }

    dead = function () {
        if (this._hp <= 0) {
            return true;
        }
        return false;
    }

    hp = function () {
        return this._hp;
    }
}