function cookiesWarning({
    message='Utilizamos cookies para melhorar a sua experiência neste site. Ao fechar esta mensagem sem modificar as definições do seu navegador, você concorda com a utilização deles. Saiba mais sobre cookies e nossa <a style="font-weight: bold; color: #ED4B13;" href="/politica-de-cookies/" target="_blank">política de privacidade</a>.',
    backgroundColor='rgba(0, 0, 0, 0.95)',
    textColor='#f2f2f2',
    buttonBackgoundColor='#ED4B13',
    buttonHoverBackgoundColor='#ED4B13',
    buttonTextColor='#f2f2f2'
}){
    var check = localStorage.getItem('avisoCookies')
    if(!check){
        var body = document.getElementsByTagName('body')[0];
        body.innerHTML += `
        <style>
            #aviso-cookies {
                z-index:100000;
                display:flex;
                flex-direction: column;
                width:100%;
                max-width: 1080px;
                position:fixed;
                bottom:20px;  
                left:50%; 
                transform: translate(-50%, 0);  
                background-color:${backgroundColor};
                padding:10px 20px;
                box-sizing:border-box;
                box-shadow:0 0 7px rgb(0 0 0 / 50%);
                justify-content:center;
                align-items:center;
                border-radius: 0px;
                border: 1px solid #ED4B13;
                
            }
            
            #texto-cookies {
                font-family:'Montserrat', sans-serif;
                font-size:12px; 
                margin:0 20px 0 0;
                text-align: left;
                line-height:2.25rem;
                color:${textColor}
            }

            #texto-cookies * {
                font-family:'Montserrat', sans-serif;
                font-size:14px;
                line-height:2.25rem;
                color:${textColor}
            }

            #entendi-cookies{
                font-family:'Montserrat', sans-serif;
                background:${buttonBackgoundColor};
                transition: 0.3s all ease;
                -o-transition: 0.3s all ease;
                -ms-transition:0.3s all ease;
                -moz-transition:0.3s all ease;
                -webkit-transition:0.3s all ease;
                color:${buttonTextColor};
                text-shadow:0 1px 1px rgb(0 0 0 / 20%);
                border-radius: 0px;
                border: 1px solid rgba(0,0,0,0.1);
                border-bottom-color: rgba(0,0,0,0.2);
                font-size: 14px;
                padding: 6px 14px;
                cursor: pointer;
                line-height:19px;
                width: 250px;
                text-transform: uppercase;
            }

            #entendi-cookies:hover{
                background-color: ${buttonHoverBackgoundColor};
            }

            @media (min-width: 1024px) {
                #aviso-cookies {
                    flex-direction: row;
                }
            }
        </style>
        <div id="aviso-cookies">
            <span id="texto-cookies">${message}</span>
            <button id="entendi-cookies">Continuar e Fechar</button>
        </div>`;
        document.getElementById('entendi-cookies').addEventListener('click', function(){
            localStorage.setItem("avisoCookies", "accept");
            document.getElementById('aviso-cookies').remove()
        })
    }
}