import './style/main.styl'
import * as THREE from 'three'
import Room from './scripts/Room.js'
import Text from './scripts/Text.js'
import Video from './scripts/Video.js'
import Console from './scripts/Console.js'
import Console_arcade_video from './scripts/Console_arcade_video.js'
import Raycaster from './scripts/Raycaster.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { TweenLite } from 'gsap/all'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Poster from './scripts/Poster.js'
import Decoration from './scripts/Decoration.js'


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
const console_arcade = new Console('models/gltf/console_arcade/scene.gltf')
console_arcade.group.position.set(1.1, 0.45, -1.05)
console_arcade.group.scale.set(0.02, 0.02, 0.02)
scene.add(console_arcade.group)

const console_arcade_video_test = new Console_arcade_video('videos/test.mp4')
scene.add(console_arcade_video_test.group)

// document.addEventListener(
//     'click',
//     ()=>{
//         console_arcade_video_test.play()
//     }
// )


// Console wii
const console_wii = new Console('models/gltf/console_wii/scene.gltf')
console_wii.group.scale.set(0.06, 0.06, 0.06)
console_wii.group.position.set(0.6, 1.08, -1.0)
console_wii.group.rotation.set(0, Math.PI*0.5, 0)

// Console wii gamepad
const console_wii_gamepad_01 = new Console('models/gltf/console_wii_gamepad/scene.gltf')
console_wii_gamepad_01.group.scale.set(0.000035, 0.000035, 0.000035)
console_wii_gamepad_01.group.position.set(0.57, 0.905, -1.05)
console_wii_gamepad_01.group.rotation.set(0, Math.PI*0.06, 0)

const console_wii_gamepad_02 = new Console('models/gltf/console_wii_gamepad/scene.gltf')
console_wii_gamepad_02.group.scale.set(0.000035, 0.000035, 0.000035)
console_wii_gamepad_02.group.position.set(0.65, 0.905, -1.0)
console_wii_gamepad_02.group.rotation.set(0, -Math.PI*0.04, 0)

// Console wii group
const console_wii_group = new THREE.Group()
console_wii_group.add(console_wii.group)
console_wii_group.add(console_wii_gamepad_01.group)
console_wii_group.add(console_wii_gamepad_02.group)
scene.add(console_wii_group)


// Console nes
const console_nes = new Console('models/gltf/console_nes/scene.gltf')
console_nes.group.scale.set(0.02, 0.02, 0.02)
console_nes.group.position.set(0.5, 0.48, -1.1)
console_nes.group.rotation.set(0, -0.5, 0)

// Console nes gamepad
const console_nes_gamepad_01 = new Console('models/gltf/console_nes_gamepad/scene.gltf')
console_nes_gamepad_01.group.scale.set(0.015, 0.015, 0.015)
console_nes_gamepad_01.group.position.set(0.47, 0.570, -1.15)
console_nes_gamepad_01.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.9)

const console_nes_gamepad_02 = new Console('models/gltf/console_nes_gamepad/scene.gltf')
console_nes_gamepad_02.group.scale.set(0.015, 0.015, 0.015)
console_nes_gamepad_02.group.position.set(0.53, 0.570, -1.05)
console_nes_gamepad_02.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.7)

// Console nes group
const console_nes_group = new THREE.Group()
console_nes_group.add(console_nes.group)
console_nes_group.add(console_nes_gamepad_01.group)
console_nes_group.add(console_nes_gamepad_02.group)
scene.add(console_nes_group)


// Console gameboy
const console_gameboy = new Console('models/gltf/console_gameboy/scene.gltf')
console_gameboy.group.scale.set(0.0007, 0.0007, 0.0007)
console_gameboy.group.position.set(-1.1, 0.955, -1.3)
console_gameboy.group.rotation.set(0, Math.PI*-0.6, 0)
scene.add(console_gameboy.group)


// Console switch
const console_switch = new Console('models/gltf/console_switch_and_gamepad/scene.gltf')
console_switch.group.scale.set(0.01, 0.01, 0.01)
console_switch.group.position.set(-0.9, 0.965, -1.0)
console_switch.group.rotation.set(0, Math.PI*0.1, 0)
scene.add(console_switch.group)


