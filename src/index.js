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



// /**
//  * Introduction
//  */

import img_click_src from './images/click.png'
import img_spacebar_src from './images/spacebar.png' 

// Declare variable
const $intro_container = document.querySelector('.container_intro')
const $img_container = $intro_container.querySelector('.img_container')
const $img_click = $img_container.querySelector('.img_click')
const $img_spacebar = $img_container.querySelector('.img_spacebar')
const $text = $intro_container.querySelector('.main_text_intro')
let intro_finish = 0 // 0 = false, 1 = true, 2 = cancel

// Img source
$img_click.src = img_click_src
$img_spacebar.src = img_spacebar_src

// Texts
const texts = []
// texts.push('Hey ! Salut toi !')
// texts.push('Comment ça va ?')
// texts.push('Bienvenue dans le musée des grandes consoles de Nintendo')
// texts.push('Alors visite la chambre et découvre les secrets qu\'elle renferme !')
// texts.push('Ah oui attend !')
// texts.push('J\'ai oublié de te donner les commandes')
// texts.push('Maintenant amuse-toi bien !')
texts.push('Appuyez sur la touche \'Espace\' pour continuer')
let speed = 50 /* The speed/duration of the effect in milliseconds */


// Typing text
let text_number = 0
const typing_text = (text)=> {
    let i = 0
    $text.textContent = '­'
    if (i < text.length) {
        // Write text
        const text_interval = setInterval(
            ()=>{
                $text.textContent += text.charAt(i)
                i++
            }, speed
        )
        // Stop write text
        setTimeout(
            ()=>{
                // Write next text
                // if (text_number < 7) {
                //     text_number += 1
                //     clearInterval(text_interval)
                //     typing_text(texts[text_number])
                // }
                // Blink end text
                // else{
                    setInterval(
                        ()=>{
                            $text.classList.toggle('blink')
                        }, 1000
                    )
                    intro_finish = 1
                // }
                // Show tutorial images
                // if (text_number == 5) {
                //     $img_container.classList.add('show')
                // }
            }, (speed * text.length)
        )
    }
}


/**
 * Commands
 */
const $commands = document.querySelector('.commands')



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

// TV detection
const tv = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 135, 4, 4),
    new THREE.MeshStandardMaterial({ color: 0xff8866, transparent: true, opacity: 0})
)
tv.position.set(-0.22, 1.4, -1.05)
tv.scale.set(0.0045, 0.0045, 0.0045)
scene.add(tv)

// Console switch
const console_switch = new Console('./models/gltf/console_switch_and_gamepad/scene.gltf')
console_switch.group.scale.set(0.01, 0.01, 0.01)
console_switch.group.position.set(-0.9, 0.965, -1.0)
console_switch.group.rotation.set(0, Math.PI*0.1, 0)
scene.add(console_switch.group)


// Console wii
const console_wii = new Console('./models/gltf/console_wii/scene.gltf')
console_wii.group.scale.set(0.06, 0.06, 0.06)
console_wii.group.position.set(0.6, 1.08, -1.0)
console_wii.group.rotation.set(0, Math.PI*0.5, 0)


// Console wii gamepad
const console_wii_gamepad_01 = new Console('./models/gltf/console_wii_gamepad/scene.gltf')
console_wii_gamepad_01.group.scale.set(0.000035, 0.000035, 0.000035)
console_wii_gamepad_01.group.position.set(0.57, 0.905, -1.05)
console_wii_gamepad_01.group.rotation.set(0, Math.PI*0.06, 0)

const console_wii_gamepad_02 = new Console('./models/gltf/console_wii_gamepad/scene.gltf')
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
const console_nes = new Console('./models/gltf/console_nes/scene.gltf')
console_nes.group.scale.set(0.02, 0.02, 0.02)
console_nes.group.position.set(0.5, 0.48, -1.1)
console_nes.group.rotation.set(0, -0.5, 0)


// Console nes gamepad
const console_nes_gamepad_01 = new Console('./models/gltf/console_nes_gamepad/scene.gltf')
console_nes_gamepad_01.group.scale.set(0.015, 0.015, 0.015)
console_nes_gamepad_01.group.position.set(0.47, 0.570, -1.15)
console_nes_gamepad_01.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.9)

