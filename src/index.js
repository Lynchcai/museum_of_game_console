import './style/main.styl'
import * as THREE from 'three'
// import { TweenLite } from 'gsap/all'
import Room from './scripts/Room.js'
import Video from './scripts/Video.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TetrahedronBufferGeometry } from 'three'




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


/**
 * Material
 */





/**
 * Objects
 */

// Room
const room = new Room()
room.group.position.x = 0
scene.add(room.group)

// Consoles
// Console arcade

// Video
const video_test = new Video('videos/test.mp4')
scene.add(video_test.group)

document.addEventListener(
    'click',
    ()=>{
        video_test.play()
    }
)


// const video = document.getElementById( 'video' );

// const videoTexture = new THREE.VideoTexture( video );
// videoTexture.minFilter = THREE.LinearFilter;
// videoTexture.magFilter = THREE.LinearFilter;
// videoTexture.format = THREE.RGBFormat;


// const movieMaterial = new THREE.MeshBasicMaterial ( { map: videoTexture, overdraw: true})
// const movieGeometry = new THREE.PlaneGeometry( 240, 135, 4, 4) // 16:9
// const movieScreen = new THREE.Mesh( movieGeometry, movieMaterial)
// movieScreen.position.set(-0.22, 1.4, -1.032)
// movieScreen.scale.set(0.0045, 0.0045, 0.0045)
// scene.add(movieScreen)

// document.addEventListener(
//     'click',
//     ()=>{
//         video.play()
//     }
// )


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.z = 8
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