// Decoration
// const bomb_mario = new Decoration('models/gltf/bob-omb_mario_figurine/scene.gltf')
// bomb_mario.group.position.set(-1.15, 1, -1.0)
// bomb_mario.group.rotation.set(0, Math.PI*1.2, 0)
// bomb_mario.group.scale.set(0.0005, 0.0005, 0.0005)
// scene.add(bomb_mario.group)

const cartridge_duck_hunt_nes = new Decoration('models/gltf/cartridge_duck_hunt_nes/scene.gltf')
cartridge_duck_hunt_nes.group.position.set(0.2, 0.528, -1.0)
cartridge_duck_hunt_nes.group.rotation.set(0, Math.PI*0.2, 0)
cartridge_duck_hunt_nes.group.scale.set(0.000025, 0.000025, 0.000025)
scene.add(cartridge_duck_hunt_nes.group)

const cartridge_mario_nes = new Decoration('models/gltf/cartridge_mario_nes/scene.gltf')
cartridge_mario_nes.group.position.set(0.35, 0.478, -0.9)
cartridge_mario_nes.group.rotation.set(0, Math.PI*0.2, 0)
cartridge_mario_nes.group.scale.set(0.0005, 0.0005, 0.0005)
scene.add(cartridge_mario_nes.group)

const cartridge_pokemon_gameboy = new Decoration('models/gltf/cartridge_pokemon_gameboy/scene.gltf')
cartridge_pokemon_gameboy.group.position.set(-0.95, 0.958, -1.15)
cartridge_pokemon_gameboy.group.rotation.set(-1.5, Math.PI*0, 0)
cartridge_pokemon_gameboy.group.scale.set(1, 1, 1)
scene.add(cartridge_pokemon_gameboy.group)

const headphones = new Decoration('models/gltf/headphones/scene.gltf')
headphones.group.position.set(-0.5, 0.98, -0.9)
headphones.group.rotation.set(-1.7, Math.PI*2, 0.8)
headphones.group.scale.set(0.02, 0.02, 0.02)
scene.add(headphones.group)

const mario_mystery_box_figurine = new Decoration('models/gltf/mario_mystery_box_figurine/scene.gltf')
mario_mystery_box_figurine.group.position.set(-1, 0.173, -0.5)
mario_mystery_box_figurine.group.rotation.set(0, Math.PI*0.1, 0)
mario_mystery_box_figurine.group.scale.set(0.05, 0.05, 0.05)
scene.add(mario_mystery_box_figurine.group)

const pokeball_figurine = new Decoration('models/gltf/pokeball_figurine/scene.gltf')
pokeball_figurine.group.position.set(0.15, 0.975, -0.9)
pokeball_figurine.group.rotation.set(1.3, Math.PI*1, 0)
pokeball_figurine.group.scale.set(0.004, 0.004, 0.004)
scene.add(pokeball_figurine.group)

const cable = new Decoration('models/gltf/cable/scene.gltf')
cable.group.position.set(-0.8, 0.96, -1.19)
cable.group.rotation.set(0, Math.PI*-0.5, 0)
cable.group.scale.set(0.1, 0.1, 0.1)
scene.add(cable.group)

const zelda_shield = new Decoration('models/gltf/zelda_shield/scene.gltf')
zelda_shield.group.position.set(-0.3, 0.6, -0.72)
zelda_shield.group.rotation.set(-0.5, Math.PI*-2, 0.8)
zelda_shield.group.scale.set(0.1, 0.1, 0.1)
scene.add(zelda_shield.group)


const plante_piranha = new Decoration('models/gltf/plante_piranha/scene.gltf')
plante_piranha.group.position.set(0.63, 1.02, -1.25)
plante_piranha.group.rotation.set(0, Math.PI*0, 0)
plante_piranha.group.scale.set(0.0004, 0.0004, 0.0004)
scene.add(plante_piranha.group)

