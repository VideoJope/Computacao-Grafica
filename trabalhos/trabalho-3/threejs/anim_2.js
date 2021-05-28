function Animation2() {}

Object.assign( Animation2.prototype, {

    init: function() {
        //Animações de membros isolados

        // Estrutura da Animação
        
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    },
    create_rotation_tween: function(object_name, startAngle, endAngle, duration, pivot=[0,0,0]){
        return new TWEEN.Tween({theta:startAngle}).to({theta:endAngle}, duration)
            .onUpdate(
                function(){
                    let animated_object = robot.getObjectByName(object_name);
                    
                    var x = animated_object.position.x;
                    var y = animated_object.position.y;
                    var z = animated_object.position.z;
                    
                    animated_object.matrix.makeTranslation(0, 0, 0)                                             //1. Vira uma matriz identidade. Objeto na origem.
                        .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]) )    //5. Retorna para a posição
                        .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )                   //4. Rotaciona o objeto
                        .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]) )       //3. Translada mais um pouco até o ponto de pivot
                        .premultiply( new THREE.Matrix4().makeTranslation(x, y, z) );                           //2. Translada até a posição

                    animated_object.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                }
            )
    }
});




