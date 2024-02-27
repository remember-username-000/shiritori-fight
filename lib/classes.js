const c_classes = "classes.js";

/**
 * Class representing a player in the game.
 */
class Player {
    _maxHp;
    _hp;
    _dmgMultiplier;
    _name;
    defeatedOpponent = false;

    /**
     * Constructs a new <pre><code>Player</code></pre>.
     * @param {number} initHP The  initial amount of HP to give to the player. This also sets the player's maximum HP.
     * @param {number} initDmgMultiplier The initial damage multiplier applied to outgoing damage.
     * @param {string} name The name of the player.
     */
    constructor (initHP, initDmgMultiplier, name) {
        this._hp = initHP;
        this._maxHp = initHP;
        this._dmgMultiplier = initDmgMultiplier;

        this._name = name;
    }

    /**
     * Re-initializes the player's HP and damage multiplier.
     * @param {number} initHP The new amount of HP to give to the player. This also sets the player's maximum HP.
     * @param {number} initDmgMultiplier The new damage multiplier applied to outgoing damage.
     */
    reset (initHP, initDmgMultiplier) {
        this._hp = initHP;
        this._maxHp = initHP;
        this._dmgMultiplier = initDmgMultiplier;
    }

    /**
     * Subtracts an amount from the player's HP.
     * @param {number} dmg The amount of HP to subtract from this <pre><code>Player</code></pre>. HP is set to 0 if it goes below.
     */
    takeDamage (dmg) {
        this._hp -= dmg;
        if (this._hp < 0) {
            this._hp = 0;
        }
    }

    /**
     * Subtracts an amount from another <pre><code>Player</code></pre>'s HP, applying a damage multiplier.
     * @param {Player} target The <pre><code>Player</code></pre> to deal damage to.
     * @param {number} outDmg The amount of damage to deal to the <pre><code>target</code></pre>.
     * @param {number} recoilDmg The amount of damage to deal to this <pre><code>Player</code></pre>.
     */
    dealDamage (target, outDmg, recoilDmg) {
        target.takeDamage(this._dmgMultiplier * outDmg);
        if (target.dead()) {
            this.defeatedOpponent = true;
        }

        this.takeDamage(recoilDmg);
    }

    /**
     * Whether or not this <pre><code>Player</code></pre> is dead (has 0 HP).
     * @returns Whether or not this <pre><code>Player</code></pre> has 0 HP.
     */
    dead = function () {
        if (this._hp <= 0) {
            return true;
        }
        return false;
    }

    /**
     * Amount of HP that this <pre><code>Player</code></pre> has remaining.
     * @returns Amount of HP that this <pre><code>Player</code></pre> has remaining.
     */
    hp = function () {
        return this._hp;
    }

    maxHp = function () {
        return this._maxHp;
    }

    getName = function() {
        return this._name;
    }

    setName (name) {
        this._name = name;
    }
}