const battery_duracell = new Decoration('models/gltf/battery_duracell/scene.gltf')
battery_duracell.group.position.set(0.5, 0.962, -0.9)
battery_duracell.group.rotation.set(1.2, Math.PI*0.25, 0.5)
battery_duracell.group.scale.set(0.001, 0.001, 0.001)
scene.add(battery_duracell.group)

const picture_frame = new Decoration('models/gltf/picture_frame/scene.gltf')
picture_frame.group.position.set(-1.14, 0.955, -0.95)
picture_frame.group.rotation.set(0, Math.PI*-0.30, 0)
picture_frame.group.scale.set(0.04, 0.04, 0.03)
scene.add(picture_frame.group)

const box_nes = new Decoration('models/gltf/box_nes/scene.gltf')
box_nes.group.position.set(0.7, 0.498, -0.9)
box_nes.group.rotation.set(-1.5, Math.PI*0, -0.4)
box_nes.group.scale.set(0.02, 0.02, 0.02)
scene.add(box_nes.group)

const power_up_figurine = new Decoration('models/gltf/power_up_figurine/scene.gltf')
power_up_figurine.group.position.set(0.3, 0.99, -1.05)
power_up_figurine.group.rotation.set(0, Math.PI*-0.6, 0)
power_up_figurine.group.scale.set(0.04, 0.04, 0.04)
scene.add(power_up_figurine.group)

// Poster
const alien = new Poster('poster_affiche/alien.jpg')
alien.group.position.set(1.8, 1.7, -1.33)
alien.group.scale.set(0.002, 0.005, 0.002)
scene.add(alien.group)

const matrix = new Poster('poster_affiche/matrix.jpg')
matrix.group.position.set(0.5, 2, -1.33)
matrix.group.scale.set(0.002, 0.005, 0.002)
scene.add(matrix.group)

const le_seigneur_des_anneaux = new Poster('poster_affiche/le_seigneur_des_anneaux.jpg')
le_seigneur_des_anneaux.group.position.set(-0.8, 2, -1.33)
le_seigneur_des_anneaux.group.scale.set(0.002, 0.005, 0.002)
scene.add(le_seigneur_des_anneaux.group)

const terminator = new Poster('poster_affiche/Terminator.jpg')
terminator.group.position.set(-0.15, 2.05, -1.33)
terminator.group.scale.set(0.002, 0.005, 0.002)
scene.add(terminator.group)

const animal_crossing = new Poster('poster_affiche/animal_crossing.jpg')
animal_crossing.group.position.set(-0.95, 1.41, -1.33)
animal_crossing.group.scale.set(0.002, 0.003, 0.003)
scene.add(animal_crossing.group)

const star_wars = new Poster('poster_affiche/star_wars.jpg')
star_wars.group.position.set(-1.2, 1.7, -0.75)
star_wars.group.rotation.set(0, Math.PI*0.5, 0)
star_wars.group.scale.set(0.002, 0.005, 0.002)
scene.add(star_wars.group)

const raycaster = new THREE.Raycaster()


// Video
const video_test = new Video('videos/gameboy.mp4')
scene.add(video_test.group)

document.addEventListener(
    'click',
    ()=>{
        video_test.play()
    }
)




// Text
const text_console_arcade = new Text('Une borne d\'arcade est un des premiers jeu vidéo disponible au grand public \n\nnotamment dans des lieux ouverts au public comme les bars, les centres \n\ncommerciaux ou certains établissements de divertissement. L\'origine du nom \n\nprovient des lieux où ces bornes étaient souvent installées, sous les arcades \n\nafin de rentabiliser l\'espace. C\'est sur ce support que l’on a vu apparaître \n\npour la première fois l\'icône du jeu vidéo de Nintendo : “Mario”.')
text_console_arcade.group.visible = true
scene.add(text_console_arcade.group)

const text_console_nes = new Text('La Nintendo Entertainment System, par abréviation NES, est une des premières \n\nconsoles de jeux de salon fabriquée par l\'entreprise japonaise Nintendo.\n\nElle a été distribuée à partir de 1985 ; La console connut un succès mondial, \n\nce qui fixa les normes pour les consoles suivantes notamment en matière \n\nde game design. Super Mario Bros fut le jeu le plus vendu sur la console. \n\nSon succès fut tel que ce jeu justifiait bien souvent l\'achat de la console \n\nà lui tout seul.')
// text_console_nes.group.visible = true
scene.add(text_console_nes.group)

