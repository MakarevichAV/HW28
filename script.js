let text = '';

let block = document.querySelector('body');

// функция для вставки текста после кнопки
function addTxt(txt) {
    let txtUnderBtn = document.createElement('p');
    txtUnderBtn.innerText = txt;
    block.append(txtUnderBtn);
}

const fetchStart = () => {
    fetch('/serviceavailable/')
        .then( resp => resp.json() )
        .then( (respData) => {
            if (respData['isSuccess']) {     // не знаю, правилно ли так делать???
                Promise.all([
                    fetch('/getinfo/')
                        .then( resp => resp.json() )
                        .then( (respData) => {
                            text = respData['text'];
                            addTxt(text)
                        } ),
                    fetch('/getdescription/')
                        .then( resp => resp.json() )
                        .then( (respData) => {
                            text = respData['text'];
                            addTxt(text)
                        } )
                ])
                    // .then(() => console.log('всё ок'))
                    .catch(() => console.log('server error')) // почему то логика срабатывания не такая как в лекции
                                                              // выдает server error даже когда один из запросов reject 
            } else {
                addTxt('произошла ошибка');  // работает 
            }
        } )
        .catch( () => {
            addTxt('произошла ошибка');  // работает
        } )
};