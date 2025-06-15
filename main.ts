/**
 * Quick FPS , allows 50+ FPS, starts by callling setFpS with a target of 60 FPS
 */
namespace QuickFrame {
    /**
     * Calls the Internal function to update the screen with the provided image
     */
    //% shim=pxt::updateScreen
    export function updateScreen(img: Image) { }

    let fps2 = 0
    /**
     * Current FPS
     */
    export let fps = 0
    export let _setFPS = 0
    export let delta = 1000 / 50
    let _start = 0
    let _end = 0
    game.onUpdateInterval(1000, function () { fps = fps2; fps2 = 0 })
    export let scene = game.currentScene();
    /** 
     * Force a Frame , called automaticly when SetFPS is ran to set the FPS target
    */
    export function forceFrame() {
        _start = control.millis()
        scene.physicsEngine.move(delta);
        callbacks.forEach((a) => a())
        scene.render();
        updateScreen(screen);
        _end = 0
        delta = (_end - _start) / 1000
        fps2++;
    }
    let callbacks: [() => void] = [function () { }]
    /** 
     * Regiter a Function to run each frame.
    */
    export function onFrame(func: () => void) {
        callbacks.push(func)
    }

    /** 
     * the FPS that when setFPS is called to run at , the frames go as fast as possible
    */
    export const MAX_FPS = 900
    /**
     * The id of the Frame force task , do clearInterval(QuickFrame.taskFPSid) to clear the Frame force task.
     */
    export let taskFPSid = 0
    /** 
     * Set the FPS target
    */
    export function setFPS(fps: number) {
        _setFPS = fps
        clearInterval(taskFPSid)
        taskFPSid = setInterval(forceFrame, 1000 / fps);
    }
    /**
     * Make it run at MAX FPS 
     */
    export function throttle() {
        setFPS(900)
    }
    setFPS(60)
}