const text_console_gameboy = new Text('La Game Boy est une des premières consoles portables de jeu vidéo fabriquée \n\npar Nintendo et mise en vente au Japon en 1989, c’est la première console \n\nportable qui a démocratisé l’utilisation de ces dernières dans le monde.\n\nMalgré la sortie de consoles portables techniquement plus avancées, \n\nla Game Boy connaît un franc succès. Les modèles Game Boy et Game Boy Color \n\ntotalisent 118 millions d\'exemplaires vendus à travers le monde.')
// text_console_gameboy.group.visible = true
scene.add(text_console_gameboy.group)

const text_console_wii = new Text('La Wii est une console de jeux de salon dot de reconnaissance de mouvement, \n\nsortie en 2006. Console de la septième génération, tout comme la Xbox 360 et \n\nla PlayStation 3 avec lesquelles elle est en rivalité. La Wii est la console de salon \n\nla plus vendue de sa génération avec 100 millions d\'exemplaires écoulés en 2016.\n\nElle a comme particularité d’avoir été une des premières consoles à utiliser un \n\naccéléromètre capable de détecter la position, l\'orientation et les mouvements \n\ndans l\'espace de la manette.')
// text_console_wii.group.visible = true
scene.add(text_console_wii.group)

const text_console_switch = new Text('La Nintendo Switch est la première console de jeu vidéo à offrir une expérience \n\nhybride entre la console de salon et la console portable. Il suffit de rentrer sa \n\nconsole dans  une petite borne connecté en HDMI à la télé pour voir son ecran \n\npassé sur la télé du salon et offrir une expérience plus agréable et familiale.\n\nLa Nintendo Switch est sortie mondialement en 2017.')
// text_console_switch.group.visible = true
scene.add(text_console_switch.group)




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 8)


// Position front basket
// camera.position.set (2, 1.5, 1)
// camera.lookAt(2, 1.25, -2)

// Position front arcade console
// camera.position.set (1.1, 1.5, 1)
// camera.lookAt(1.1, 1.25, -2)


// Position front screen
let camera_parallax_strength = 0.25

// Camera pos
let camera_pos = {
    x: -0.25,
    y: 1.5,
    z: 1
}

camera.position.set (camera_pos.x, camera_pos.y, camera_pos.z)

// Camera look at
let camera_look_at_pos = {
    x: -0.25,
    y: 1.25,
    z: -2
}

// Camera movement detection

let camera_to_arcade = false

const camera_reset = ()=>{
    camera_to_arcade = false
}

document.addEventListener(
    'click',
    ()=>{
        setTimeout(
            ()=>{
                if (camera_to_arcade) {
                    TweenLite.to(
                        camera_pos,
                        1,
                        {
                            x: 1.1,
                            y: 1.5,
                            z: 1,
                            ease: 'Power3.easeInOut'
                        }
                    )
                    TweenLite.to(
                        camera_look_at_pos,
                        1,
                        {
                            x: 1.1,
                            y: 1.25,
                            z: -2,
                            ease: 'Power3.easeInOut'
                        }
                    )
                }
                else{
                    TweenLite.to(
                        camera_pos,
                        1,
                        {
                            x: -0.25,
                            y: 1.5,
                            z: 1,
                            ease: 'Power3.easeInOut'
                        }
                    )
                    TweenLite.to(
                        camera_look_at_pos,
                        1,
                        {
                            x: -0.25,
                            y: 1.25,
                            z: -2,
                            ease: 'Power3.easeInOut'
                        }
                    )
                }
            }, 10
        )
    }
)
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
unrealPass.strength = 0.05
unrealPass.radius = 0.2
unrealPass.threshold = 0.05
effectComposer.addPass(unrealPass)

// Render
document.body.appendChild(renderer.domElement)


/**
 * Camera controls with a library
 */
