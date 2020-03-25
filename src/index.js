import './style/main.styl'
import * as THREE from 'three'
// import { TweenLite } from 'gsap/all'
import Room from './scripts/Room.js'
import Text from './scripts/Text.js'
import Video from './scripts/Video.js'
import Console_arcade from './scripts/Console_arcade.js'
import Console_arcade_video from './scripts/Console_arcade_video.js'
import Console_wii from './scripts/Console_wii.js'
import Console_wii_gamepad from './scripts/Console_wii_gamepad.js'
import Console_nes from './scripts/Console_nes.js'
import Console_nes_gamepad from './scripts/Console_nes_gamepad.js'
import Console_gameboy from './scripts/Console_gameboy.js'
import Console_switch from './scripts/Console_switch.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Bomb_mario from './scripts/Bomb_mario.js'
import Cartridge_duck_hunt_nes from './scripts/Cartridge_duck_hunt_nes.js'
import Cartridge_mario_nes from './scripts/Cartridge_mario_nes.js'
import Headphones from './scripts/Headphones.js'
import Mario_mystery_box_figurine from './scripts/Mario_mystery_box_figurine.js'
import Pokeball_figurine from './scripts/Pokeball_figurine.js'
import Cartridge_pokemon_gameboy from './scripts/Cartridge_pokemon_gameboy.js'
import Poster from './scripts/Poster.js'





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


// const directional_light = new THREE.DirectionalLight(0xFFFFFF, 1)
// directional_light.position.x = -5
// directional_light.position.y = 4
// directional_light.position.z = 1
// directional_light.castShadow = true
// scene.add(directional_light)


const point_light = new THREE.PointLight(0xffffff, 2, 6)
point_light.position.x = 2
point_light.position.y = 4
point_light.position.z = 2
point_light.shadow.camera.top = 2;
point_light.shadow.camera.bottom = - 2;
point_light.shadow.camera.left = - 2;
point_light.shadow.camera.right = 2;
point_light.shadow.camera.near = 0.2;
point_light.shadow.camera.far = 8;
point_light.castShadow = true
point_light.shadow.mapSize.width = 2048
point_light.shadow.mapSize.height = 2048
scene.add(point_light)



/**
 * Light helper
 */
const point_light_helper = new THREE.PointLightHelper(point_light)
scene.add(point_light_helper)




/**
 * Objects
 */

// Room
const room = new Room()
scene.add(room.group)



// Console arcade
const console_arcade = new Console_arcade()
scene.add(console_arcade.group)

const console_arcade_video_test = new Console_arcade_video('videos/test.mp4')
scene.add(console_arcade_video_test.group)

document.addEventListener(
    'click',
    ()=>{
        console_arcade_video_test.play()
    }
)

// Console wii
const console_wii = new Console_wii()
console_wii.group.position.set(0.6, 1.08, -1.0)
console_wii.group.rotation.set(0, Math.PI*0.5, 0)
scene.add(console_wii.group)

// Console wii gamepad
const console_wii_gamepad_01 = new Console_wii_gamepad()
console_wii_gamepad_01.group.position.set(0.57, 0.905, -1.05)
console_wii_gamepad_01.group.rotation.set(0, Math.PI*0.06, 0)
scene.add(console_wii_gamepad_01.group)

const console_wii_gamepad_02 = new Console_wii_gamepad()
console_wii_gamepad_02.group.position.set(0.65, 0.905, -1.0)
console_wii_gamepad_02.group.rotation.set(0, -Math.PI*0.04, 0)
scene.add(console_wii_gamepad_02.group)


// Console nes
const console_nes = new Console_nes()
console_nes.group.position.set(0.5, 0.48, -1.1)
console_nes.group.rotation.set(0, -0.5, 0)
scene.add(console_nes.group)

// Console nes gamepad
const console_nes_gamepad_01 = new Console_nes_gamepad()
console_nes_gamepad_01.group.position.set(0.47, 0.570, -1.15)
console_nes_gamepad_01.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.9)
scene.add(console_nes_gamepad_01.group)

const console_nes_gamepad_02 = new Console_nes_gamepad()
console_nes_gamepad_02.group.position.set(0.53, 0.570, -1.05)
console_nes_gamepad_02.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.7)
scene.add(console_nes_gamepad_02.group)


// Console gameboy
const console_gameboy = new Console_gameboy()
console_gameboy.group.position.set(-1.1, 0.955, -1.3)
console_gameboy.group.rotation.set(0, Math.PI*-0.6, 0)
scene.add(console_gameboy.group)

// Console switch
const console_switch = new Console_switch()
console_switch.group.position.set(-0.9, 0.965, -1.0)
console_switch.group.rotation.set(0, Math.PI*0.1, 0)
scene.add(console_switch.group)

// Decoration
const bomb_mario = new Bomb_mario()
bomb_mario.group.position.set(-1.15, 1, -1.0)
bomb_mario.group.rotation.set(0, Math.PI*1.2, 0)
scene.add(bomb_mario.group)

const cartridge_duck_hunt_nes = new Cartridge_duck_hunt_nes()
cartridge_duck_hunt_nes.group.position.set(0.2, 0.55, -1.0)
cartridge_duck_hunt_nes.group.rotation.set(0, Math.PI*0.2, 0)
scene.add(cartridge_duck_hunt_nes.group)

const cartridge_mario_nes = new Cartridge_mario_nes()
cartridge_mario_nes.group.position.set(0.35, 0.478, -0.9)
cartridge_mario_nes.group.rotation.set(0, Math.PI*0.2, 0)
scene.add(cartridge_mario_nes.group)

