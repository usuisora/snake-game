import React, { Component } from 'react'
var speed = 200
var gP='';
var g ='';
var a =[0,0]
var s =20;
var dir = 1;
var t = null;
var st = null;
var slime = [[0,0],[1,0],[2,0]]
var rand = (max) =>{
    var k = Math.floor(Math.random() * 50);
    return k*s
}
export class Game extends Component {
    
  state = {
    counter : 0
  }
 
    reload = ()=>{
      window.location.reload(false);
    }
    
    redrawApple = () =>{

        g.clearRect(0,0,500,500)
        g.fillStyle = 'red';
         a = [rand(gP.width),rand(gP.width)]
         if(a[1]> 500 || a[0]>500){
           this.redrawApple()
         }
         console.log(gP.heigth)
        g.fillRect(...a,s,s);
        console.log(a[0],a[1])

    };

    drawApple=()=>{
      g.fillRect(...a,s,s);
    };
    handleLeft = (e) =>{
      
      if(dir == 1){
        dir= 4;
      }
      else{
        dir = dir -1
      }
     
      
    };

    About =()=> {
      alert('Use arrows to play !\n Up - speeding up;\nDown - hold up\n Left and Right .....')
    }
    keyPressed = (e) =>{
      console.log(e.which)
       if(e.which == 37){
         this.handleLeft()
       }
       if(e.which == 39){
        this.handleRight()
      }

        if(e.which == 38){
          speed = 80;
          clearInterval(st);
            st = setInterval(()=>{
            this.drawSlime();
            
          },speed)
          console.log(speed)
        }
        if(e.which == 40){
          speed = 200;
          clearInterval(st);
            st = setInterval(()=>{
            this.drawSlime();
            
          },speed)
          console.log(speed)
        }
      
    
    };
    handleRight = (e) =>{
      if(dir == 4){
         dir =1 
      }
      else{
        dir = dir +1 
      }
    };

    drawSlime  = () =>{

      g.clearRect(0,0,500,500)
      g.fillStyle  = 'red';
       this.drawApple()
      g.fillStyle  = 'white';
      var lastIndex = slime.length -1;
      var last = slime[lastIndex];
      // console.log(dir,"-",last)
     
       // eslint-disable-next-line default-case
       switch (dir){
              case 1 : {
                if(last[0]==25-1){
                  last = [0,last[1]]
                }
                slime.push([last[0]+1,last[1]]);
              
                break;
              }
              case 2 :{
                if(last[1]==25-1){
                  last = [last[0],0]
                }
                slime.push([last[0],last[1]+1]);
              
                break;
              }
              case 3 :{
                if(last[0]==1){
                  last = [25,last[1]]
                }
                slime.push([last[0]-1,last[1]]);
            
                break;

              }
              case 4 :{
                if(last[1]==1){
                  last = [last[0],25]
                }

                slime.push([last[0],last[1]-1]);
                
                break;
              }
              
              ;;
            

        
       } 

       if(((last[0]*s) === a[0]) &&  ((last[1]*s) ===a[1]))
       {

         this.setState({
           ...this.state,
           counter : this.state.counter+1
         })
        clearInterval(t);
        this.redrawApple();
        t = setInterval(()=>{
          this.redrawApple()
        },20000)
                    
   }else{
          slime.shift()
   }
       slime.forEach(el =>{
           g.fillRect(el[0]*s,el[1]*s,s,s)
      })
    
       };
      
    
      // slime.push([last[0]+1,last[1]]);
      // slime.shift() 
    

      

    
   
    componentDidMount = () =>{
      gP = document.getElementById('gP');
      g = gP.getContext('2d');
      this.redrawApple();
      
      st = setInterval(()=>{
        this.drawSlime();
        
      },speed)

      t = setInterval(()=>{
        this.redrawApple()
      },20000)
    

    };


    render() {
    
      return (
        <div onKeyDown={this.keyPressed}  tabIndex="0">
             <canvas id="gP" onLoad={this.handleLoad} width = "500px" height = '500px'>HTML5 не поддерживается</canvas>
              <h3>{this.state.counter}</h3>
             <button onClick = {this.reload}>Reload</button>
      
             <button onClick = {this.About}>?</button>
        </div>
      )
    }

  }




export default Game
// onKeyDown={this.handleRight}