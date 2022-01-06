let canvas=document.querySelector('canvas')
let ctx=canvas.getContext('2d')

let counter=0
let falling_piece=[]
let static_pieces=[]
let create_new_piece_status=true
let temporary_dx=0
let dy=20
let rotation_status=false
let score=0
function move(){
    if(counter%7==0 || counter==0){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if(create_new_piece_status==true){
            falling_piece=create_piece()//this function will return a list which consist of box objects (a snake)
            create_new_piece_status=false
        }
        change_x_and_y()//change x and y of the boxes in the 'falling piece'
        draw_pieces()
        if(collision_status()==true){
            static_pieces.push(falling_piece)
            create_new_piece_status=true
            line_clear()
            if(game_over_check()==true){
                alert('Game over!')
                return
            }
        }
    }
    counter++
    requestAnimationFrame(move)
}

move()
document.addEventListener('keydown',change_temporary_dx_and_rotation)
function change_x_and_y(){
    if(collision_status()==false){
        for(let w in falling_piece){
            falling_piece[w].y+= dy
            falling_piece[w].x+= temporary_dx
        }
    }
    temporary_dx=0
    dy=20
}
function Box_constructor(x,y,colour,version){
    this.x=x
    this.y=y
    this.colour=colour
    this.version=version
}
function create_piece(){
    //origin is x=160,y=-40
    let shape=[]
    let random_shape_number=Math.floor(Math.random()*7)+1
    if(random_shape_number==1){
        for(let i=0;i<4;i++){
            let box=new Box_constructor(160+i*20,-60,'orange',1)
            shape.push(box)
        }
    }else if(random_shape_number==2){
        let box1=new Box_constructor(160,-20,'blue',1)
        let box2=new Box_constructor(180,-40,'blue',1)
        let box3=new Box_constructor(160,-40,'blue',1)
        let box4=new Box_constructor(200,-40,'blue',1)
        shape.push(box1,box2,box3,box4)
    }else if(random_shape_number==3){
        let box1=new Box_constructor(160,-40,'purple',1)
        let box2=new Box_constructor(180,-40,'purple',1)
        let box3=new Box_constructor(200,-40,'purple',1)
        let box4=new Box_constructor(200,-20,'purple',1)
        shape.push(box1,box2,box3,box4)
    }else if(random_shape_number==4){
        let box1=new Box_constructor(160,-20,'cyan',1)
        let box2=new Box_constructor(180,-40,'cyan',1)
        let box3=new Box_constructor(180,-20,'cyan',1)
        let box4=new Box_constructor(200,-40,'cyan',1)
        shape.push(box1,box2,box3,box4)
    }else if(random_shape_number==5){
        let box1=new Box_constructor(160,-40,'lime',1)
        let box2=new Box_constructor(180,-40,'lime',1)
        let box3=new Box_constructor(180,-20,'lime',1)
        let box4=new Box_constructor(200,-20,'lime',1)
        shape.push(box1,box2,box3,box4)
    }else if(random_shape_number==6){
        let box1=new Box_constructor(160,-40,'yellow',1)
        let box2=new Box_constructor(180,-40,'yellow',1)
        let box3=new Box_constructor(200,-40,'yellow',1)
        let box4=new Box_constructor(180,-20,'yellow',1)
        shape.push(box1,box2,box3,box4)
    }else if(random_shape_number==7){
        let box1=new Box_constructor(180,-20,'red',1)
        let box2=new Box_constructor(180,-40,'red',1)
        let box3=new Box_constructor(200,-40,'red',1)
        let box4=new Box_constructor(200,-20,'red',1)
        shape.push(box1,box2,box3,box4)
    }
    return shape
}
function draw_pieces(){
    for(let i=0;i<falling_piece.length;i++){
        ctx.beginPath()
        ctx.fillStyle='black'
        ctx.fillRect(falling_piece[i].x,falling_piece[i].y,20,20)
        ctx.beginPath()
        ctx.fillStyle=falling_piece[i].colour
        ctx.fillRect(falling_piece[i].x+1,falling_piece[i].y+1,18,18)
    }
    for(let w in static_pieces){
        for(let i=0;i<static_pieces[w].length;i++){
            ctx.beginPath()
            ctx.fillStyle='black'
            ctx.fillRect(static_pieces[w][i].x,static_pieces[w][i].y,20,20)
            ctx.beginPath()
            ctx.fillStyle=static_pieces[w][i].colour
            ctx.fillRect(static_pieces[w][i].x+1,static_pieces[w][i].y+1,18,18)
        }
    }
}

