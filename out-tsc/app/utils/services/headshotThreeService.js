"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadshotThreeService = void 0;
var THREE = require("three");
var GLTFLoader_js_1 = require("three/addons/loaders/GLTFLoader.js");
var HeadshotThreeService = /** @class */ (function () {
    function HeadshotThreeService() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.canvas = null;
        this.model = null;
        this.lights = [];
        this.animationId = null;
        this.mixer = null;
        this.manualControl = false;
        this.renderMode = 'normal';
        this.pointCloudMaterial = null;
        this.wireframeMaterial = null;
        this.originalMaterials = new Map();
        this.loader = new GLTFLoader_js_1.GLTFLoader();
    }
    HeadshotThreeService.prototype.init = function (canvas, glbPath) {
        this.canvas = canvas;
        var rect = canvas.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera.position.set(-0.3, 0, 4);
        this.scene = new THREE.Scene();
        this.addPortraitLights();
        this.createSpecialMaterials();
        this.loadModel(glbPath);
        window.addEventListener('resize', this.handleResize.bind(this));
        this.runLoop();
    };
    HeadshotThreeService.prototype.createSpecialMaterials = function () {
        this.pointCloudMaterial = new THREE.PointsMaterial({
            color: 0x00ff88,
            size: 0.02,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
        });
        this.wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            wireframe: true,
            transparent: true,
            opacity: 0.7,
        });
    };
    HeadshotThreeService.prototype.addPortraitLights = function () {
        if (!this.scene)
            return;
        var keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(-2, 2, 3);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(2048, 2048);
        this.scene.add(keyLight);
        this.lights.push(keyLight);
        var fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight.position.set(2, 1, 2);
        this.scene.add(fillLight);
        this.lights.push(fillLight);
        var rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
        rimLight.position.set(0, 3, -2);
        this.scene.add(rimLight);
        this.lights.push(rimLight);
        var ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
    };
    HeadshotThreeService.prototype.loadModel = function (glbPath) {
        var _this = this;
        if (!this.scene)
            return;
        this.loader.load(glbPath, function (gltf) {
            _this.model = gltf.scene;
            _this.model.scale.setScalar(5);
            _this.model.position.set(0, -2.5, 0);
            _this.model.traverse(function (child) {
                if (child.isMesh) {
                    var mesh = child;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    _this.originalMaterials.set(mesh, mesh.material);
                }
            });
            _this.scene.add(_this.model);
            if (gltf.animations && gltf.animations.length > 0) {
                _this.mixer = new THREE.AnimationMixer(_this.model);
                var action = _this.mixer.clipAction(gltf.animations[0]);
                action.play();
            }
            console.log('Model loaded successfully');
        }, function (progress) {
            console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
        }, function (error) {
            console.error('Error loading model:', error);
        });
    };
    HeadshotThreeService.prototype.setRenderMode = function (mode) {
        var _this = this;
        if (!this.model) {
            console.warn('Model not loaded yet');
            return;
        }
        this.renderMode = mode;
        this.model.traverse(function (child) {
            if (child.isMesh) {
                var mesh_1 = child;
                var geometry = mesh_1.geometry;
                var parent_1 = mesh_1.parent;
                var originalMaterial = _this.originalMaterials.get(mesh_1);
                var objectsToRemove_1 = [];
                parent_1.children.forEach(function (obj) {
                    if (obj instanceof THREE.Points ||
                        (obj instanceof THREE.Mesh &&
                            obj !== mesh_1 &&
                            obj.userData.isWireframe)) {
                        objectsToRemove_1.push(obj);
                    }
                });
                objectsToRemove_1.forEach(function (obj) { return parent_1.remove(obj); });
                switch (mode) {
                    case 'normal':
                        mesh_1.material = originalMaterial;
                        mesh_1.visible = true;
                        break;
                    case 'wireframe':
                        mesh_1.material = _this.wireframeMaterial.clone();
                        mesh_1.visible = true;
                        break;
                    case 'pointcloud':
                        mesh_1.visible = false;
                        var points = new THREE.Points(geometry, _this.pointCloudMaterial.clone());
                        points.position.copy(mesh_1.position);
                        points.rotation.copy(mesh_1.rotation);
                        points.scale.copy(mesh_1.scale);
                        points.userData.isPointCloud = true;
                        parent_1.add(points);
                        break;
                    case 'hybrid':
                        mesh_1.material = _this.wireframeMaterial.clone();
                        mesh_1.material.opacity = 0.3;
                        mesh_1.visible = true;
                        var hybridPoints = new THREE.Points(geometry, _this.pointCloudMaterial.clone());
                        hybridPoints.material.size = 0.01;
                        hybridPoints.position.copy(mesh_1.position);
                        hybridPoints.rotation.copy(mesh_1.rotation);
                        hybridPoints.scale.copy(mesh_1.scale);
                        hybridPoints.userData.isPointCloud = true;
                        parent_1.add(hybridPoints);
                        break;
                }
            }
        });
    };
    HeadshotThreeService.prototype.setPointCloudStyle = function (options) {
        if (options === void 0) { options = {}; }
        var _a = options.color, color = _a === void 0 ? 0x00ff88 : _a, _b = options.size, size = _b === void 0 ? 0.02 : _b, _c = options.opacity, opacity = _c === void 0 ? 0.8 : _c;
        if (this.pointCloudMaterial) {
            this.pointCloudMaterial.color.setHex(color);
            this.pointCloudMaterial.size = size;
            this.pointCloudMaterial.opacity = opacity;
        }
        if (this.model) {
            this.model.traverse(function (child) {
                if (child.isPoints) {
                    var points = child;
                    var mat = points.material;
                    mat.color.setHex(color);
                    mat.size = size;
                    mat.opacity = opacity;
                }
            });
        }
    };
    HeadshotThreeService.prototype.setWireframeStyle = function (options) {
        if (options === void 0) { options = {}; }
        var _a = options.color, color = _a === void 0 ? 0x00ff88 : _a, _b = options.opacity, opacity = _b === void 0 ? 0.7 : _b;
        if (this.wireframeMaterial) {
            this.wireframeMaterial.color.setHex(color);
            this.wireframeMaterial.opacity = opacity;
        }
        if (this.model && this.renderMode === 'wireframe') {
            this.model.traverse(function (child) {
                if (child.isMesh) {
                    var mesh = child;
                    var materials = Array.isArray(mesh.material)
                        ? mesh.material
                        : [mesh.material];
                    materials.forEach(function (mat) {
                        if (mat.wireframe !== undefined &&
                            mat.wireframe) {
                            var m = mat;
                            m.color.setHex(color);
                            m.opacity = opacity;
                        }
                    });
                }
            });
        }
    };
    HeadshotThreeService.prototype.enableManualControl = function () {
        this.manualControl = true;
    };
    HeadshotThreeService.prototype.handleResize = function () {
        if (!this.canvas || !this.renderer || !this.camera)
            return;
        var rect = this.canvas.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };
    HeadshotThreeService.prototype.setManualRotation = function (rotationY) {
        if (this.model) {
            this.model.rotation.y = rotationY;
        }
    };
    HeadshotThreeService.prototype.runAnimation = function () {
        var time = performance.now() * 0.001;
        if (this.model && !this.manualControl) {
            this.model.rotation.y = Math.sin(time * 4) * 0.6;
        }
        if (this.mixer) {
            this.mixer.update(0.016);
        }
    };
    HeadshotThreeService.prototype.runLoop = function () {
        this.animationId = requestAnimationFrame(this.runLoop.bind(this));
        this.runAnimation();
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    };
    HeadshotThreeService.prototype.stopLoop = function () {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    };
    HeadshotThreeService.prototype.dispose = function () {
        var _a, _b, _c, _d;
        this.stopLoop();
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.dispose();
        this.model && ((_b = this.scene) === null || _b === void 0 ? void 0 : _b.remove(this.model));
        (_c = this.pointCloudMaterial) === null || _c === void 0 ? void 0 : _c.dispose();
        (_d = this.wireframeMaterial) === null || _d === void 0 ? void 0 : _d.dispose();
        window.removeEventListener('resize', this.handleResize.bind(this));
    };
    return HeadshotThreeService;
}());
exports.HeadshotThreeService = HeadshotThreeService;
