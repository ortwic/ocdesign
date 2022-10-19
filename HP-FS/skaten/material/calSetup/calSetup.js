




/*============= Frame Klasse =============*/

CFrame = function (id) 
{
    this.cnv = new jsGraphics(id);
    this.id = id;
    this.lftOs = 40; // Offset links
    this.scl = 2; // Skalierung
    this.r1 = 76;
    this.r2 = 80;
    this.r3 = 80;
    this.r4 = 76;
    this.frLen = 243;
    
    this.drwIt();
}

CFrame.prototype.drwIt = function (what)
{
    var spBtwAxle = this.frLen/3;
    var tmpDff, tmpRad, tmpX, tmpY;
    
    // Rollen
    this.cnv.setColor("#808080");
    this.cnv.setStroke(2);
    
    // Rolle 1
    tmpRad = this.r1 * this.scl;
    tmpX = ((100-this.r1)/2 + spBtwAxle) * this.scl;
    tmpY = ((100-this.r1)/2 + this.lftOs) * this.scl;
    this.cnv.drawEllipse(tmpX, tmpY, tmpRad, tmpRad);
    //this.cnv.fillEllipse(tmpX, tmpY, 10, 10);

    // Rolle 2
    tmpRad = this.r3 * this.scl;
    tmpX = ((100-this.r2)/2 + spBtwAxle*2) * this.scl;
    tmpY = ((100-this.r2)/2 + this.lftOs) * this.scl;    
    this.cnv.drawEllipse(tmpX, tmpY, tmpRad, tmpRad);
    
    // Rolle 3
    tmpRad = this.r3 * this.scl;
    tmpX = ((100-this.r3)/2 + spBtwAxle*3) * this.scl;
    tmpY = ((100-this.r3)/2 + this.lftOs) * this.scl;
    this.cnv.drawEllipse(tmpX, tmpY, tmpRad, tmpRad);

    // Rolle 4
    tmpRad = this.r4 * this.scl;
    tmpX = ((100-this.r4)/2 + spBtwAxle*4) * this.scl;
    tmpY = ((100-this.r4)/2 + this.lftOs) * this.scl;
    this.cnv.drawEllipse(tmpX, tmpY, tmpRad, tmpRad);

    // Frame
    var margin = 5;
    
    this.cnv.setColor("#c0c0c0");
    this.cnv.setStroke(2);
    tmpRad = (this.frLen + margin*2) * this.scl;
    tmpX = (100/2-margin + spBtwAxle) * this.scl;
    tmpY = (100/2-margin + this.lftOs) * this.scl;
    this.cnv.drawRect(tmpX, tmpY, tmpRad, margin*4);
    
    this.cnv.paint();
    
    return;
}
