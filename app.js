let arrayImages = [
    { id:'1' , img:'1.jpg', text:'Nicoletta', state:0 } ,
    { id:'2' , img:'2.jpg', text:'Stella', state:0},
    //{ id:'3' , img:'3.jpg', text:'Andreina'},
    //{ id:'4' , img:'4.jpg', text:'Brunilde'},
    { id:'5' , img:'5.jpg', text:'Roxana', state:0} ,
    //{ id:'6' , img:'6.jpg', text:'Ana'},
    { id:'7' , img:'7.jpg', text:'Camilla', state:0},
    { id:'8' , img:'8.jpg', text:'Leandro', state:0},
    { id:'9' , img:'9.jpg', text:'Riccardo', state:0} ,
    //{ id:'10' , img:'10.jpg', text:'Michele'},
    //{ id:'11' , img:'11.jpg', text:'Paolo'},
    { id:'12' , img:'12.jpg', text:'Max', state:0},
    { id:'13' , img:'13.jpg', text:'Silvio', state:0} ,
    { id:'14' , img:'14.jpg', text:'Davide', state:0},
    { id:'15' , img:'15.jpg', text:'Luca', state:0},
    { id:'16' , img:'16.jpg', text:'Marco P', state:0},
    { id:'17' , img:'17.jpg', text:'Marco G', state:0} ,
    { id:'18' , img:'18.jpg', text:'Gerd', state:0},
    { id:'19' , img:'19.jpg', text:'Valentino', state:0},
    { id:'20' , img:'20.jpg', text:'Stefano', state:0},
    { id:'21' , img:'21.jpg', text:'Enrico', state:0} ,
    { id:'22' , img:'22.jpg', text:'Sara', state:0},
    //{ id:'23' , img:'23.jpg', text:'Nadja'},
    { id:'24' , img:'24.jpg', text:'Anna', state:0},
    { id:'25' , img:'25.jpg', text:'Fabio', state:0},
    //{ id:'26' , img:'26.jpg', text:'Kai'}
    { id:'27' , img:'27.jpg', text:'William', state:0},
    { id:'28' , img:'28.jpg', text:'Viviana', state:0},
    { id:'29' , img:'29.jpg', text:'Marta', state:0},
    { id:'30' , img:'30.jpg', text:'Erik', state:0},
    { id:'31' , img:'31.jpg', text:'Erika', state:0},
    { id:'32' , img:'32.jpg', text:'Michela', state:0},
    { id:'33' , img:'33.jpg', text:'Felipe', state:0},
    { id:'34' , img:'34.jpg', text:'Stefania', state:0},
];

const initNames = ( start ) => {
    let startIndex = start >= arrayImages.length ? start % arrayImages.length : start
    for (let index = 0 ; index < 6 ; index++) {
        startIndex = startIndex == 0 ? (arrayImages.length - 1) : (startIndex - 1)
    }
    
    document.getElementById('my-box').innerHTML = ''
    let fontStandard = 8
    let displayedElement = 13
    for (let index = 0; index < displayedElement ; index++) {
        let tempIndex = startIndex + index
        let arrayIndex = tempIndex >= arrayImages.length ? tempIndex % arrayImages.length : tempIndex
        
        // caloc
        const rowDiv = document.createElement('div')
        let fontSize = index < 7 ? ( fontStandard + index * 3 ) : ( fontStandard + ( 36 - index * 3 ) )
        rowDiv.style.fontSize = `${fontSize}px`

        if( index == 6 ){
            rowDiv.style.border = `1px solid lightgrey`
            rowDiv.style.fontWeight= `bold`
        }
        rowDiv.innerHTML= arrayImages[arrayIndex].text
        document.getElementById('my-box').appendChild(rowDiv) 
    }
}

const scrollAndSelect = async ( position ) => {
    let selected = 0
    let random = Math.floor(Math.random() * 2);
    let max = 24 + random;
    for (let index = 0; index < max ; index++) {
        if( index < 20 ) await new Promise(r => setTimeout(r, 100));
        else if( index < 23 ) await new Promise(r => setTimeout(r, 200));
        else if( index < 24 ) await new Promise(r => setTimeout(r, 300));
        else await new Promise(r => setTimeout(r, 600));
        selected = position + index 
        initNames( selected )  
    }

    return selected >= arrayImages.length ? selected % arrayImages.length : selected
}

