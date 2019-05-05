var json = null;
window.onload = function () {
    (async () => {
        const response = await fetch('./data/pizza.json')
        json = await response.json()

        let containerHTML = '';
        for (let i = 0; i < json.pizza_bon.length; i++) {
            containerHTML += `
        <div id="card-${i}" class="card" style="margin-bottom: 1rem">
            <div class="card-body">
            <img src="${json.pizza_bon[i].src}"></img><br>${json.pizza_bon[i].name}<br>${json.pizza_bon[i].price}<br>${json.pizza_bon[i].description}
           <br>
            <button type="button" class="btn btn-danger">В корзину</button>
            <button type="button" class="btn btn-info" id="more-${i}" data-toggle="modal" data-target="#modalBasket${i}" onclick="drawBox(${i})">Подробнее...</button>
            </div>
        </div> 
        `;
        }
        document.getElementById('card_container').innerHTML = containerHTML;
        // adaugat 
        // document.querySelector('#content').addEventListener("click", function(event){
        //     verifica(event);
        // })


    })()
}

// setTimeout(function() {
//     // console.log(json)
//     console.log(json)
// }, 2000);

function drawBox(id) {
    let where = document.querySelector('#content');
    where.innerHTML = `
            <div class="modal fade" id="modalBasket${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div id="contCard" class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Описание</h5>
                        </div>
                    <div style="width:48%;" class="modal-body">
                        <ul class="list-group">
                            <img src="${json.pizza_bon[id].src}"></img><br>${json.pizza_bon[id].name}<br><span class='price' value=${json.pizza_bon[id].price[0]}>${json.pizza_bon[id].price[0]}</span>${json.pizza_bon[id].price[1]}<br>${json.pizza_bon[id].description}
                            <br>
                        </ul>
                        <div class="btn-group" role="group" aria-label="Basic example" id='cantitateblock'>
                            <button type="button" id="decrease" class="btn btn-secondary" setcant="decrement">-</button>
                            <span class="input-group-text" id="productCount">1</span>
                            <button type="button" id="increase" class="btn btn-secondary" setcant="increment">+</button>
                            <button type="button" id="remove" class="btn btn-danger" >Убрать</button>
                        </div>
                    </div>
                   
                    <div id="choise">
                        <h4> Тесто </h4>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox1" value="0" name="gros" checked>
                            <label class="form-check-label" for="inlineCheckbox1">Тонкое</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox2" value="20" name="gros">
                            <label class="form-check-label" for="inlineCheckbox2">Толстое</label>
                        </div> 
                        <h4> Форма теста </h4>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox3" value="0" name="foram" checked>
                            <label class="form-check-label" for="inlineCheckbox3">Круглая</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox4" value="5" name="foram">
                            <label class="form-check-label" for="inlineCheckbox4">Овальная</label>
                        </div> 
                        <h4> Размер </h4>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox5" value="0" name="dimens" checked>
                            <label class="form-check-label" for="inlineCheckbox5">Маленькая</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox6" value="10" name="dimens">
                            <label class="form-check-label" for="inlineCheckbox6">Средняя</label>
                        </div> 
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox7" value="20" name="dimens">
                            <label class="form-check-label" for="inlineCheckbox7">Большая</label>
                        </div> 
                        <h4> Дополнительные </h4>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="5">
                            <label class="form-check-label" for="inlineCheckbox8">Зелень</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox9" value="10">
                            <label class="form-check-label" for="inlineCheckbox9">Перец</label>
                        </div> 
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox10" value="15">
                            <label class="form-check-label" for="inlineCheckbox10">Маслины</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox11" value="20">
                            <label class="form-check-label" for="inlineCheckbox11">Сыр</label>
                        </div> 
                        <div class="form-check form-check-inline"></div> 
                    </div>               
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary" id="acceptOrder">Заказать </button>
                    </div>
                </div>
            </div>
        </div>`;
        let inputs = where.querySelectorAll("input");
        //console.log(inputs);
        //let price = 0;
        inputs.forEach(element => {
            element.onchange = function(){
                //console.log("input click")
                //if(element.checked)
                    calculeaza(inputs);
            }
        });
        let catitateblock = document.querySelector('#cantitateblock');
        let productCount = document.querySelector('#productCount');
        catitateblock.addEventListener("click", function(event){
            if(event.target.getAttribute("setcant") || event.target.getAttribute("setcant"))
                cantitateaseter(event.target.getAttribute("setcant"));
                //console.log(event.target.getAttribute("setcant"))
        })
}


function calculeaza(inputs){
    let priceadaus = 0;
    inputs.forEach(element => {
        if(element.checked)
            //console.log("click");
            priceadaus += parseInt(element.value)
    });
    setPrice(priceadaus);
    //console.log(priceadaus);
}
function setPrice(priceadaus){
    let price = document.querySelector('.price');
    let defoultprice = parseInt(price.getAttribute("value"))
    price.innerHTML = defoultprice + priceadaus;
}
function cantitateaseter(what){
    //console.log(what)
    let cantitatea = document.querySelector("#productCount");
    if( what == "increment")
        cantitatea.innerHTML = parseInt(cantitatea.innerHTML) + 1
    if( what == "decrement")
        if(parseInt(cantitatea.innerHTML) > 1)
            cantitatea.innerHTML = parseInt(cantitatea.innerHTML) - 1
}