/*

Licence :

Attribution-NonCommercial-NoDerivs 
CC BY-NC-ND

This license is the most restrictive of our six main licenses, 
only allowing others to download your works and share them with 
others as long as they credit you, but they can鈥檛 change them 
in any way or use them commercially.

https://creativecommons.org/licenses/by-nc-nd/4.0/

///////// 
this cat is used in an other commercial project, a mobile app called :
"Babel, the cat who would be king"
http://babeltheking.com/

I did this app with the epic agency team (epic.net)
Do not use the cat (combination of the shapes, colors, 
proportions of the cat) with no permission.
For more info, please contact me at karim@epic.net
Thanks!

*/


Cat = function(){
  this.threeGroup = new THREE.Group();
  
  var yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xfdd276, 
    shading:THREE.FlatShading
  });

  var pinkMat = new THREE.MeshLambertMaterial ({
    color: 0xe0877e,//0xe0a79f, 
    shading:THREE.FlatShading
  });

  var redMat = new THREE.MeshLambertMaterial ({
    color: 0x630d15, 
    shading:THREE.FlatShading
  });

  var whiteMat = new THREE.MeshLambertMaterial ({
    color: 0xffffff, 
    shading:THREE.FlatShading
  });

  var blackMat = new THREE.MeshLambertMaterial ({
    color: 0x111111, 
    shading:THREE.FlatShading
  });
  var brownMat = new THREE.MeshLambertMaterial ({
    color: 0x2e2019,//0x4b342a, 
    shading:THREE.FlatShading
  });

  var lightBrownMat = new THREE.MeshLambertMaterial ({
    color: 0x664f4a, 
    shading:THREE.FlatShading
  });

  this.handHeight = 10;
  this.bodyHeight = 80;
  this.armHeight = ((this.bodyHeight * 3/5) - this.handHeight)/2 ;
  this.faceHeight = 30;
  this.shouldersPosition = new THREE.Vector3(0,this.armHeight*2 + this.handHeight, 0);
  this.isAttacking = false;
  this.isFootReplacing = false;
  this.isBlinking = false;
  this.footUsed = "left";
  this.transferPower = {x:0,y:0};
  
  
  // body

  this.body = new THREE.Group();

  // torso

  var torsoGeom = new THREE.CylinderGeometry(0, 26 ,this.bodyHeight,3,1);
  this.torso = new THREE.Mesh(torsoGeom,brownMat);
  this.torso.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/3));
  this.torso.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,-this.bodyHeight/2,0));
  
  // chest

  var chestGeom = new THREE.CylinderGeometry(6,0, 17, 3);
  chestGeom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/3));
  chestGeom.applyMatrix(new THREE.Matrix4().makeScale(1,1,.3));
  this.chest = new THREE.Mesh(chestGeom, whiteMat);
  this.chest.position.set(0,-30,1);

  // head
  this.head = new THREE.Group();

  var faceGeom = new THREE.BoxGeometry(30,this.faceHeight,30);
  this.face = new THREE.Mesh(faceGeom,brownMat);
  this.face.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,this.faceHeight/2,0));
  this.face.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/4));


  // scarf
  var scarfGeom = new THREE.CylinderGeometry(10,9,9,10, 1);
  this.scarf1 = new THREE.Mesh(scarfGeom, redMat);
  this.scarf1.material.side = THREE.DoubleSide;
  this.scarf1.position.y = -2;
  this.scarf1.position.z = 0;
  this.scarf1.rotation.z = .4;
  this.scarf1.rotation.y = Math.PI/3;
  
  this.scarf2 = this.scarf1.clone();
  this.scarf2.scale.set(.9,.7,.9);
  this.scarf2.position.y = -17;
  this.scarf2.rotation.z = -.2;

  var scarfGeom2 = new THREE.BoxGeometry(50,2,10);
  this.scarf3 = new THREE.Mesh(scarfGeom2, redMat);
  this.scarf3.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(25,0,0));
  this.scarf3.position.set(3,-15,2);
  this.scarf3.rotation.y = 1.2;
  this.scarf3.rotation.z = -1;

  
  this.head.add(this.scarf1);
  this.torso.add(this.scarf2);
  this.torso.add(this.scarf3);
  this.torso.add(this.chest);

  
  var skewMatrixBody = new THREE.Matrix4();
  skewMatrixBody.set(   1,    0,    0,    0,
                        0,    1,    0,    0,
                        0,    0.20,    1,    0,
                        0,    0,    0,    1  );
  

  this.torso.geometry.applyMatrix(skewMatrixBody);
  this.chest.geometry.applyMatrix(skewMatrixBody);
  

  this.body.add(this.torso);
  this.body.position.y = this.bodyHeight;

  
  // Whiskers
  var whiskerGeom = new THREE.BoxGeometry(16, .2,.2);

  this.whisker1 = new THREE.Mesh(whiskerGeom, lightBrownMat);
  this.whisker1.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-7,0,0));
  this.whisker1.position.set(-6,8,18);
  this.whisker1.rotation.z = Math.PI/12;

  this.whisker2 = this.whisker1.clone();
  this.whisker2.position.y = 6;
  
  this.whisker3 = this.whisker1.clone();
  this.whisker3.position.y = 4;

  this.whisker4 = this.whisker1.clone();
  this.whisker4.rotation.z = Math.PI - Math.PI/12;
  this.whisker4.position.x = -this.whisker1.position.x;

  this.whisker5 = this.whisker4.clone();
  this.whisker5.position.y = this.whisker2.position.y;

  this.whisker6 = this.whisker4.clone();
  this.whisker6.position.y = this.whisker3.position.y;

  this.head.add(this.whisker1);
  this.head.add(this.whisker2);
  this.head.add(this.whisker3);
  this.head.add(this.whisker4);
  this.head.add(this.whisker5);
  this.head.add(this.whisker6);

  // ears
  var rightEarGeom = new THREE.CylinderGeometry(0,8, 8, 3,1);
  rightEarGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,4,0));
  var leftEarGeom = rightEarGeom.clone();

  rightEarGeom.applyMatrix(new THREE.Matrix4().makeRotationY(1));
  rightEarGeom.applyMatrix(new THREE.Matrix4().makeScale(1,1,.7));

  leftEarGeom.applyMatrix(new THREE.Matrix4().makeRotationY(-1));
  leftEarGeom.applyMatrix(new THREE.Matrix4().makeScale(1,1,.7));
  
  
  
  var skewMatrixRightEar = new THREE.Matrix4().set(   1,    0.0,     0.0,    0,
                                                      0,    1,        0,    0,
                                                      -0.5,    0.0,     1,    0,
                                                      0,    0,        0,    1 );

  
  var skewMatrixLeftEar = new THREE.Matrix4().set(    1,    -.5,     0,    0,
                                                      0,    1,        0,    0,
                                                      0,    0.0,     1,    0,
                                                      0,    0,        0,    1 );

  this.rightEar = new THREE.Mesh(rightEarGeom, brownMat);
  this.rightEar.position.y = this.faceHeight;
  this.rightEar.position.x = -14;
  this.rightEar.position.z = -1.7;  
  
  this.leftEar = new THREE.Mesh(leftEarGeom, brownMat);
  this.leftEar.position.x = -this.rightEar.position.x;
  this.leftEar.position.z = this.rightEar.position.z;
  this.leftEar.position.y = this.rightEar.position.y;


  var rightEarInsideGeom = rightEarGeom.clone();
  rightEarInsideGeom.applyMatrix(new THREE.Matrix4().makeScale(.5, .5, .5));
  this.rightEarInside = new THREE.Mesh(rightEarInsideGeom, pinkMat);
  this.rightEarInside.position.y = .5;
  this.rightEarInside.position.x = 1;
  this.rightEarInside.position.z = 2;

  this.rightEar.add(this.rightEarInside);

  var LeftEarInsideGeom = leftEarGeom.clone();
  LeftEarInsideGeom.applyMatrix(new THREE.Matrix4().makeScale(.5, .5, .5));
  this.leftEarInside = new THREE.Mesh(LeftEarInsideGeom, pinkMat);
  this.leftEarInside.position.y = .5;
  this.leftEarInside.position.x = -1;
  this.leftEarInside.position.z = 2;

  this.leftEar.add(this.leftEarInside);

  // Eyes
  var eyeGeom = new THREE.BoxGeometry(12,12, 1);
  this.rightEye = new THREE.Mesh(eyeGeom, whiteMat);
  this.rightEye.position.set(-12,20, 10);
  this.rightEye.rotation.y = -Math.PI/4;

  this.leftEye = this.rightEye.clone();
  this.leftEye.position.x = -this.rightEye.position.x;
  this.leftEye.rotation.y = Math.PI/4;

  // Iris
  var irisGeom = new THREE.BoxGeometry(4,4,2);
  this.rightIris = new THREE.Mesh(irisGeom, brownMat);
  this.rightIris.position.x = 2;
  this.rightIris.position.y = -2;
  this.rightIris.position.z = .5;

  this.leftIris = this.rightIris.clone();
  this.leftIris.position.x = -this.rightIris.position.x;

  this.rightEye.add(this.rightIris);
  this.leftEye.add(this.leftIris);

  // nose
  var noseGeom = new THREE.CylinderGeometry(3,0,4,4)
  noseGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,-2,-4));

  var skewMatrixNose = new THREE.Matrix4().set(   1,    0,     0,    0,
                                                  0,    1,     0,    0,
                                                  0,    -.7,     1,    1.4,
                                                  0,    0,     0,    1 );

  noseGeom.applyMatrix(skewMatrixNose);
  this.nose = new THREE.Mesh(noseGeom, pinkMat);
  this.nose.position.z = 24;
  this.nose.position.y =14.1;


  // cheeks
  var cheeksGeom = new THREE.CylinderGeometry(8,8,14,4);
  cheeksGeom.applyMatrix(new THREE.Matrix4().makeScale(1,1,1.4));
  this.cheeks = new THREE.Mesh(cheeksGeom, brownMat);
  this.cheeks.position.set(0, 7, 13 );

  // mouth
  var mouthGeom = cheeksGeom.clone();//new THREE.BoxGeometry(4,2,4);
  mouthGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,-4,0));
  mouthGeom.applyMatrix(new THREE.Matrix4().makeScale(.5,.2,.5));
  this.mouth = new THREE.Mesh(mouthGeom, brownMat);
  

  // tongue
  var tongueGeom = mouthGeom.clone();
  tongueGeom.applyMatrix(new THREE.Matrix4().makeScale(.8,1,.8));
  this.tongue = new THREE.Mesh(tongueGeom, pinkMat);
  this.tongue.position.set(0, .5, 0); 
  this.mouth.add(this.tongue);

  this.mouth.rotation.x = Math.PI/4;
  this.mouth.position.set(0, 1.5, 18); 

  
  this.head.add(this.face);
  this.head.add(this.rightEar);
  this.head.add(this.leftEar);
  this.head.add(this.rightEye);
  this.head.add(this.leftEye);
  this.head.add(this.nose);
  this.head.add(this.cheeks);
  this.head.add(this.mouth);
  
  this.head.position.y = this.bodyHeight-15;
  this.head.position.z = -5;


  // shoulders
  this.rightShoulder = new THREE.Group();
  this.leftShoulder = new THREE.Group();

  this.rightShoulder.position.set(-6, this.shouldersPosition.y, 0);
  this.leftShoulder.position.set(6, this.shouldersPosition.y, 0);


  // arms
  var armGeom = new THREE.CylinderGeometry(4, 6, this.armHeight+5,4);
  armGeom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/4));
  armGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -this.armHeight/2, 0));

  this.rightArm = new THREE.Mesh(armGeom,brownMat);
  this.rightShoulder.add(this.rightArm);

  this.leftArm = this.rightArm.clone();
  this.leftShoulder.add(this.leftArm);
  
  // forearms

  var foreArmGeom = new THREE.CylinderGeometry(6, 7, this.armHeight,4);
  foreArmGeom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/4));
  foreArmGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -this.armHeight/2, 0));


  this.rightForeArm = new THREE.Mesh(foreArmGeom,brownMat);
  this.rightForeArm.position.y = -this.armHeight;
  this.rightArm.add(this.rightForeArm);

  this.leftForeArm = this.rightForeArm.clone();
  this.leftArm.add(this.leftForeArm);

  // foot = front foot
  var footGeom = new THREE.BoxGeometry(10,10,10);
  this.rightFoot = new THREE.Mesh(footGeom, whiteMat);
  this.rightFoot.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,0));
  this.rightFoot.position.set(0,-this.armHeight-5,0);
  this.rightForeArm.add(this.rightFoot);
  this.leftFoot = this.rightFoot.clone();
  this.leftForeArm.add(this.leftFoot);

  //footPad
  var footPadGeom = new THREE.BoxGeometry(8,2,8);
  this.rightFootPad = new THREE.Mesh(footPadGeom, pinkMat);
  this.rightFootPad.position.y = -4.5;
  this.rightFoot.add(this.rightFootPad)

  this.leftFootPad = this.rightFootPad.clone();
  this.leftFoot.add(this.leftFootPad)

  // knees
  var kneeGeom = new THREE.BoxGeometry(8,30,30);
  kneeGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,15,0));
  
  this.rightKnee = new THREE.Mesh(kneeGeom, brownMat);
  this.rightKnee.rotation.y = -Math.PI/6;
  this.rightKnee.position.x = -14;
  this.rightKnee.position.z = -12;

  this.leftKnee = this.rightKnee.clone();
  this.leftKnee.rotation.y = -this.rightKnee.rotation.y;
  this.leftKnee.position.x = -this.rightKnee.position.x;

  // legs = back legs
  var legGeom = new THREE.BoxGeometry(12,6,4);
  this.rightLeg = new THREE.Mesh(legGeom, whiteMat);
  this.rightLeg.position.set(0,3,17);
  this.rightKnee.add(this.rightLeg);

  this.leftLeg = this.rightLeg.clone();
  this.leftKnee.add(this.leftLeg);

  // tail

  this.tail = new THREE.Group();
  this.tail.position.z = -36;
  this.tail.position.y = 5;

  var p = this.tail;
  var currentY = 0;
  var curentRot = 0;
  var segHeight = 8;
  var recScale = 1.15;

  this.tailNSegs = 8 ;
  this.tailSegements = [];

  var tailSegGeom = new THREE.CylinderGeometry(5, 4, segHeight, 4);
  tailSegGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,segHeight/2,0));
  
  
  for (var i = 0; i<this.tailNSegs ; i++){
    var mat = (i<this.tailNSegs-1)? brownMat : whiteMat;
    var tg = tailSegGeom.clone();
    var s = Math.pow(recScale, i);
    tg.applyMatrix(new THREE.Matrix4().makeScale(s, s, s));
    var t = new THREE.Mesh(tg,mat);
    currentRot = (i==0)? - Math.PI/2 : currentRot/(i*i*i);
    t.position.y = currentY;
    t.rotation.x = currentRot;
    p.add(t);
    p = t;
    currentY = (segHeight-2)*s; 
    currentRot = 
    this.tailSegements.push(t);
  }

  // stripes Head

  var stripeGeom = new THREE.CylinderGeometry(2,0, 15,4);
  var stripe0 = new THREE.Mesh(stripeGeom, lightBrownMat);
  stripe0.rotation.y = -Math.PI/4;
  stripe0.position.x = -1.5;
  stripe0.position.y = 22;
  stripe0.position.z = 18.5;

  var stripe1 = stripe0.clone();
  stripe1.position.x = -stripe0.position.x;
  stripe1.rotation.y = -stripe0.rotation.y;

  

  var stripeGeom2 = new THREE.BoxGeometry(8,2,10);
  var stripe2 = new THREE.Mesh(stripeGeom2, lightBrownMat);
  stripe2.rotation.y = Math.PI/4;
  stripe2.position.x = 15.6;
  stripe2.position.y = 8;
  stripe2.position.z = -1;

  var stripe3 = stripe2.clone();
  stripe3.position.y = 4;

  var stripe4 = stripe2.clone();
  stripe4.rotation.y = -Math.PI/4;
  stripe4.position.x = -stripe2.position.x;

  var stripe5 = stripe4.clone();
  stripe5.position.y = stripe3.position.y;


  var stripeGeom3 = new THREE.BoxGeometry(1.6,1,10);
  var stripe6 = new THREE.Mesh(stripeGeom3, lightBrownMat);
  stripe6.position.x = -2.1;
  stripe6.position.z = 15;
  stripe6.position.y = 30;

  var stripe7 = stripe6.clone();
  stripe7.position.x = -stripe6.position.x;


  this.head.add(stripe0);
  this.head.add(stripe1);
  this.head.add(stripe2);
  this.head.add(stripe3);
  this.head.add(stripe4);
  this.head.add(stripe5);
  this.head.add(stripe6);
  this.head.add(stripe7);

  
  // stripes Knee

  var stripe9 = stripe2.clone();
  //stripe9.scale.y = 2;
  stripe9.rotation.y = 0;
  stripe9.position.y = 16;
  stripe9.position.x = -1;
  stripe9.position.z = 11;

  var stripe10 = stripe9.clone();
  stripe10.position.y = 22;
  stripe10.position.x = 1;

  var stripe11 = stripe9.clone();
  stripe11.position.y = 28;

  this.rightKnee.add(stripe9);
  this.rightKnee.add(stripe10);
  this.rightKnee.add(stripe11);

  var stripe12 = stripe9.clone();
  stripe12.position.x = -1;

  var stripe13 = stripe12.clone();
  stripe13.position.y = stripe10.position.y;
  stripe13.position.x = 1;

  var stripe14 = stripe12.clone();
  stripe14.position.y = stripe11.position.y;

  this.leftKnee.add(stripe12);
  this.leftKnee.add(stripe13);
  this.leftKnee.add(stripe14);

  this.threeGroup.add(this.body);
  this.threeGroup.add(this.head);
  this.threeGroup.add(this.rightShoulder);
  this.threeGroup.add(this.leftShoulder);

  this.threeGroup.add(this.rightKnee);
  this.threeGroup.add(this.leftKnee);
  this.threeGroup.add(this.tail);

  
  this.threeGroup.traverse( function ( object ) {
    if ( object instanceof THREE.Mesh ) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  } );
}