const console_nes_gamepad_02 = new Console('./models/gltf/console_nes_gamepad/scene.gltf')
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
const console_gameboy = new Console('./models/gltf/console_gameboy/scene.gltf')
console_gameboy.group.scale.set(0.0007, 0.0007, 0.0007)
console_gameboy.group.position.set(0.15, 0.956, -1.05)
console_gameboy.group.rotation.set(0, Math.PI*-0.6, 0)
scene.add(console_gameboy.group)


// Console arcade
const console_arcade = new Console('./models/gltf/console_arcade/scene.gltf')
console_arcade.group.position.set(1.1, 0.45, -1.05)
console_arcade.group.scale.set(0.02, 0.02, 0.02)
scene.add(console_arcade.group)



const cartridge_duck_hunt_nes = new Decoration('./models/gltf/cartridge_duck_hunt_nes/scene.gltf')
cartridge_duck_hunt_nes.group.position.set(0.2, 0.528, -1.0)
cartridge_duck_hunt_nes.group.rotation.set(0, Math.PI*0.2, 0)
cartridge_duck_hunt_nes.group.scale.set(0.000025, 0.000025, 0.000025)
scene.add(cartridge_duck_hunt_nes.group)

const cartridge_mario_nes = new Decoration('./models/gltf/cartridge_mario_nes/scene.gltf')
cartridge_mario_nes.group.position.set(0.35, 0.478, -0.9)
cartridge_mario_nes.group.rotation.set(0, Math.PI*0.2, 0)
cartridge_mario_nes.group.scale.set(0.0005, 0.0005, 0.0005)
scene.add(cartridge_mario_nes.group)

const cartridge_pokemon_gameboy = new Decoration('./models/gltf/cartridge_pokemon_gameboy/scene.gltf')
cartridge_pokemon_gameboy.group.position.set(-0.85, 0.958, -1.15)
cartridge_pokemon_gameboy.group.rotation.set(-1.5, Math.PI*0, 0)
cartridge_pokemon_gameboy.group.scale.set(1, 1, 1)
scene.add(cartridge_pokemon_gameboy.group)

const headphones = new Decoration('./models/gltf/headphones/scene.gltf')
headphones.group.position.set(-0.5, 0.98, -0.9)
headphones.group.rotation.set(-1.7, Math.PI*2, 0.8)
headphones.group.scale.set(0.02, 0.02, 0.02)
scene.add(headphones.group)

const mario_mystery_box_figurine = new Decoration('./models/gltf/mario_mystery_box_figurine/scene.gltf')
mario_mystery_box_figurine.group.position.set(-1, 0.173, -0.5)
mario_mystery_box_figurine.group.rotation.set(0, Math.PI*0.1, 0)
mario_mystery_box_figurine.group.scale.set(0.05, 0.05, 0.05)
scene.add(mario_mystery_box_figurine.group)

const pokeball_figurine = new Decoration('./models/gltf/pokeball_figurine/scene.gltf')
pokeball_figurine.group.position.set(-0.32, 0.975, -0.9)
pokeball_figurine.group.rotation.set(1.3, Math.PI*1, 0)
pokeball_figurine.group.scale.set(0.004, 0.004, 0.004)
scene.add(pokeball_figurine.group)

const cable = new Decoration('./models/gltf/cable/scene.gltf')
cable.group.position.set(-0.8, 0.96, -1.19)
cable.group.rotation.set(0, Math.PI*-0.5, 0)
cable.group.scale.set(0.1, 0.1, 0.1)
scene.add(cable.group)

const zelda_shield = new Decoration('./models/gltf/zelda_shield/scene.gltf')
zelda_shield.group.position.set(-0.3, 0.65, -0.485)
zelda_shield.group.rotation.set(-0.5, Math.PI*-2, 0.8)
zelda_shield.group.scale.set(0.025, 0.025, 0.025)
scene.add(zelda_shield.group)


const plante_piranha = new Decoration('./models/gltf/plante_piranha/scene.gltf')
plante_piranha.group.position.set(0.63, 1.02, -1.25)
plante_piranha.group.rotation.set(0, Math.PI*0, 0)
plante_piranha.group.scale.set(0.0004, 0.0004, 0.0004)
scene.add(plante_piranha.group)

const battery_duracell = new Decoration('./models/gltf/battery_duracell/scene.gltf')
battery_duracell.group.position.set(0.5, 0.962, -0.9)
battery_duracell.group.rotation.set(1.2, Math.PI*0.25, 0.5)
battery_duracell.group.scale.set(0.001, 0.001, 0.001)
scene.add(battery_duracell.group)

