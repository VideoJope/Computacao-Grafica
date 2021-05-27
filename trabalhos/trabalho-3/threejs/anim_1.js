function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 500)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                
                var pivot_x = 0;
                var pivot_y = 2;

                right_upper_arm.matrix
                    .makeTranslation(0,0,0)
                    .premultiply( new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0 ) )                                      //3. pivot -> position
                    .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                                            //2. rotaciona
                    .premultiply( new THREE.Matrix4().makeTranslation(pivot_x, pivot_y, 0 ) )                                        //1. position -> pivot
                    .premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x, right_upper_arm.position.y, 0 ) ); //0. position

                right_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
        // Here you may include animations for other parts 
            
    
        
        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        upperArmTween.start();       
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});




