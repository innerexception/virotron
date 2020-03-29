import * as React from 'react'
import * as Phaser from 'phaser'
import MapScene from './RoomScene';

interface Props {
    
}

interface State {
    phaserInstance: Phaser.Game | null
}

export default class Viewscreen extends React.Component<Props, State> {

    state = {
        phaserInstance: null,
        containerRef: React.createRef<HTMLDivElement>()
    }

    componentWillUnmount(){
        this.state.phaserInstance.destroy()
    }

    componentDidMount() {
        this.state.phaserInstance = new Phaser.Game({
            type: Phaser.CANVAS,
            width: this.state.containerRef.current.clientWidth,
            height: this.state.containerRef.current.clientHeight,
            parent: 'canvasEl',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    tileBias: 8,
                }
            },
            render: {
                pixelArt: true
            },
            scene: [
                new MapScene({key: 'map'})
            ]
        })
        window.addEventListener("resize", ()=>{
            let game = (this.state.phaserInstance as Phaser.Game)
            game.canvas.width = this.state.containerRef.current.clientWidth
            game.canvas.height = this.state.containerRef.current.clientHeight
        });
    }

    render() {
        return <div ref={this.state.containerRef} id='canvasEl' style={{width:'1024px', height:'768px', maxHeight:'80vh'}}/>
    }
}