Cat.prototype.updateTail = function(t){
  
  for (var i=0; i<this.tailNSegs; i++){
    var angleStep = -i*.5;
    var angleAmp = Math.PI/(30/(i+1));

    var rotZ = Math.sin(t+angleStep)*angleAmp;
    var st = this.tailSegements[i];
    st.rotation.z = rotZ;//(rotY * i);
  }
}

Cat.prototype.interactWithBall = function(ballPos){
  var bDir = ballPos.clone().sub(this.shouldersPosition.clone());
  var isInDistance = bDir.length() < (this.armHeight*2 + this.handHeight + 8)*1.3;

  this.lookAt(ballPos);

  this.transferPower.x *= .8;
  this.transferPower.y *= .8;

  if (! this.isAttacking){
    if (! isInDistance){
      if (!this.isFootReplacing ){
        this.isFootReplacing = true;
        this.replaceFoot(this.footUsed);
      }
    }else{
      this.lookAt(ballPos);
      if (Math.random()>.96 ){
        this.isAttacking = true;
        this.isFootReplacing = false;
        this.attack(this.footUsed, ballPos, bDir);
      }else{
        this.isFootReplacing = false;
        var middleVector = this.shouldersPosition.clone().add(bDir.clone().multiplyScalar(.4));
        this.prepareAttack(this.footUsed, middleVector);
      }
    }
  }


  if (!this.isBlinking && Math.random()>.99){
    this.isBlinking = true;
    this.blink();
  }

  if (!this.mouthMoving && Math.random()>.99){
    this.mouthMoving = true;
    this.moveMouth();
  }
}

