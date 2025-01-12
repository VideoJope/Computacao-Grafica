// Rotation around point logic
// Based on https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733

THREE.Object3D.prototype.savePosition = function() {
    return function () {
        this.__position = this.position.clone(); 
        
        return this;
    }
}();

THREE.Object3D.prototype.rotateAroundPoint = function() {
    return function (point, theta, pointIsWorld = false, axis = new THREE.Vector3(0, 0, 1)) {
    // point: Vector3 -  center of rotation
    // theta: float - rotation angle (in radians)
    // pointIsWord: bool
        if(pointIsWorld){
            this.parent.localToWorld(this.position); // compensate for world coordinate
        }
    
        this.position.sub(point); // remove the offset
        this.position.applyAxisAngle(axis, theta); // rotate the POSITION
        this.position.add(point); // re-add the offset
    
        if(pointIsWorld){
            this.parent.worldToLocal(this.position); // undo world coordinates compensation
        }
    
        this.rotateOnAxis(axis, theta); // rotate the OBJECT

        return this;
    }

}();


// ThreeJS variables
var camera, scene, renderer;
// Optional (showFps)
var stats;
// Objects in Scene
var robot;


function init() {
    // Canvas height/height 
    var width = 40;
    var height = 22;
    // Setting up camera
    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 2 );
    camera.lookAt( 0, 0, -1);
    camera.position.z = 1;

    // Setting up scene
    scene = new THREE.Scene();
    robot = gen_robot();
    scene.add(robot);

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    /* renderer.setViewport( vpXmin, vpYmin, vpXwidth, vpYheight );  Unused */ 
    renderer.setSize(window.innerWidth, window.innerHeight); 

    // Adding both renderer and stats to the Web page
    stats = new Stats();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);

    // Adding listener for keydown 
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Removing autoupdate (necessary for applying affine xforms with matrices)
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.updateMatrixWorld();
            node.matrixAutoUpdate = false;
        }
    
    } );

    stats.update();
    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    /* renderer.setViewport( vpXmin, vpYmin, vpXwidth, vpYheight ); Unused */
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

function onDocumentKeyDown(event) {
    // One for Wave, Two for Thinking and Three for Dancing
    key = parseInt(event.key);

    animations = {
        1 : WaveAnimation,
        2 : ThinkingAnimation,
        3 : DancingAnimation,
    };

    // Reset Robot in Scene
    resetRobot();

    // Run selected animation
    animation = new animations[key]();
    animation.run();
}

function resetRobot() {
    scene.remove(robot);
    robot = gen_robot();
    scene.add(robot);
    // Removing autoupdate (necessary for applying affine xforms with matrices)
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.updateMatrixWorld();
            node.matrixAutoUpdate = false;
        }
    });
}

init();