$( document ).ready(function() {
    $('.fa-spin').css('display','none');
    // append righe lista in base all'array iniziale sulla sinistra
    for( index in arrayImages ){
        //let img = arrayImages[index].img;
        let text = arrayImages[index].text;
        let rowDiv = `<div class="my-row" data-index=${arrayImages[index].id}>
                            <div>
                                ${text}
                            </div>
                      </div>`;
        $('#my-list').append(rowDiv);
    } // fine for
    initNames(0)
}); //


// funzione che riproduce un suono
function playSound(){
    var audio = new Audio('./sound.mp3');
    audio.play();
} // fine playSound

jQuery(document).on("click", "#randomButton", async function (event) {
    var audio = new Audio('./sound.mp3');
    audio.play();
    $('#randomButton').prop('disabled',true);
    // scelta a caso dell'immagine
    let selectedIndex = selectImage( arrayImages );
    // partendo dalla scelta a caso viene fatta unn'ulteriore scelta casuale
    selectedIndex = await scrollAndSelect( selectedIndex )
    // operazioni sull'oggetto scelto
    const obj = arrayImages[selectedIndex];
    $(`.my-row[data-index=${obj.id}]`).css('font-weight','bold');
    // calsse per disattivare alla prossima estrazione
    $(`.my-row[data-index=${obj.id}]`).addClass('extracted');
    arrayImages = removeImage( arrayImages , selectedIndex );
    $('#randomButton').prop('disabled',false);
});

// sceglie un indice dell'array e ritorna l'indice
function selectImage( tempArray ){
    let length = tempArray.length;
    if( length === 0 ) return false;
    return selectedIndex = Math.round(Math.random()*(length-1));

} // fine select image


// ritorna l'array con un elemnto in meno (indice in parametri)
function removeImage( tempArray , selectedIndex ){
    // rimozione oggetto dall'array
    tempArray.splice( selectedIndex , 1 );
    return tempArray;
} // fine removeImage

function showImage( selectedIndex ){
    // oggetto selezionato, estratto
    let obj = arrayImages[selectedIndex];
    // immagine impostata come nascosta
    $('#output-img > img').hide();
    // cancellazione nome nel riquadro centrale
    $('#output-name').html(``);
    // cancellazione persona dalla lista
    $('.extracted').css('color','lightgrey');
    $('.extracted').css('text-decoration','line-through');
    // impostazione src per immagine corrispondente all oggetto estratto
    $('#output-img > img').attr(`src`,`./images/${obj.img}`);
    // visualizzazione icona di spin
    $('#icon-spin').css('display','inline-block');
    // funzione che inizia dopo tot secondi
    setTimeout(
        function()
        {
            // scomparsa icona che gira
            $('#icon-spin').css('display','none');
            // conparsa nome della persona estratta
            $('#output-name').html(`<div>${obj.text}</div>`);
            // bold nella lista della persona estratta
            $(`.my-row[data-index=${obj.id}]`).css('font-weight','bold');
            // calsse per disattivare alla prossima estrazione
            $(`.my-row[data-index=${obj.id}]`).addClass('extracted');
            // comparsa dell 'immagine
            $('#output-img > img').fadeIn();
            $('#randomButton').prop('disabled',false);
        }, 3000);

} // fine showImage

jQuery(document).on("click", ".my-row", function (event) {
    // id della div cliccata
    let id = $(this).attr('data-index');
    // oggetto in base lla div cliccata
    let obj = arrayImages.find(x => x.id === `${id}`);
    let index = arrayImages.findIndex(x => x.id === `${id}`);
    arrayImages = removeImage( arrayImages , index );
    // calsse per disattivare alla prossima estrazione
    $(`.my-row[data-index=${obj.id}]`).addClass('extracted');
    // cancellazione persona dalla lista
    $('.extracted').css('color','lightgrey');
    $('.extracted').css('text-decoration','line-through');
    initNames(0)
}); // fine click .my-row