// const cameraControls = new OrbitControls(camera, renderer.domElement)
// cameraControls.zoomSpeed = 0.3
// cameraControls.enableDamping = true





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
 * Object movement
 */

// Hover console detection - false or true
let hover_console_switch = false
let hover_console_wii = false
let hover_console_nes = false
let hover_console_gameboy = false
let hover_console_arcade = false

// Click console detection - null or not null
let click_console_switch = null
let click_console_wii = null
let click_console_wii_gamepad_01 = null
let click_console_wii_gamepad_02 = null
let click_console_nes = null
let click_console_nes_gamepad_01 = null
let click_console_nes_gamepad_02 = null
let click_console_gameboy = null
let click_console_arcade = null


// Object movement translation
const object_movement_translation = (object, x, y, z)=>{
    TweenLite.to(
        object.position,
        1,
        {
            // x: -0.9,
            // y: 0.965,
            // z: -1,
            x: x,
            y: y,
            z: z,
            ease: 'Power3.easeInOut'
        }
    )
}

// Object movement rotation
const object_movement_rotation = (object) => {
    return setInterval(
        () => {
            setTimeout(
                ()=>{
                    object.rotation.x += 0.007
                    object.rotation.y += 0.01
                    object.rotation.z += 0.013
                    if (object.rotation.x > Math.PI*2)
                        object.rotation.x - Math.PI*2
                    if (object.rotation.y > Math.PI*2)
                        object.rotation.y - Math.PI*2
                    if (object.rotation.z > Math.PI*2)
                        object.rotation.z - Math.PI*2
                }, 200
            )
        }, 40
    )
}

// Object movement rotation reset
const object_movement_rotation_reset = (object, x, y, z) => {
    TweenLite.to(
        object.rotation,
        1,
        {
            x: x,
            y: y,
            z: z,
            ease: 'Power3.easeInOut'
        }
    )
}


