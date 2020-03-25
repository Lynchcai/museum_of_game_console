export default class Object_movement{
    constructor(group, object_name){
        let object = {
            x: group.position.x,
            y: group.position.y,
            z: group.position.z
        }
        







        if(object_name == 'console_switch'){
            console.log('switch');
        }
        if(object_name == 'console_wii'){
            console.log('wii');
        }
        if(object_name == 'console_nes'){
            console.log('nes');
        }
        if(object_name == 'console_gameboy'){
            console.log('gameboy');
        }
        if(object_name == 'console_arcade'){
            console.log('arcade');
        }
    }
}