export default {
  async setup(root, kit) {
    const { THREE } = kit; this.three = kit.makeThree(root, { alpha: false }); this.three.scene.background = new THREE.Color(kit.PAL.noche);
    this.three.scene.add(new THREE.AmbientLight(0xffffff, 1.2)); const l = new THREE.DirectionalLight(0xffe0a0, 3); l.position.set(2, 3, 5); this.three.scene.add(l);
    this.phone = await kit.phoneMesh(kit.asset("screens/ruta.jpg"), { scale: 2 }); this.three.scene.add(this.phone);
    this.seq = kit.sequence("vuelo"); [this.c, this.g] = kit.canvas2d(root, 432, 243); this.c.style.top = "1500px"; this.c.style.left = "70px";
    this.txt = kit.el("div", { position: "absolute", left: 0, right: 0, top: "260px", textAlign: "center", font: `120px ${kit.FONT.zhBrush}`, color: kit.PAL.oro }, root, "想学西班牙语？");
    this.t2 = kit.el("div", { position: "absolute", left: 0, right: 0, top: "430px", textAlign: "center", font: `900 70px ${kit.FONT.latinDisplay}`, color: "#fff" }, root, "AI Español ñ ¡Hola!");
  },
  async update(t, kit) {
    this.phone.rotation.y = Math.sin(t * 1.5) * 0.6; this.phone.rotation.x = 0.1;
    this.g.drawImage(await this.seq.at(t), 0, 0, 432, 243);
    this.three.renderer.render(this.three.scene, this.three.camera);
  },
};