document.addEventListener(
    'click',
    () => {
        // Console switch
        if(hover_console_switch) {
            camera_reset()

            // Start animation translation
            object_movement_translation(console_switch.group, -0.25, 1, -0.5)

            // Start animation rotation
            if (click_console_switch == null) {
                click_console_switch = object_movement_rotation(console_switch.group)
            }
        } else {
            // Reset animation translation
            object_movement_translation(console_switch.group, -0.9, 0.965, -1)

            // Reset animation rotation
            clearInterval(click_console_switch)
            object_movement_rotation_reset(console_switch.group, 0, Math.PI*0.1, 0)
            click_console_switch = null
        }




        // Console wii
        if(hover_console_wii) {
            camera_reset()

            // Start animation translation
            object_movement_translation(console_wii.group, -0.25, 1.1, -0.5)
            object_movement_translation(console_wii_gamepad_01.group, -0.25, 1, -0.5)
            object_movement_translation(console_wii_gamepad_02.group, -0.25, 0.9, -0.5)

            // Start animation rotation
            if (click_console_wii == null) {
                click_console_wii = object_movement_rotation(console_wii.group)
                click_console_wii_gamepad_01 = object_movement_rotation(console_wii_gamepad_01.group)
                click_console_wii_gamepad_02 = object_movement_rotation(console_wii_gamepad_02.group)
            }
        } else {
            // Reset animation translation
            object_movement_translation(console_wii.group, 0.6, 1.08, -1.0)
            object_movement_translation(console_wii_gamepad_01.group, 0.57, 0.905, -1.05)
            object_movement_translation(console_wii_gamepad_02.group, 0.65, 0.905, -1.0)

            // Reset animation rotation
            clearInterval(click_console_wii)
            clearInterval(click_console_wii_gamepad_01)
            clearInterval(click_console_wii_gamepad_02)
            object_movement_rotation_reset(console_wii.group, 0, Math.PI*0.5, 0)
            object_movement_rotation_reset(console_wii_gamepad_01.group, 0, Math.PI*0.06, 0)
            object_movement_rotation_reset(console_wii_gamepad_02.group, 0, -Math.PI*0.04, 0)
            click_console_wii = null
        }




        // Console nes
        if(hover_console_nes) {
            camera_reset()

            // Start animation translation
            object_movement_translation(console_nes.group, -0.25, 1, -0.5)
            object_movement_translation(console_nes_gamepad_01.group, -0.30, 1.15, -0.25)
            object_movement_translation(console_nes_gamepad_02.group, -0.15, 1.1, -0.25)

            // Start animation rotation
            if (click_console_nes == null) {
                click_console_nes = object_movement_rotation(console_nes.group)
                click_console_nes_gamepad_01 = object_movement_rotation(console_nes_gamepad_01.group)
                click_console_nes_gamepad_02 = object_movement_rotation(console_nes_gamepad_02.group)
            }
        } else {
            // Reset animation translation
            object_movement_translation(console_nes.group, 0.5, 0.48, -1.1)
            object_movement_translation(console_nes_gamepad_01.group, 0.47, 0.570, -1.15)
            object_movement_translation(console_nes_gamepad_02.group, 0.53, 0.570, -1.05)

            // Reset animation rotation
            clearInterval(click_console_nes)
            clearInterval(click_console_nes_gamepad_01)
            clearInterval(click_console_nes_gamepad_02)
            object_movement_rotation_reset(console_nes.group, 0, -0.5, 0)
            object_movement_rotation_reset(console_nes_gamepad_01.group, Math.PI/2, Math.PI, Math.PI*0.9)
            object_movement_rotation_reset(console_nes_gamepad_02.group, Math.PI/2, Math.PI, Math.PI*0.7)
            click_console_nes = null
        }




        // Console gameboy
        if(hover_console_gameboy) {
            camera_reset()

            // Start animation translation
            object_movement_translation(console_gameboy.group, -0.25, 1, -0.5)

            // Start animation rotation
            if (click_console_gameboy == null) {
                click_console_gameboy = object_movement_rotation(console_gameboy.group)
            }
        } else {
            // Reset animation translation
            object_movement_translation(console_gameboy.group, -1.1, 0.955, -1.3)

            // Reset animation rotation
            clearInterval(click_console_gameboy)
            object_movement_rotation_reset(console_gameboy.group, 0, Math.PI*-0.6, 0)
            click_console_gameboy = null
        }




        // Console Arcade
        if(hover_console_arcade){
            camera_reset()
            camera_to_arcade=true
        }

    }
)


// Console arcade




/**
 * Loop
 */


const loop = () => {
    window.requestAnimationFrame(loop)
    // Render
    effectComposer.render(scene, camera)

    Raycaster
    const raycaster_cursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
    raycaster.setFromCamera(raycaster_cursor, camera)




    // Raycast console switch
    const intersects_switch = new Raycaster(console_switch.group, hover_console_switch, raycaster)
    hover_console_switch = intersects_switch.hover

    // Raycast console wii
    const intersects_wii = new Raycaster(console_wii_group, hover_console_wii, raycaster)
    hover_console_wii = intersects_wii.hover

    // Raycast console nes
    const intersects_nes = new Raycaster(console_nes_group, hover_console_nes, raycaster)
    hover_console_nes = intersects_nes.hover

    // Raycast console gameboy
    const intersects_gameboy = new Raycaster(console_gameboy.group, hover_console_gameboy, raycaster)
    hover_console_gameboy = intersects_gameboy.hover

    // Raycast console arcade
    const intersects_arcade = new Raycaster(console_arcade.group, hover_console_arcade, raycaster)
    hover_console_arcade = intersects_arcade.hover




    // Change cursor on hover
    if(hover_console_wii || hover_console_switch || hover_console_nes || hover_console_gameboy || hover_console_arcade){
        document.body.style.cursor = 'pointer'
    }
    else{
        document.body.style.cursor = 'default'
    }


    // Camera parallax
    camera.position.x = camera_pos.x + cursor.x * camera_parallax_strength
    camera.position.y = camera_pos.y + cursor.y * - camera_parallax_strength
    camera.lookAt(camera_look_at_pos.x, camera_look_at_pos.y, camera_look_at_pos.z)


    // Object movement rotation


}

loop()
