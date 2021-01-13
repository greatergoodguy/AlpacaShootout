const FADE_DURATION = 250
const TITLE_FONT_SIZE = 110

const alpacas = {
    jaka: {
        standby: 'jaka_standby',
        shoot: 'suri_shoot',
        reload: 'suri_reload',
        shield: 'suri_shield',
        hurt: 'suri_hurt',
        stats: {
            heartMax: 3,
            ammoMax: 3,
            shieldMax: 3,
            heart: 3,
            ammo: 3,
            shield: 3
        }
    },
    punka: {
        standby: 'punka_standby',
        shoot: 'suri_shoot',
        reload: 'suri_reload',
        shield: 'suri_shield',
        hurt: 'suri_hurt',
        stats: {
            heartMax: 2,
            ammoMax: 5,
            shieldMax: 1,
            heart: 2,
            ammo: 5,
            shield: 1
        }
    },
    pompaca: {
        standby: 'pompaca_standby',
        shoot: 'suri_shoot',
        reload: 'suri_reload',
        shield: 'suri_shield',
        hurt: 'suri_hurt',
        stats: {
            heartMax: 1,
            ammoMax: 1,
            shieldMax: 1,
            heart: 1,
            ammo: 1,
            shield: 1
        }
    },
    suri: {
        standby: 'suri_standby',
        shoot: 'suri_shoot',
        reload: 'suri_reload',
        shield: 'suri_shield',
        hurt: 'suri_hurt',
        stats: {
            heartMax: 3,
            ammoMax: 3,
            shieldMax: 3,
            heart: 2,
            ammo: 2,
            shield: 2
        }
    }
}

module.exports = { FADE_DURATION, TITLE_FONT_SIZE, alpacas }