import './style/main.styl'
import * as THREE from 'three'
// import { TweenLite } from 'gsap/all'
import Room from './scripts/Room.js'
import Text from './scripts/Text.js'
import Video from './scripts/Video.js'
import Console_arcade from './scripts/Console_arcade.js'
import Console_wii from './scripts/Console_wii.js'
import Console_wii_gamepad from './scripts/Console_wii_gamepad.js'
import Console_nes from './scripts/Console_nes.js'
import Console_nes_gamepad from './scripts/Console_nes_gamepad.js'
import Console_gameboy from './scripts/Console_gameboy.js'
import Console_switch from './scripts/Console_switch.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'




/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight




/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})




/**
 * Scene
 */
const scene = new THREE.Scene()




/**
 * Lights
 */
const ambiant_light = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambiant_light)


const point_light = new THREE.PointLight(0xffffff, 3, 10)
point_light.position.x = 2
point_light.position.y = 3
point_light.position.z = 4
scene.add(point_light)


/**
 * Material
 */





/**
 * Objects
 */

// Room
const room = new Room()
scene.add(room.group)

// Console arcade
const console_arcade = new Console_arcade()
scene.add(console_arcade.group)

// Console wii
const console_wii = new Console_wii()
scene.add(console_wii.group)

// // Console wii gamepad
// const console_wii_gamepad = new Console_wii_gamepad()
// scene.add(console_wii_gamepad.group)

// Console nes
const console_nes = new Console_nes()
scene.add(console_nes.group)

// Console nes gamepad
const console_nes_gamepad = new Console_nes_gamepad()
scene.add(console_nes_gamepad.group)

// // Console gameboy
// const console_gameboy = new Console_gameboy()
// scene.add(console_gameboy.group)

// Console switch
const console_switch = new Console_switch()
scene.add(console_switch.group)


// Video
const video_test = new Video('videos/test.mp4')
scene.add(video_test.group)

document.addEventListener(
    'click',
    ()=>{
        video_test.play()
    }
)




// Text
const text = new Text('Lorem ipsum dolor sit amet, consectetur adipiscing \nelit, sed do eiusmod tempor incididunt ut labore et\ndolore magna aliqua. Ut enim ad minim veniam, quis\nnostrud exercitation ullamco laboris nisi ut aliquip\nex ea commodo consequat. Duis aute irure dolor in\nreprehenderit in voluptate velit esse cillum dolore\neu fugiat nulla pariatur. Excepteur sint occaecat\ncupidatat non proident, sunt in culpa qui officia\ndeserunt mollit anim id est laborum.')
text.group.position.x = - 0.7
text.group.position.y = 1.65
text.group.position.z = - 1.03
scene.add(text.group)




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.z = 2
camera.position.y = 2
scene.add(camera)




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)




/**
 * Camera controls with a library
 */
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true // Add a sort of Easing




/**
 * Resize
 */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})




/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    // Render
    renderer.render(scene, camera)
}

loop()