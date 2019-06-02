class Particle {
	constructor(x,y,r){
		this.centerX = x;
		this.centerY = y;
		this.x;
		this.y;
		this.couple;
		this.radius = 10;
		this.maxRadius = 10;
		this.pathRadius = 100;
		this.radians = r;
		this.vel = 0.01;
		this.alpha = 1;
	}
	update(){
		// Update Alpha
		if (this.y > (window.innerHeight*0.5)){
			this.alpha = ((window.innerHeight-this.y)/(window.innerHeight*0.5));
		}
		else{
			this.alpha = (this.y/(window.innerHeight*0.25));
		}
		// Draw Lines
		if (this.couple != null){
			c.beginPath();
			c.moveTo(this.x,this.y);
			c.lineTo(this.couple.x,this.couple.y);
			c.strokeStyle = "rgba(255,255,255,"+this.alpha+")";
			c.stroke();
			c.closePath();
		}
		// Update Size
		let sizeMod = (this.y - (this.centerY-(this.pathRadius*0.5)))/(this.pathRadius*0.5);
		this.radius = this.maxRadius * sizeMod;
		// Update Positions
		this.radians += this.vel;
		this.x = this.centerX + this.pathRadius * (Math.cos(this.radians));
		this.y = this.centerY + (this.pathRadius * (Math.sin(this.radians))*0.2);
	}
	postprocess(){
		// Fill
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		c.strokeStyle = "rgba(255,255,255,"+this.alpha+")";
		c.stroke();
		c.fillStyle = "black";
		c.fill();
		c.closePath();
	}
}
function init(){
	plane = 0;
	while (plane <= cntPlanes){
		n = 0;
		r = 0;
		centX = innerWidth * 0.5;
		centY = (plane*30);
		while (n < cntParticles){
			p = new Particle(centX,centY,r);
			particles.push(p);
			p.vel = (p.vel * ((cntPlanes-(plane*0.5))/cntPlanes));
			if (n>0){
				particles[n+(cntParticles*plane)].couple = particles[(n+(cntParticles*plane))-1];
			}
			if (n==cntParticles-1){
				particles[(cntParticles*plane)].couple = particles[n+(cntParticles*plane)];
			}
			n += 1;
			r += Math.PI * 0.5;
		}
		plane += 1;
	}
	update();
}
function update(){
	c.fillStyle = 'rgba(0,0,0,0.5)';
	c.fillRect(0,0,innerWidth,innerHeight);
	c.beginPath();
	c.fillStyle = "white";
	c.closePath();
	for (let i = 0; i < particles.length; i++){
		p = particles[i];
		p.update();
	}
	for (let i = 0; i < particles.length; i++){
		p = particles[i];
		p.postprocess();
	}
	requestAnimationFrame(update);
}
let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let particles = [];
let cntParticles = 4;
let cntPlanes = 30;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
