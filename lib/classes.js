const c_classes = "classes.js";

class Player {
    constructor (initHP, initDmgMultiplier) {
        this._hp = initHP;
        this._dmgMultiplier = initDmgMultiplier;
    }

    takeDamage (dmg) {
        this._hp -= dmg;
    }

    dealDamage (target, dmg) {
        target.takeDamage(this._dmgMultiplier * dmg);
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