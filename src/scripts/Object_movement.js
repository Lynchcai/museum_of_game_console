import { TweenLite } from 'gsap/all'

export default class Object_movement{
    constructor(group, hover){
        if (hover) {
            TweenLite.to(
                group.position,
                1,
                {
                    y: group.position.y + 0.05,
                    ease: 'Power3.easeInOut',
                    onComplete: () =>
                    {
                        console.log('terminé')
        
                        TweenLite.to(
                            group.position,
                            1,
                            {
                                y: group.position.y - 0.05,
                            }
                        )
                    }
                }
            )
        }
    }
}

