export default class Raycaster{
    constructor(group, hover, raycaster){
        const intersects = raycaster.intersectObject(group, true)
        if(intersects.length)
        {
            hover = true
        }
        else
        {
            hover = false
        }
        this.hover = hover
    }
}