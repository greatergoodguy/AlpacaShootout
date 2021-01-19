import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

import PreloaderScene from '../scenes/PreloaderScene'
import TitleScene from '../scenes/TitleScene'
import CreditsScene from '../scenes/CreditsScene'
import LobbyScene from '../scenes/LobbyScene'
import RoomScene from '../scenes/RoomScene'
import GameScene from '../scenes/GameScene'

export default {
    type: Phaser.AUTO,
    parent: "AlpacaShootout",
    dom: {
        createContainer: true
    },
    plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
    },
    width: 800,
    height: 1280,
    scene: [
        PreloaderScene,
        TitleScene,
        CreditsScene,
        LobbyScene,
        RoomScene,
        GameScene
    ]
}