const picture_frame = new Decoration('./models/gltf/picture_frame/scene.gltf')
picture_frame.group.position.set(-1.14, 0.955, -0.95)
picture_frame.group.rotation.set(0, Math.PI*-0.30, 0)
picture_frame.group.scale.set(0.04, 0.04, 0.03)
scene.add(picture_frame.group)

const box_nes = new Decoration('./models/gltf/box_nes/scene.gltf')
box_nes.group.position.set(0.7, 0.498, -0.9)
box_nes.group.rotation.set(-1.5, Math.PI*0, -0.4)
box_nes.group.scale.set(0.02, 0.02, 0.02)
scene.add(box_nes.group)

const fire_flower_figurine = new Decoration('./models/gltf/fire_flower_figurine/scene.gltf')
fire_flower_figurine.group.position.set(0.3, 0.99, -1.05)
fire_flower_figurine.group.rotation.set(0, Math.PI*-0.6, 0)
fire_flower_figurine.group.scale.set(0.01, 0.01, 0.01)
scene.add(fire_flower_figurine.group)

const nooks_house = new Decoration('./models/gltf/nooks_house/scene.gltf')
nooks_house.group.position.set(-1.1, 0.995, -1.28)
nooks_house.group.rotation.set(0, Math.PI*-0.7, 0)
nooks_house.group.scale.set(0.04, 0.04, 0.04)
scene.add(nooks_house.group)

const cabinet = new Decoration('models/gltf/cabinet/scene.gltf')
cabinet.group.position.set(1.6, 0.76, -1.25)
cabinet.group.rotation.set(0, Math.PI*0, 0)
cabinet.group.scale.set(0.007, 0.007, 0.007)
scene.add(cabinet.group)

// Poster
const harry = new Poster('./poster/harry.jpg')
harry.group.position.set(1.8, 1.7, -1.33)
harry.group.scale.set(0.002, 0.005, 0.002)
scene.add(harry.group)

const matrix = new Poster('./poster/matrix.jpg')
matrix.group.position.set(0.5, 2.05, -1.33)
matrix.group.scale.set(0.002, 0.005, 0.002)
scene.add(matrix.group)

const lord_of_the_ring = new Poster('./poster/lord_of_the_ring.jpg')
lord_of_the_ring.group.position.set(-0.8, 2, -1.33)
lord_of_the_ring.group.scale.set(0.002, 0.005, 0.002)
scene.add(lord_of_the_ring.group)

const terminator = new Poster('./poster/Terminator.jpg')
terminator.group.position.set(-0.15, 2.05, -1.33)
terminator.group.scale.set(0.002, 0.005, 0.002)
scene.add(terminator.group)

const star_wars = new Poster('./poster/star_wars.jpg')
star_wars.group.position.set(-1.2, 1.7, -0.75)
star_wars.group.rotation.set(0, Math.PI*0.5, 0)
star_wars.group.scale.set(0.002, 0.005, 0.002)
scene.add(star_wars.group)

const satoru_iwata = new Poster('./poster/satoru_iwata.jpg')
satoru_iwata.group.position.set(-1.134, 1.05, -0.94)
satoru_iwata.group.rotation.set(-0.38, Math.PI*0.2, 0.22)
satoru_iwata.group.scale.set(0.0005, 0.00125, 0.0005)
scene.add(satoru_iwata.group)

const super_mario_bowing = new Poster('./poster/super_mario_bowing.jpg')
super_mario_bowing.group.position.set(-1.133, 1.05, -0.94)
super_mario_bowing.group.rotation.set(-0.38, Math.PI*0.2, 0.22)
super_mario_bowing.group.scale.set(0.0005, 0.00125, 0.0005)
scene.add(super_mario_bowing.group)

const raycaster = new THREE.Raycaster()



// Videos
const videos_console = new Array() // switch, wii, nes, gameboy, arcade
videos_console.push(new Video('./videos/switch.mp4'))
videos_console.push(new Video('./videos/wii.mp4'))
videos_console.push(new Video('./videos/nes.mp4'))
videos_console.push(new Video('./videos/gameboy.mp4'))
videos_console.push(new Console_arcade_video('./videos/arcade.mp4'))

// Add videos to scene
for (let i = 0; i < videos_console.length; i++) {
    scene.add(videos_console[i].group)
}

