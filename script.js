function bolaCentro(){
// recolocar a bola no centro
    positionBallX = fieldWidth / 2
    positionBallY = fieldHeight / 2
    velBallPosX = -velBallPosX
    velBallPosY = 3
}
function drawing(){
// comando de area e cor do campo
    drawingArea.fillStyle = '#286047'
    drawingArea.fillRect(0, 0, fieldWidth, fieldHeight)


// comando da linha do meio do campo
    drawingArea.fillStyle = '#ffffff'
    drawingArea.fillRect((fieldWidth/2) - (rowWidth/2), 0, rowWidth, fieldHeight)
        

// Raquete 1
    drawingArea.fillStyle = '#f00'
    drawingArea.fillRect(0, posPlayer1 , rowWidth, racketHeight)
//Raquete 2
    drawingArea.fillStyle = '#f00'
    drawingArea.fillRect(fieldWidth - rowWidth , posPlayer2 , rowWidth, racketHeight)


// A tal da Bola
    drawingArea.fillStyle = '#000'
    drawingArea.fillRect(positionBallX - ballWidth/2, positionBallY - ballWidth/2, ballWidth, ballWidth)

// Escrever pontuacao dos jogadores
    drawingArea.fillText(`Player1 - ${pointPlayer1} pontos`, 100, 100)
    drawingArea.fillText(`Player2 - ${pointPlayer2} pontos`, fieldWidth - 200, 100)
}        

function calcule(){//movimento da bola
    positionBallX += velBallPosX
    positionBallY += velBallPosY
// Verifica lateral superior
    if( positionBallY < 0 && velBallPosY < 0){
        velBallPosY = - velBallPosY
    }
// Verifica lateral inferior
    if( positionBallY > fieldHeight && velBallPosY > 0){
        velBallPosY = - velBallPosY
    }

// Verifica se o jogador 2 fez ponto
    if( positionBallX < 0 ){
        if( positionBallY > posPlayer1 && positionBallY < posPlayer1 + racketHeight ){
            velBallPosX = -velBallPosX

        var efectBallY = positionBallY - (posPlayer1 + racketHeight / 2)
        velBallPosY = efectBallY * efectRacket
    }else{
    // Pontos do jogador caso a bola passe
        pointPlayer2++

    // recolocar a bola no centro
        bolaCentro()
    }
    }


// Verifica se o jogador 1 fez ponto
    if( positionBallX > fieldWidth){
        if( positionBallY > posPlayer2 && positionBallY < posPlayer2 + racketHeight ){
            velBallPosX = -velBallPosX

            var efectBallY = positionBallY - (posPlayer2 + racketHeight / 2)
            velBallPosY = efectBallY * efectRacket
        }else{
        // Pontos do jogador caso a bola passe
            pointPlayer1++

        // recolocar a bola no centro
            bolaCentro()
        }
    }

// Movimento da raquete do player2
    if( posPlayer2 + racketHeight / 2 < positionBallY){
        posPlayer2 += velPlayer2

    }else {
    // Pontos do jogador caso a bola passe
        posPlayer2 -= velPlayer2
    }
        
}
window.onload = function(){
    setInterval(principal, 1000/ 80)
}
function variables(){
    drawingSheet = document.getElementById('sheet')
    drawingArea = drawingSheet.getContext("2d")

    fieldWidth = 600
    fieldHeight = 500
    rowWidth = 7

    racketHeight = 50
    ballWidth = 10

    efectRacket = 0.3;
    velPlayer2 = 5;
    positionBallX = positionBallY = 5
    velBallPosX = (velBallPosY = 5)
    posPlayer1 = posPlayer2 = 225
    pointPlayer1 = (pointPlayer2 = 0)
}
variables()
drawingSheet.addEventListener('mousemove', function(e){
    posPlayer1 = e.clientY - racketHeight / 2
})     
function principal(){
    drawing()
    calcule()
            
}