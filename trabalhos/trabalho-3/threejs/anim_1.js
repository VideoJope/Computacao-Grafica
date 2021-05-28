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
        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 500)
            .onUpdate(function(){
                let right_lower_arm =  robot.getObjectByName("right_lower_arm");
                
                var pivot_x = 0;
                var pivot_y = 2;

                right_lower_arm.matrix
                    .makeTranslation(0,0,0)
                    .premultiply( new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0 ) )                                      //3. pivot -> position
                    .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                                            //2. rotaciona
                    .premultiply( new THREE.Matrix4().makeTranslation(pivot_x, pivot_y, 0 ) )                                        //1. position -> pivot
                    .premultiply( new THREE.Matrix4().makeTranslation(right_lower_arm.position.x, right_lower_arm.position.y, 0 ) ); //0. position

                right_lower_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
        
        let armTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:-Math.PI/12 }, 500)
        .onUpdate(function(){
            let right_arm =  robot.getObjectByName("right_hand");
            
            var pivot_x = 0;
            var pivot_y = 1;
            
            right_arm.matrix
            .makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0 ) )                                      //3. pivot -> position
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                                            //2. rotaciona
                .premultiply( new THREE.Matrix4().makeTranslation(pivot_x, pivot_y, 0 ) )                                        //1. position -> pivot
                .premultiply( new THREE.Matrix4().makeTranslation(right_arm.position.x, right_arm.position.y, 0 ) );            //0. position

                right_arm.updateMatrixWorld(true);
                stats.update();
            renderer.render(scene, camera);    
        })

        let headTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI/12 }, 500)
        .onUpdate(function(){
            let head =  robot.getObjectByName("head");
            
            var pivot_x = 0;
            var pivot_y = -2.5;
            
            head.matrix
            .makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0 ) )                                      //3. pivot -> position
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                                            //2. rotaciona
                .premultiply( new THREE.Matrix4().makeTranslation(pivot_x, pivot_y, 0 ) )                                        //1. position -> pivot
                .premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y, 0 ) );            //0. position

                head.updateMatrixWorld(true);
                stats.update();
            renderer.render(scene, camera);    
        })
        let lowerLeftArm = new TWEEN.Tween( {theta:0} )
        .to( {theta:-Math.PI/12 }, 500)
        .onUpdate(function(){
            let lower_left_arm = robot.getObjectByName("left_lower_arm");
            
            var pivot_x = 0;
            var pivot_y = 2.5;
            
            lower_left_arm.matrix
            .makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0 ) )                                      //3. pivot -> position
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                                            //2. rotaciona
                .premultiply( new THREE.Matrix4().makeTranslation(pivot_x, pivot_y, 0 ) )                                        //1. position -> pivot
                .premultiply( new THREE.Matrix4().makeTranslation(lower_left_arm.position.x, lower_left_arm.position.y, 0 ) );            //0. position

                lower_left_arm.updateMatrixWorld(true);
                stats.update();
            renderer.render(scene, camera);    
        })
        let leftHand = new TWEEN.Tween( {theta:0} )
        .to( {theta:-Math.PI/12 }, 500)
        .onUpdate(function(){
            let left_hand = robot.getObjectByName("left_hand");
            
            var pivot_x = 0;
            var pivot_y = 0.5;
            
            left_hand.matrix
            .makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0 ) )                                      //3. pivot -> position
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                                            //2. rotaciona
                .premultiply( new THREE.Matrix4().makeTranslation(pivot_x, pivot_y, 0 ) )                                        //1. position -> pivot
                .premultiply( new THREE.Matrix4().makeTranslation(left_hand.position.x, left_hand.position.y, 0 ) );            //0. position

                left_hand.updateMatrixWorld(true);
                stats.update();
            renderer.render(scene, camera);    
        })
        
        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        upperArmTween.start();
        lowerArmTween.start();   
        armTween.start();
        headTween.start();
        lowerLeftArm.start();
        leftHand.start();
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