// Hide all videos
const hide_videos_console = ()=>{
    for (let i = 0; i < videos_console.length; i++) {
        videos_console[i].group.visible = false
        videos_console[i].reset_current_time()
    }
}

// Black screen arcade
const black_screen_arcade = new Console_arcade_video('./videos/arcade.mp4')
black_screen_arcade.group.visible = true
scene.add(black_screen_arcade.group)




// Texts
const texts_console = new Array() // switch, wii, nes, gameboy, arcade
texts_console.push(new Text('La Nintendo Switch est la première console de jeu vidéo à offrir une expérience \n\nhybride entre la console de salon et la console portable. Il suffit de rentrer sa \n\nconsole dans une petite borne connectée en HDMI à la télé pour voir son écran \n\npasser sur la télé du salon et offrir une expérience plus agréable et familiale.\n\nLa Nintendo Switch est sortie mondialement en 2017.\n\nAppuyer sur ESPACE pour continuer'))
texts_console.push(new Text('La Wii est une console de jeux de salon dotée de reconnaissance de mouvement, \n\nsortie en 2006. Console de la septième génération, tout comme la Xbox 360 et \n\nla PlayStation 3 avec lesquelles elle est en rivalitée, la Wii est la console de salon \n\nla plus vendue de sa génération avec 100 millions d\'exemplaires écoulés en 2016.\n\nElle a comme particularité d’avoir été une des premières consoles à utiliser un \n\naccéléromètre capable de détecter la position, l\'orientation et les mouvements \n\ndans l\'espace de la manette.\n\nAppuyer sur ESPACE pour continuer'))
texts_console.push(new Text('La Nintendo Entertainment System, par abréviation NES, est une des premières \n\nconsoles de jeux de salon fabriquée par l\'entreprise japonaise Nintendo.\n\nElle a été distribuée à partir de 1985 ; La console connut un succès mondial, \n\nce qui fixa les normes pour les consoles suivantes notamment en matière \n\nde game design. Super Mario Bros fut le jeu le plus vendu sur la console. \n\nSon succès fut tel que ce jeu justifiait bien souvent l\'achat de la console \n\nà lui tout seul.\n\nAppuyer sur ESPACE pour continuer'))
texts_console.push(new Text('La Game Boy est une des premières consoles portables de jeu vidéo fabriquée \n\npar Nintendo et mise en vente au Japon en 1989 C’est la première console \n\nportable qui a démocratisé l’utilisation de ces dernières dans le monde.\n\nMalgré la sortie de consoles portables techniquement plus avancées, \n\nla Game Boy connaît un franc succès. Les modèles Game Boy et Game Boy Color \n\ntotalisent 118 millions d\'exemplaires vendus à travers le monde.\n\nAppuyer sur ESPACE pour continuer'))
texts_console.push(new Text('Une borne d\'arcade est un des premiers jeux vidéos disponible au grand public \n\nnotamment dans des lieux ouverts au public comme les bars, les centres \n\ncommerciaux ou certains établissements de divertissement. L\'origine du nom \n\nprovient des lieux où ces bornes étaient souvent installées, sous les arcades \n\nafin de rentabiliser l\'espace. C\'est sur ce support que l’on a vu apparaître \n\npour la première fois l\'icône du jeu vidéo de Nintendo : “Mario”.\n\nAppuyer sur ESPACE pour continuer'))

// Add videos to scene
for (let i = 0; i < texts_console.length; i++) {
    scene.add(texts_console[i].group)
}

// Hide all texts
const hide_texts_console = ()=>{
    for (let i = 0; i < texts_console.length; i++) {
        texts_console[i].group.visible = false
    }
}



/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 8)

// Position front screen
let camera_parallax_strength = 0.25


// Camera pos default
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
 * Resize
 */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)

    effectComposer.setSize(sizes.width, sizes.height)
})


/**
 * Object movement
 */

// Hover detection - false or true
let hover_tv = false
let hover_poster_mario = false
let hover_console_switch = false
let hover_console_wii = false
let hover_console_nes = false
let hover_console_gameboy = false
let hover_console_arcade = false
let hover_decoration_nooks = false
let hover_decoration_mystery_box = false
let hover_decoration_fire_flower = false
let hover_poster_star_wars = false
let hover_poster_matrix = false
let hover_poster_harry = false
let hover_decoration_plante_piranha = false
let hover_decoration_pokeball_figurine = false
let hover_poster_terminator = false
let hover_poster_lord_of_the_ring = false
let hover_decoration_zelda_shield = false
let intro_finish_audio = false
let hover_decoration_headphones = false