function collision_status(){
    let status=false
    let loop_breaker_1=false
    let loop_breaker_2=false
    for(let i=0;i<falling_piece.length;i++){
        if(falling_piece[i].y + 20 == canvas.height){
            status=true
            break
        }
        for(let c=0;c<static_pieces.length;c++){
            for(let w=0;w<static_pieces[c].length;w++){
                if(falling_piece[i].y+20 == static_pieces[c][w].y && falling_piece[i].x == static_pieces[c][w].x){
                    status=true
                    loop_breaker_1=true
                    break
                }
            }
            if(loop_breaker_1==true){
                loop_breaker_2=true
                break
            }
        }
        if(loop_breaker_2==true){
            break
        }
    }
    return status
}

function r_arrow_legit_or_not(){
    let status=true
    let loop_breaker_1=false
    let loop_breaker_2=false
    for(let i=0;i<falling_piece.length;i++){
        if(falling_piece[i].x+20== canvas.width){
            status=false
            //console.log('yes')
            break
        }
        for(let c=0;c<static_pieces.length;c++){
            for(let w=0;w<static_pieces[c].length;w++){
                if(falling_piece[i].x + 20 == static_pieces[c][w].x && falling_piece[i].y == static_pieces[c][w].y ){
                    status=false
                    loop_breaker_1=true
                    break
                }
            }
            if(loop_breaker_1==true){
                loop_breaker_2=true
                break
            }
        }
        if(loop_breaker_2==true){
            break
        }
    }
    return status
}
function l_arrow_legit_or_not(){
    let status=true
    let loop_breaker_1=false
    let loop_breaker_2=false
    for(let i=0;i<falling_piece.length;i++){
        if(falling_piece[i].x == 0){
            status=false
            break
        }
        for(let c=0;c<static_pieces.length;c++){
            for(let w=0;w<static_pieces[c].length;w++){
                if(falling_piece[i].x == static_pieces[c][w].x+20 && falling_piece[i].y == static_pieces[c][w].y){
                    status=false
                    loop_breaker_1=true
                    break
                }
            }
            if(loop_breaker_1==true){
                loop_breaker_2=true
                break
            }
        }
        if(loop_breaker_2==true){
            break
        }
    }
    return status
}
function change_temporary_dx_and_rotation(e){
    if(e.key=='ArrowRight' && r_arrow_legit_or_not()==true){
        temporary_dx=20
        dy=0
    }else if(e.key=='ArrowLeft' && l_arrow_legit_or_not()==true){
        temporary_dx=-20
        dy=0
    }else if(e.key=='ArrowUp'){
        rotate()
    }
}
function rotate(){
    dy=0
    let shape=[]
    if(falling_piece[0].colour=='orange' ){
        if(falling_piece[0].version==1){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'orange',2)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'orange',2)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'orange',2)
            let box4=new Box_constructor(falling_piece[1].x,falling_piece[1].y+40,'orange',2)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==2){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'orange',1)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'orange',1)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'orange',1)
            let box4=new Box_constructor(falling_piece[1].x+40,falling_piece[1].y,'orange',1)
            shape.push(box1,box2,box3,box4)
        }
    }else if(falling_piece[0].colour=='blue'){
        if(falling_piece[0].version==1){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y-20,'blue',2)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'blue',2)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'blue',2)
            let box4=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'blue',2)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==2){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'blue',3)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'blue',3)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'blue',3)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y-20,'blue',3)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==3){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'blue',4)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'blue',4)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'blue',4)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y+20,'blue',4)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==4){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y+20,'blue',1)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'blue',1)
            let box3=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'blue',1)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'blue',1)
            shape.push(box1,box2,box3,box4)
        }
    }else if(falling_piece[0].colour=='purple'){
         if(falling_piece[0].version==1){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y+20,'purple',2)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'purple',2)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'purple',2)
            let box4=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'purple',2)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==2){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'purple',3)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'purple',3)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'purple',3)
            let box4=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y-20,'purple',3)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==3){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'purple',4)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'purple',4)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'purple',4)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y-20,'purple',4)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==4){
            let box1=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y+20,'purple',1)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'purple',1)
            let box3=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'purple',1)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'purple',1)
            shape.push(box1,box2,box3,box4)
        }     
    }else if(falling_piece[0].colour=='cyan'){
         if(falling_piece[0].version==1){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'cyan',2)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'cyan',2)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'cyan',2)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y+20,'cyan',2)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==2){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y+20,'cyan',1)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'cyan',1)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'cyan',1)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'cyan',1)
            shape.push(box1,box2,box3,box4)
        }      
    }else if(falling_piece[0].colour=='lime'){
         if(falling_piece[0].version==1){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'lime',2)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'lime',2)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'lime',2)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y-20,'lime',2)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==2){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'lime',1)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'lime',1)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'lime',1)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y+20,'lime',1)
            shape.push(box1,box2,box3,box4)
        }      
    }else if(falling_piece[0].colour=='yellow'){
         if(falling_piece[0].version==1){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'yellow',2)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'yellow',2)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'yellow',2)
            let box4=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'yellow',2)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==2){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'yellow',3)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'yellow',3)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'yellow',3)
            let box4=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'yellow',3)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==3){
            let box1=new Box_constructor(falling_piece[1].x,falling_piece[1].y-20,'yellow',4)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'yellow',4)
            let box3=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'yellow',4)
            let box4=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'yellow',4)
            shape.push(box1,box2,box3,box4)
        }else if(falling_piece[0].version==4){
            let box1=new Box_constructor(falling_piece[1].x-20,falling_piece[1].y,'yellow',1)
            let box2=new Box_constructor(falling_piece[1].x,falling_piece[1].y,'yellow',1)
            let box3=new Box_constructor(falling_piece[1].x+20,falling_piece[1].y,'yellow',1)
            let box4=new Box_constructor(falling_piece[1].x,falling_piece[1].y+20,'yellow',1)
            shape.push(box1,box2,box3,box4)
        }     
    }
    let status= true
    let loop_breaker_1=false
    let loop_breaker_2=false
    for(let i=0;i< shape.length;i++){
        if(shape[i].x < 0 || shape[i].x+20 > canvas.width || shape[i].y +20 > canvas.height  ){
            status=false
            break
        }
        for(let w=0;w< static_pieces.length;w++){
           for(let c=0;c< static_pieces[w].length;c++){
               if(shape[i].x== static_pieces[w][c].x && shape[i].y== static_pieces[w][c].y){
                   status=false
                   loop_breaker_1=true
                   break
               }
           }
           if(loop_breaker_1==true){
               loop_breaker_2=true
               break
           }
        }if(loop_breaker_2==true){
            break
        }
    }
    if(status==true && falling_piece[0].colour !='red'){
        falling_piece=shape
    }
}
function cut_layer(num){
    for(let w=0;w< static_pieces.length;w++){
        let indexes_to_remove=[]
        for(let c=0;c< static_pieces[w].length;c++){
            if(static_pieces[w][c].y==num){
                indexes_to_remove.push(c)
            }
            if(static_pieces[w][c].y < num){
                static_pieces[w][c].y+=20
            }
        }
        static_pieces[w]=static_pieces[w].filter(function(x,index){
            if(indexes_to_remove.indexOf(index)==-1){
                return true
            }
        })
    }
}
function line_clear(){
    for(let i=0;i<=500;i+=20){
        let counter=0
        for(let w=0;w< static_pieces.length;w++){
            for(let c=0;c< static_pieces[w].length;c++){
                if(static_pieces[w][c].y==i){
                    counter++
                }
            }
        }
        if(counter==19){
            cut_layer(i)
            score+=100
            document.querySelector('h1').textContent='Score : '+ score.toString()
            break
        }
    }
}
function game_over_check(){
    let status=false
    for(let i=0;i<falling_piece.length;i++){
        if(falling_piece[i].y < 0){
            status=true
            break
        }
    }
    return status
}