Cat.prototype.lookAt = function(v){
  if (!this.oldTargetLookPos)this.oldTargetLookPos = new THREE.Vector3();
  this.newTargetLookPos = v.clone();
  this.lookPos = this.oldTargetLookPos.clone().add(this.newTargetLookPos.sub(this.oldTargetLookPos).multiplyScalar(.15));
  this.head.lookAt(this.lookPos);
  this.oldTargetLookPos = this.lookPos;
}

Cat.prototype.prepareAttack = function(side, v){
  
  var angles = getAngles(v, this.rightShoulder.position, this.armHeight);
  this.updateArm(side, angles, 1, Back.easeOut, null);
}

Cat.prototype.attack = function(side, v, direction){
  _this = this;
  var shoulder = (side == "right")? this.rightShoulder : this.leftShoulder;
  var angles = getAngles(v, shoulder.position, this.armHeight);
  this.updateArm(side, angles, .15, Back.easeOut, function (){
    var isInDistance = direction.length() < (_this.armHeight*2 + _this.handHeight + 20);
    if (isInDistance) _this.transferPower = {x:-direction.x*(Math.random()*.5)-.1+Math.random()*.2,y:-direction.y*Math.random()*.5};
    _this.isAttacking = false;
    //console.log("attackComplete");
  });
}



