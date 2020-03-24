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
const ambient_light = new THREE.AmbientLight(0x555555, 0.4)
ambient_light.position.x = 0
ambient_light.position.y = 0
ambient_light.position.z = 0
scene.add(ambient_light)


const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
directionalLight.position.x = -5
directionalLight.position.y = 10
directionalLight.position.z = 7.5
directionalLight.castShadow = true
scene.add(directionalLight)


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
console_wii.group.position.set(0.6, 1.08, -1.0)
console_wii.group.rotation.set(0, Math.PI*0.5, 0)

scene.add(console_wii.group)

// // Console wii gamepad
// const console_wii_gamepad = new Console_wii_gamepad()
// scene.add(console_wii_gamepad.group)

// Console nes
const console_nes = new Console_nes()
console_nes.group.position.set(0.5, 0.48, -1.1)
console_nes.group.rotation.set(0, -0.5, 0)
scene.add(console_nes.group)

// Console nes gamepad
const console_nes_gamepad = new Console_nes_gamepad()
console_nes_gamepad.group.position.set(0.5, 0.570, -1.1)
console_nes_gamepad.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.9)
scene.add(console_nes_gamepad.group)


// // Console gameboy
// const console_gameboy = new Console_gameboy()
// scene.add(console_gameboy.group)

// Console switch
const console_switch = new Console_switch()
console_switch.group.position.set(-1, 0.951, -1.0)
console_switch.group.rotation.set(0, Math.PI*0.1, 0)
scene.add(console_switch.group)



/**
 * TEST TEST TEST
 */

const material = new THREE.MeshStandardMaterial(
    {
        color: 0xffffff,
        metalness: 0.3, 
        roughness: 0.3
    }
)

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
sphere.receiveShadow = true
sphere.castShadow = true
scene.add(sphere)

console.log(sphere);







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
const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.gammaOutput = true
renderer.gammaFactor = 2.2
renderer.shadowMap.enabled = true

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