export default class Raycaster{
    constructor(group, hover, raycaster){
        const intersects = raycaster.intersectObject(group, true)
        if(intersects.length)
        {
            hover = true
            document.body.style.cursor = 'pointer'
            group.position.y = group.position.y + 0.01
        }
        else
        {
            hover = false
            document.body.style.cursor = 'default'
        }
        this.hover = hover
    }
}