Cat.prototype.replaceFoot = function(side){
  _this = this;
  var angles =  {theta:0, alpha:0, beta:0};
  this.updateArm(side, angles, 2, Strong.easeInOut, function (){
    _this.isFootReplacing = false;
    _this.footUsed = (_this.footUsed == "right") ? "left" : "right";
    //console.log("replaceComplete");
  });
}

Cat.prototype.updateArm = function(side, angles, speed, ease, callBack){
  var shoulder,arm, foreArm, foot;
  if (side == "right"){
    shoulder = this.rightShoulder;
    arm = this.rightArm;
    foreArm = this.rightForeArm;
    foot = this.rightFoot;
  }else{
    shoulder = this.leftShoulder;
    arm = this.leftArm;
    foreArm = this.leftForeArm;
    foot = this.leftFoot;
  }
  var ease = ease || Back.easeOut;

  var tFootAngle = Math.min (-angles.beta, Math.PI*1.5) ;

  TweenMax.to(shoulder.rotation, speed, {y:angles.theta, ease:ease} );
  TweenMax.to(arm.rotation, speed, {x:angles.alpha, ease:ease} );
  TweenMax.to(foreArm.rotation, speed, {x:angles.beta, ease:ease, onComplete:callBack} );
  TweenMax.to(foot.rotation, speed, {x:tFootAngle, ease:ease} );
}

