const FADE_DURATION = 250
const TITLE_FONT_SIZE = 110

const alpacas = {
    jaka: {
        standby: 'jaka_standby',
        shoot: 'jaka_shoot',
        reload: 'jaka_reload',
        shield: 'jaka_shield',
        hurt: 'jaka_hurt',
        rest: 'jaka_rest',
        stats: {
            heartMax: 3,
            ammoMax: 3,
            shieldMax: 4,
            heart: 3,
            ammo: 1,
            shield: 3
        }
    },
    suri: {
        standby: 'suri_standby',
        shoot: 'suri_shoot',
        reload: 'suri_reload',
        shield: 'suri_shield',
        hurt: 'suri_hurt',
        rest: 'suri_rest',
        stats: {
            heartMax: 3,
            ammoMax: 4,
            shieldMax: 3,
            heart: 3,
            ammo: 1,
            shield: 3
        }
    }
}

module.exports = { FADE_DURATION, TITLE_FONT_SIZE, alpacas }