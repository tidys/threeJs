var renderer = null;
var scene = null;
var camera = null;
var light = null;
var qiu = null;

function init() {
    initScene();
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


    render();
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
    camera.position.set(3, 3, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
    light.position.set(200, 200, 200);
    scene.add(light);
}
function render() {
    if (qiu) {
        qiu.rotation.x += 0.01;
        qiu.rotation.y += 0.01;
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