Cat.prototype.blink = function(){
  _this = this;
  TweenMax.to (this.rightEye.scale, .07, {y:0, yoyo:true, repeat:1});
  TweenMax.to (this.leftEye.scale, .07, {y:0, yoyo:true, repeat:1, onComplete:function(){
    _this.isBlinking = false;
  }});
}

Cat.prototype.moveMouth = function(){
  _this = this;
  TweenMax.to (this.mouth.rotation, .2, {x:Math.PI/6, yoyo:true, repeat:1, onComplete:function(){
    _this.mouthMoving = false;
  }});
}

function getAngles(targetPos, shoulderPos, segmentLength){
  var ah = segmentLength;
  var alpha0, alpha1, alpha2;
  var beta0, beta1;
  var bDir = targetPos.clone().sub(shoulderPos);
  var bDirNorm = bDir.clone().normalize();
  
  var dist = bDir.length()-15 ;

  var bTargetDir = bDirNorm.clone().multiplyScalar(dist);
  var bDirMin = (dist < ah*2 ) ? bTargetDir.clone() : bDirNorm.clone().multiplyScalar(ah*2);


  // IK calculations
  var theta = Math.atan2(bDirMin.x, bDirMin.z); // shoulder orientation on Y axis
  theta = (theta < -Math.PI/2 || theta > Math.PI/2) ? 0 : theta;
  var x2 = Math.sqrt(bDirMin.x*bDirMin.x + bDirMin.z*bDirMin.z); // distance projected to x axis => used to find alpha2
  alpha2 = Math.PI/2 - Math.atan(bDirMin.y/x2);

  // cosine rule =>       C^2 = A^2 + B^2 - 2*A*B*cosC
  // =>                   cosC = (A^2 + B^2 - C^2) / 2*A*B

  var cosAlpha1 = dist / (2*ah); // in this case A^2 = C^2 = segementLength^2, then we can simplify this formula
  cosAlpha1 = (cosAlpha1>1) ? 1 : (cosAlpha1<-1)? -1 : cosAlpha1;

  alpha1 = Math.acos(cosAlpha1);
  alpha0 = (Math.PI) - (alpha1 + alpha2);
  alpha0 = Math.max(0, alpha0);


  cosBeta1 = (ah*ah + ah*ah - dist*dist) / (2*ah*ah);
  cosBeta1 = (cosBeta1 < -1) ? -1 : (cosBeta1 > 1) ? 1 : cosBeta1;
  beta1 = Math.acos(cosBeta1);
  beta0 = Math.PI - beta1;
  beta0 = Math.min(beta0, Math.PI*2/3);

  return {theta:theta, alpha:-alpha0, beta:-beta0};
}


THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the control orbits around
	// and where it pans with respect to.
	this.target = new THREE.Vector3();

	// center is old, deprecated; use "target" instead
	this.center = this.target;

	// This option actually enables dollying in and out; left as "zoom" for
	// backwards compatibility
	this.noZoom = false;
	this.zoomSpeed = 1.0;

	// Limits to how far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// Limits to how far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// Set to true to disable this control
	this.noRotate = false;
	this.rotateSpeed = 1.0;

	// Set to true to disable this control
	this.noPan = false;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to disable use of the keys
	this.noKeys = false;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	////////////
	// internals

	var scope = this;

	var EPS = 0.000001;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();
	var panOffset = new THREE.Vector3();

	var offset = new THREE.Vector3();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	var theta;
	var phi;
	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;
	var pan = new THREE.Vector3();

	var lastPosition = new THREE.Vector3();
	var lastQuaternion = new THREE.Quaternion();

	var STATE = { NONE : -1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

	var state = STATE.NONE;

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	// so camera.up is the orbit axis

	var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
	var quatInverse = quat.clone().inverse();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;

	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	// pass in distance in world space to move left
	this.panLeft = function ( distance ) {

		var te = this.object.matrix.elements;

		// get X column of matrix
		panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
		panOffset.multiplyScalar( - distance );

		pan.add( panOffset );

	};

	// pass in distance in world space to move up
	this.panUp = function ( distance ) {

		var te = this.object.matrix.elements;

		// get Y column of matrix
		panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
		panOffset.multiplyScalar( distance );

		pan.add( panOffset );

	};

	// pass in x,y of change desired in pixel space,
	// right and down are positive
	this.pan = function ( deltaX, deltaY ) {

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			// perspective
			var position = scope.object.position;
			var offset = position.clone().sub( scope.target );
			var targetDistance = offset.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

			// we actually don't use screenWidth, since perspective camera is fixed to screen height
			scope.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
			scope.panUp( 2 * deltaY * targetDistance / element.clientHeight );

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			// orthographic
			scope.panLeft( deltaX * (scope.object.right - scope.object.left) / element.clientWidth );
			scope.panUp( deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight );

		} else {

			// camera neither orthographic or perspective
			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

		}

	};

	this.dollyIn = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

		}

	};

	this.dollyOut = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

		}

	};

	this.update = function () {

		var position = this.object.position;

		offset.copy( position ).sub( this.target );

		// rotate offset to "y-axis-is-up" space
		offset.applyQuaternion( quat );

		// angle from z-axis around y-axis

		theta = Math.atan2( offset.x, offset.z );

		// angle from y-axis

		phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

		if ( this.autoRotate && state === STATE.NONE ) {

			this.rotateLeft( getAutoRotationAngle() );

		}

		theta += thetaDelta;
		phi += phiDelta;

		// restrict theta to be between desired limits
		theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

		// restrict phi to be betwee EPS and PI-EPS
		phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

		var radius = offset.length() * scale;

		// restrict radius to be between desired limits
		radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

		// move target to panned location
		this.target.add( pan );

		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );

		// rotate offset back to "camera-up-vector-is-up" space
		offset.applyQuaternion( quatInverse );

		position.copy( this.target ).add( offset );

		this.object.lookAt( this.target );

		thetaDelta = 0;
		phiDelta = 0;
		scale = 1;
		pan.set( 0, 0, 0 );

		// update condition is:
		// min(camera displacement, camera rotation in radians)^2 > EPS
		// using small-angle approximation cos(x/2) = 1 - x^2 / 8

		if ( lastPosition.distanceToSquared( this.object.position ) > EPS
		    || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {

			this.dispatchEvent( changeEvent );

			lastPosition.copy( this.object.position );
			lastQuaternion.copy (this.object.quaternion );

		}

	};


	this.reset = function () {

		state = STATE.NONE;

		this.target.copy( this.target0 );
		this.object.position.copy( this.position0 );
		this.object.zoom = this.zoom0;

		this.object.updateProjectionMatrix();
		this.dispatchEvent( changeEvent );

		this.update();

	};

	this.getPolarAngle = function () {

		return phi;

	};

	this.getAzimuthalAngle = function () {

		return theta

	};

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;
		event.preventDefault();

		if ( event.button === scope.mouseButtons.ORBIT ) {
			if ( scope.noRotate === true ) return;

			state = STATE.ROTATE;

			rotateStart.set( event.clientX, event.clientY );

		} else if ( event.button === scope.mouseButtons.ZOOM ) {
			if ( scope.noZoom === true ) return;

			state = STATE.DOLLY;

			dollyStart.set( event.clientX, event.clientY );

		} else if ( event.button === scope.mouseButtons.PAN ) {
			if ( scope.noPan === true ) return;

			state = STATE.PAN;

			panStart.set( event.clientX, event.clientY );

		}

		if ( state !== STATE.NONE ) {
			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );
			scope.dispatchEvent( startEvent );
		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( state === STATE.ROTATE ) {

			if ( scope.noRotate === true ) return;

			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			// rotating across whole screen goes 360 degrees around
			scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

			rotateStart.copy( rotateEnd );

		} else if ( state === STATE.DOLLY ) {

			if ( scope.noZoom === true ) return;

			dollyEnd.set( event.clientX, event.clientY );
			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				scope.dollyIn();

			} else if ( dollyDelta.y < 0 ) {

				scope.dollyOut();

			}

			dollyStart.copy( dollyEnd );

		} else if ( state === STATE.PAN ) {

			if ( scope.noPan === true ) return;

			panEnd.set( event.clientX, event.clientY );
			panDelta.subVectors( panEnd, panStart );

			scope.pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		if ( state !== STATE.NONE ) scope.update();

	}

	function onMouseUp( /* event */ ) {

		if ( scope.enabled === false ) return;

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );
		scope.dispatchEvent( endEvent );
		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.noZoom === true || state !== STATE.NONE ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}

		if ( delta > 0 ) {

			scope.dollyOut();

		} else if ( delta < 0 ) {

			scope.dollyIn();

		}

		scope.update();
		scope.dispatchEvent( startEvent );
		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.noKeys === true || scope.noPan === true ) return;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				scope.pan( 0, scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.BOTTOM:
				scope.pan( 0, - scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.LEFT:
				scope.pan( scope.keyPanSpeed, 0 );
				scope.update();
				break;

			case scope.keys.RIGHT:
				scope.pan( - scope.keyPanSpeed, 0 );
				scope.update();
				break;

		}

	}

	function touchstart( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.noRotate === true ) return;

				state = STATE.TOUCH_ROTATE;

				rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			case 2:	// two-fingered touch: dolly

				if ( scope.noZoom === true ) return;

				state = STATE.TOUCH_DOLLY;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );
				dollyStart.set( 0, distance );
				break;

			case 3: // three-fingered touch: pan

				if ( scope.noPan === true ) return;

				state = STATE.TOUCH_PAN;

				panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

	}

	function touchmove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.noRotate === true ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return;

				rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				rotateDelta.subVectors( rotateEnd, rotateStart );

				// rotating across whole screen goes 360 degrees around
				scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
				// rotating up and down along whole screen attempts to go 360, but limited to 180
				scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

				rotateStart.copy( rotateEnd );

				scope.update();
				break;

			case 2: // two-fingered touch: dolly

				if ( scope.noZoom === true ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				dollyEnd.set( 0, distance );
				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					scope.dollyOut();

				} else if ( dollyDelta.y < 0 ) {

					scope.dollyIn();

				}

				dollyStart.copy( dollyEnd );

				scope.update();
				break;

			case 3: // three-fingered touch: pan

				if ( scope.noPan === true ) return;
				if ( state !== STATE.TOUCH_PAN ) return;

				panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				panDelta.subVectors( panEnd, panStart );

				scope.pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

				scope.update();
				break;

			default:

				state = STATE.NONE;

		}

	}

	function touchend( /* event */ ) {

		if ( scope.enabled === false ) return;

		scope.dispatchEvent( endEvent );
		state = STATE.NONE;

	}

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
	this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start
	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;