const cartridge_pokemon_gameboy = new Cartridge_pokemon_gameboy()
cartridge_pokemon_gameboy.group.position.set(-0.9, 0.958, -1.2)
cartridge_pokemon_gameboy.group.rotation.set(-1.5, Math.PI*0, 0)
scene.add(cartridge_pokemon_gameboy.group)

const headphones = new Headphones()
headphones.group.position.set(-0.5, 0.98, -0.9)
headphones.group.rotation.set(-1.7, Math.PI*2, 0.8)
scene.add(headphones.group)

const mario_mystery_box_figurine = new Mario_mystery_box_figurine()
mario_mystery_box_figurine.group.position.set(-1, 0.173, -0.5)
mario_mystery_box_figurine.group.rotation.set(0, Math.PI*0.1, 0)
scene.add(mario_mystery_box_figurine.group)

const pokeball_figurine = new Pokeball_figurine()
pokeball_figurine.group.position.set(0.15, 0.975, -0.9)
pokeball_figurine.group.rotation.set(1.3, Math.PI*1, 0)
scene.add(pokeball_figurine.group)



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
const text = new Text('Une borne d\'arcade est un des premiers jeu vidéo \ndisponible au grand public notamment dans des \nlieux ouverts au public comme les bars, les centres \ncommerciaux ou certains établissements de \ndivertissement.L\'origine du nom provient des lieux \noù ces bornes étaient souvent installées, sous les \narcades afin de rentabiliser l\'espace. C\'est sur ce \nsupport que l’on a vu apparaître pour la première \nfois l\'icône du jeu vidéo de Nintendo : “Mario”.')
text.group.position.x = - 0.7
text.group.position.y = 1.65
text.group.position.z = - 1.03
// text.group.visible = true
scene.add(text.group)

const text2 = new Text('La Nintendo Entertainment System, par abréviation \nNES, est une des première console de jeux de salon \nfabriquée par l\'entreprise japonaise Nintendo.Elle a \nété distribuée à partir de 1985.La console connut \nun succès mondial, ce qui fixa les normes pour les \nconsoles suivantes notamment en matière de game \ndesign.Super Mario Bros fut le jeu le plus vendu sur \nla console. Son succès fut tel que ce jeu justifiait \nbien souvent l\'achat de la console à lui tout seul.')
text2.group.position.x = - 0.7
text2.group.position.y = 1.65
text2.group.position.z = - 1.03
// text2.group.visible = true
scene.add(text2.group)

const text3 = new Text('La Game Boy est une des premières consoles \nportables de jeu vidéo fabriquée par Nintendo et \nmise en vente au Japon en 1989, c’est la première \nconsole portable qui a démocratisé l’utilisation de \nces dernières dans le monde.Malgré la sortie de \nconsoles portables techniquement plus avancées, \nla Game Boy connaît un franc succès. Les modèles \nGame Boy et Game Boy Color totalisent 118 \nmillions d\'exemplaires vendus à travers le monde.')
text3.group.position.x = - 0.7
text3.group.position.y = 1.65
text3.group.position.z = - 1.03
// text3.group.visible = true
scene.add(text3.group)

const text4 = new Text('La Wii est une console de jeux de salon dot \nde reconnaissance de mouvement, sortie en 2006. \nConsole de la septième génération, tout comme la \nXbox 360 et la PlayStation 3 avec lesquelles elle \nest en rivalité.La Wii est la console de salon la plus \nvendue de sa génération avec 100 millions \nd\'exemplaires écoulés en 2016.Elle a comme \nparticularité d’avoir été une des premières consoles \nà utiliser un accéléromètre capable de détecter la \nposition, l\'orientation et les mouvements dans \nl\'espace de la manette.')
text4.group.position.x = - 0.7
text4.group.position.y = 1.65
text4.group.position.z = - 1.03
// text4.group.visible = true
scene.add(text4.group)

const text5 = new Text('La Nintendo Switch est la première console de jeu \nvidéo à offrir une expérience hybride entre la \nconsole de salon et la console portable.Il suffit de \nrentrer sa console dans  une petite borne connecté \nen HDMI à la télé pour voir son ecran passé sur la \ntélé du salon et offrir une expérience plus agréable \net familiale.La Nintendo Switch est sortie \nmondialement en 2017.')
text5.group.position.x = - 0.7
text5.group.position.y = 1.65
text5.group.position.z = - 1.03
// text5.group.visible = true
scene.add(text5.group)


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 2
camera.position.y = 2
scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xA6D1F3, 1);
renderer.shadowMap.enabled = true;

// Gamma
renderer.gammaOutput = true
renderer.gammaFactor = 2.2

// Shadow
renderer.shadowMap.enabled = true
renderer.shadowMapSoft = true
renderer.shadowMapType = THREE.PCFSoftShadowMap
renderer.shadowMap.autoUpdate = true
renderer.shadowMap.needsUpdate = true

// Post processing
const effectComposer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Pass
const unrealPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealPass.strength = 0.2
unrealPass.radius = 0.2
unrealPass.threshold = 0.05
effectComposer.addPass(unrealPass)



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

    // renderer.setSize(sizes.width, sizes.height)

    effectComposer.setSize(sizes.width, sizes.height)
})




/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    // Render
    // renderer.render(scene, camera)
    effectComposer.render(scene, camera)
}

loop()