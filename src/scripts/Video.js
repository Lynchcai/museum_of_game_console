import * as THREE from 'three'
export default class Video
{
    constructor(video_url)
    {
        // Init group
        this.group = new THREE.Group()

        // Video DOM
        this.$video = document.createElement('video')
        this.$video.src = video_url
        this.$video.type = "video/mp4"
        this.$video.load()
        document.querySelector('body').appendChild(this.$video)
        
        // Texture
        const video_texture = new THREE.VideoTexture(this.$video)
        video_texture.minFilter = THREE.LinearFilter
        video_texture.magFilter = THREE.LinearFilter
        video_texture.format = THREE.RGBFormat

        // Material
        const video_material = new THREE.MeshBasicMaterial ( { map: video_texture, overdraw: true})
        
        // Object
        const video_geometry = new THREE.PlaneGeometry( 240, 135, 4, 4) // 16:9
        this.video = new THREE.Mesh( video_geometry, video_material)
        this.video.position.set(-0.22, 1.4, -1.032)
        this.video.scale.set(0.0045, 0.0045, 0.0045)

        this.group.add(this.video)
    }
    play(){
        this.$video.play()
    }
}