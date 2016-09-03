var renderer = null;
var scene = null;
var camera = null;
var light = null;
var qiu = null;
var mouseX = 0, mouseY = 0;
function init() {
    initScene();

    loadObj();

    render();
}
function createCube() {
    // cube
    var cube = new THREE.Mesh(
        new THREE.CubeGeometry(10, 20, 30),
        new THREE.MeshLambertMaterial({
            color: 0xff0000,
            //wireframe: true
        })
    );
    scene.add(cube);
    qiu = cube;
}

function initEvent(){
    document.addEventListener( 'mousedown', onDocumentMouseMove, false );

    //document.addEventListener('mouseclick')
    document.addEventListener( 'mouseup', onMouseUp, false );
}
function onDocumentMouseMove(event){
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

}

function loadObj() {
    var loader = new THREE.OBJLoader();
    loader.load("res/ma.obj", function (loadObj) {
        loadObj.traverse((function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshLambertMaterial({
                    color: 0xffff00,
                    side: THREE.DoubleSide
                });
            }
        }));


        scene.add(loadObj);

    });
}

function initScene() {
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('mainCanvas')});
    renderer.setClearColor(0x888888);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, 4 / 3, 1, 1000);// 透视投影
    //camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);// 正交投影
    camera.position.set(3, 3, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
    light.position.set(200, 200, 200);
    scene.add(light);
}
function render() {


    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