// Click detection - null or not null
let click_console_switch = null
let click_console_wii = null
let click_console_wii_gamepad_01 = null
let click_console_wii_gamepad_02 = null
let click_console_nes = null
let click_console_nes_gamepad_01 = null
let click_console_nes_gamepad_02 = null
let click_console_gameboy = null
let click_console_arcade = null
let click_decoration_headphones = null


// Object movement translation
const object_movement_translation = (object, x, y, z)=>{
    TweenLite.to(
        object.position,
        1,
        {
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


/**
 * Click detection
 */
document.addEventListener(
    'click',
    () => {
        // Console switch
        if(hover_console_switch) {
            // Reset camera
            camera_reset()

            // Hide all texts & videos
            hide_texts_console()
            hide_videos_console()

            // Show text
            texts_console[0].group.visible = true

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
            // Reset camera
            camera_reset()

            // Hide all texts & videos
            hide_texts_console()
            hide_videos_console()

            // Show text
            texts_console[1].group.visible = true

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
            // Reset camera
            camera_reset()

            // Hide all texts & videos
            hide_texts_console()
            hide_videos_console()

            // Show text
            texts_console[2].group.visible = true

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
            // Reset camera
            camera_reset()

            // Hide all texts & videos
            hide_texts_console()
            hide_videos_console()

            // Show text
            texts_console[3].group.visible = true

            // Start animation translation
            object_movement_translation(console_gameboy.group, -0.25, 1, -0.5)

            // Start animation rotation
            if (click_console_gameboy == null) {
                click_console_gameboy = object_movement_rotation(console_gameboy.group)
            }
        } else {
            // Reset animation translation
            object_movement_translation(console_gameboy.group, 0.15, 0.956, -1.05)

            // Reset animation rotation
            clearInterval(click_console_gameboy)
            object_movement_rotation_reset(console_gameboy.group, 0, Math.PI*-0.6, 0)
            click_console_gameboy = null
        }




        // Console arcade
        if(hover_console_arcade){
            // Reset camera
            camera_reset()

            // Hide all texts & videos
            hide_texts_console()
            hide_videos_console()

            // Show text
            texts_console[4].group.visible = true
            if (click_console_arcade == null) {
                click_console_arcade = 'not null'
                black_screen_arcade.group.visible = true
            }

        }
        else {
            click_console_arcade = null
            black_screen_arcade.group.visible = true
        }




        // Tv
        if(hover_tv){
            // Reset camera
            camera_reset()

            // Hide all texts & videos
            hide_texts_console()
            hide_videos_console()
        }



        
        // Poster mario
        if(hover_poster_mario){
            super_mario_bowing.group.visible = false
        }



        else if(hover_decoration_nooks){
            hover_decoration_nooks = new Audio('./audio/animal_crossing.mp3')
            hover_decoration_nooks.play()
        }

        else if(hover_decoration_mystery_box){
            hover_decoration_mystery_box = new Audio('./audio/coin.mp3')
            hover_decoration_mystery_box.play()
        }

        else if(hover_decoration_fire_flower){
            hover_decoration_fire_flower = new Audio('./audio/fire.mp3')
            hover_decoration_fire_flower.play()
        }

        else if(hover_poster_star_wars){
            hover_poster_star_wars = new Audio('./audio/lightsaber.mp3')
            hover_poster_star_wars.play()
        }

        else if(hover_poster_harry){
            hover_poster_harry = new Audio('./audio/harry.mp3')
            hover_poster_harry.play()
        }

        else if(hover_poster_matrix){
            hover_poster_matrix = new Audio('./audio/matrix.mp3')
            hover_poster_matrix.play()
        }

        else if(hover_decoration_plante_piranha){
            hover_decoration_plante_piranha = new Audio('./audio/plant.mp3')
            hover_decoration_plante_piranha.play()
        }

        else if(hover_decoration_pokeball_figurine){
            hover_decoration_pokeball_figurine = new Audio('./audio/pokemon.mp3')
            hover_decoration_pokeball_figurine.play()
        }

        else if(hover_poster_terminator){
            hover_poster_terminator = new Audio('./audio/terminator.mp3')
            hover_poster_terminator.play()
        }

        else if(hover_poster_lord_of_the_ring){
            hover_poster_lord_of_the_ring = new Audio('./audio/you_shall_not_pass.mp3')
            hover_poster_lord_of_the_ring.play()
        }

        else if(hover_decoration_zelda_shield){
            hover_decoration_zelda_shield = new Audio('./audio/shield.mp3')
            hover_decoration_zelda_shield.play()
        }


        else if(hover_decoration_headphones){
            if(click_decoration_headphones == null){
                click_decoration_headphones = 'not null'
                intro_finish_audio.pause()
            }
            else{
                click_decoration_headphones = null
                intro_finish_audio.play()
            }
        }
    }
)




/**
 * Keyboard
 */
// Space bar ( Continue )
document.addEventListener(
    'keydown',
    _event => {
        if(_event.code === 'Space'){
            // Console switch
            if (click_console_switch !== null) {
                // Hide all texts & videos
                hide_texts_console()
                hide_videos_console()

                // Show video
                videos_console[0].group.visible = true
                videos_console[0].play()
            }




            // Console wii
            else if (click_console_wii !== null) {
                // Hide all texts & videos
                hide_texts_console()
                hide_videos_console()

                // Show video
                videos_console[1].group.visible = true
                videos_console[1].play()
            }




            // Console nes
            else if (click_console_nes !== null) {
                // Hide all texts & videos
                hide_texts_console()
                hide_videos_console()

                // Show video
                videos_console[2].group.visible = true
                videos_console[2].play()
            }




            // Console gameboy
            else if (click_console_gameboy !== null) {
                // Hide all texts & videos
                hide_texts_console()
                hide_videos_console()

                // Show video
                videos_console[3].group.visible = true
                videos_console[3].play()
            }




            // Console arcade
            else if (click_console_arcade !== null) {
                // Hide all texts & videos
                hide_texts_console()
                hide_videos_console()
                black_screen_arcade.group.visible = false

                // // Show video
                videos_console[4].group.visible = true
                videos_console[4].play()

                // Switch camera to arcade
                camera_to_arcade = true
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
            else if (intro_finish == 1){
                intro_finish = 2
                intro_finish_audio = new Audio('./background_music/room_ambiance_sound.mp3')
                intro_finish_audio.play()
                intro_finish_audio.loop = true
                $intro_container.classList.add('hide')
                $commands.classList.remove('hide')
                document.querySelector('body').style.pointerEvents = 'auto'
                camera_pos = {
                    x: -0.25,
                    y: 1.45,
                    z: -0.9
                }
                camera_look_at_pos = {
                    x: -0.25,
                    y: 1.25,
                    z: -3.9
                }
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
        }
    }
)
/**
 * Loader
 */

// Variables
const $loader_text = $intro_container.querySelector('.loader_text')
let load_pourcentage = 0

// All objects
let load_those_objects = [room, console_switch, console_wii, console_wii_gamepad_01, console_wii_gamepad_02, console_nes, console_nes_gamepad_01, console_nes_gamepad_02, console_gameboy, console_arcade, cartridge_duck_hunt_nes, cartridge_mario_nes, cartridge_pokemon_gameboy, headphones, mario_mystery_box_figurine, pokeball_figurine, cable, zelda_shield, plante_piranha, battery_duracell, picture_frame, box_nes, fire_flower_figurine, nooks_house, cabinet, harry, matrix, lord_of_the_ring, terminator, star_wars, satoru_iwata, super_mario_bowing]
let load_those_objects_length_static = load_those_objects.length

// Check if object are loaded & change pourcentage value
setInterval(
    ()=>{
        for (let i = load_those_objects.length - 1; i >= 0; i--) {
            // Check if object is loaded
            if (load_those_objects[i].loaded) {
                load_those_objects.splice(i, 1)
                load_pourcentage += 100/load_those_objects_length_static
            }
            // Change pourcetage text content
            $loader_text.textContent = `${parseInt(load_pourcentage)}%`

            // When fully loaded
            if (load_pourcentage == 100) {
                // Hide pourcentage text
                $loader_text.classList.add('hide')

                // Launch introduction
                typing_text(texts[0])

                // Stop for
                break
            }
        }
    }, 300
)



/**
 * Loop
 */



const cursor_new = {
    x: 0,
    y: 0,
    follow_power: 0.0075
}

let previousime = Date.now()
const loop = () => {
    window.requestAnimationFrame(loop)
    // Render
    effectComposer.render(scene, camera)

    if (intro_finish == 2) {
        // Raycaster
        const raycaster_cursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
        raycaster.setFromCamera(raycaster_cursor, camera)

        // Raycast tv
        const intersects_tv = new Raycaster(tv, hover_tv, raycaster)
        hover_tv = intersects_tv.hover

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

        // Raycast poster mario
        const intersects_mario = new Raycaster(super_mario_bowing.group, hover_poster_mario, raycaster)
        hover_poster_mario = intersects_mario.hover

        // Raycast nooks house
        const intersects_nooks = new Raycaster(nooks_house.group, hover_decoration_nooks, raycaster)
        hover_decoration_nooks = intersects_nooks.hover

        // Raycast mystery box
        const intersects_mystery_box = new Raycaster(mario_mystery_box_figurine.group, hover_decoration_mystery_box, raycaster)
        hover_decoration_mystery_box = intersects_mystery_box.hover

        // Raycast fire flower
        const intersects_fire_flower = new Raycaster(fire_flower_figurine.group, hover_decoration_fire_flower, raycaster)
        hover_decoration_fire_flower = intersects_fire_flower.hover

        // Raycast star wars
        const intersects_star_wars = new Raycaster(star_wars.group, hover_poster_star_wars, raycaster)
        hover_poster_star_wars = intersects_star_wars.hover

        // Raycast matrix
        const intersects_matrix = new Raycaster(matrix.group, hover_poster_matrix, raycaster)
        hover_poster_matrix = intersects_matrix.hover

        // Raycast plante piranha
        const intersects_plante_piranha = new Raycaster(plante_piranha.group, hover_decoration_plante_piranha, raycaster)
        hover_decoration_plante_piranha = intersects_plante_piranha.hover

        // Raycast pokemon figurine
        const intersects_pokemon = new Raycaster(pokeball_figurine.group, hover_decoration_pokeball_figurine, raycaster)
        hover_decoration_pokeball_figurine = intersects_pokemon.hover

        // Raycast poster terminator
        const intersects_terminator = new Raycaster(terminator.group, hover_poster_terminator, raycaster)
        hover_poster_terminator = intersects_terminator.hover

        // Raycast poster mario
        const intersects_lord_of_the_ring = new Raycaster(lord_of_the_ring.group, hover_poster_mario, raycaster)
        hover_poster_lord_of_the_ring = intersects_lord_of_the_ring.hover

        // Raycast zelda shield
        const intersects_zelda_shield = new Raycaster(zelda_shield.group, hover_decoration_zelda_shield, raycaster)
        hover_decoration_zelda_shield = intersects_zelda_shield.hover

        // Raycast headphones
        const intersects_headphones = new Raycaster(headphones.group, hover_decoration_headphones, raycaster)
        hover_decoration_headphones = intersects_headphones.hover

        // Raycast harry
        const intersects_harry = new Raycaster(harry.group, hover_poster_harry, raycaster)
        hover_poster_harry = intersects_harry.hover
    }




    // Change cursor on hover
    if(hover_console_wii || hover_console_switch || hover_console_nes || hover_console_gameboy || hover_console_arcade || hover_tv || hover_poster_mario
        || hover_decoration_headphones || hover_decoration_zelda_shield || hover_poster_lord_of_the_ring || hover_poster_terminator || hover_decoration_pokeball_figurine
        || hover_decoration_plante_piranha || hover_poster_matrix || hover_poster_star_wars || hover_decoration_fire_flower || hover_decoration_mystery_box
        || hover_decoration_nooks || hover_poster_harry){
        document.body.style.cursor = 'pointer'
    }
    else{
        document.body.style.cursor = 'default'
    }



    // Camera parallax

    // GET time for each frame
    const time = Date.now()
    const delta = time - previousime
    previousime = time

    // GET cursor_new position
    cursor_new.x += (cursor.x - cursor_new.x) * (cursor_new.follow_power * delta)
    cursor_new.y += (cursor.y - cursor_new.y) * (cursor_new.follow_power * delta)

    // Camera parallax
    camera.position.x = camera_pos.x + cursor_new.x * - camera_parallax_strength
    camera.position.y = camera_pos.y + cursor_new.y * camera_parallax_strength
    camera.position.z = camera_pos.z
    camera.lookAt(camera_look_at_pos.x, camera_look_at_pos.y, camera_look_at_pos.z)

}

loop()
