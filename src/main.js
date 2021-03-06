
const botonMenu = document.getElementById('menuHide');
const returnFilter = document.getElementById('returnFilter');
const botonFilter = Array.from(document.getElementsByClassName("boton-filter"));
const browser = document.getElementById("browser");
const orderedButton = document.getElementById("orderedByAZ");
const orderedReverseButton = document.getElementById("orderedByZA");
const computeStats = document.getElementById("prom");
const buttonNav = document.getElementById("buttonNav");
const dataShow = document.getElementById("menuShow");
const headerTransition = document.getElementById("header");
botonMenu.addEventListener("click", showfilter)

const pokemonData = fetch('./data/pokemon/pokemon.json')

let pokemon = [];

pokemonData.then((response)=> {
  
  return response.json();
})
.then(data => {
  
  pokemon = data.pokemon
  drawPokemon(pokemon) 
  
})



function showfilter() {

  let menuShow = document.getElementById('menuShow');
  menuShow.classList.toggle("mostrar");
}




const getTypePokemon = (arrayButtons) => {
  arrayButtons.map((buttonType) => {
    buttonType.addEventListener("click", (event) => {
      const buttonType = event.target.id;
      console.log(buttonType)
      const finalArrayPokemons = window.data.filterData(pokemon, buttonType)
      drawPokemon(finalArrayPokemons)
    })
    buttonType.addEventListener("mouseover", (event) => {
      new Audio('./audio/boton2 (2).mp3').play();
    })
  })
}

getTypePokemon(botonFilter);

buttonNav.addEventListener("click", () => {
  drawPokemon(pokemon);
})

const drawPokemon = (arrayPokemons) => {
  const sectionRoot = returnFilter
  console.log("sirvo")
  sectionRoot.innerHTML = "";
  arrayPokemons.map((pokemon) => {
    sectionRoot.insertAdjacentHTML('beforeend',`
    <div class="pokedex btnn " data-toggle="modal" data-target="#miModal${pokemon.name}">
    <p>N°${pokemon.num}</p>
    <img src="${pokemon.img}" />
    <p>${pokemon.name.toUpperCase()}</p>
    <p class="${pokemon.type[0]} tipoP">${pokemon.type}</p>
  </div>
  <div class="modal fade modalpokemon " id="miModal${pokemon.name}" tabindex="-1" role="dialog"
    aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content modalWidth">
        <div class="modal-header ${pokemon.type[0]}">
        <h4 class="modal-title  mx-auto" id="myModalLabel">${pokemon.name.toUpperCase()}</h4>
          <button type="button" class="close " data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
         
        </div>

        <div class="modal-body">
          <img src="${pokemon.img}" class="imgpokemon"></br>
          <section class="${pokemon.type[0]} section-type">
            <table style="width:80%" class="${pokemon.type[0]} table-type">
              <tr>
                <th class="weaknesses">Height</th>
                <th class="weaknesses">Weight</th>
              </tr>
              <tr>
                <td>${pokemon.height}</td>
                <td>${pokemon.weight}</td>
              </tr>
              <tr>
                <th class="weaknesses">Candy Count</th>
                <th class="weaknesses">Spawns</th>
              </tr>
              <tr>
                <td>${pokemon.candy_count}</td>
                <td>${pokemon.avg_spawns}</td>
              </tr>
              <tr>
                <td colspan="2" class="weaknesses">Weaknesses</td>
              </tr>
            </table>
            <p>${pokemon.weaknesses}</p>
          </section>
        </div>
      </div>
    </div>
  </div>


  `)
  })

}

drawPokemon(pokemon);

const filterLetter = () => {
  browser.addEventListener('keyup', () => {
    let searchValueInput = browser.value;
    drawPokemon(window.data.filterInput(pokemon, searchValueInput));
  });
}
filterLetter();

orderedButton.addEventListener("click", () => {
  const newSortedData = window.data.sortData(pokemon);
  drawPokemon(newSortedData);
});

orderedReverseButton.addEventListener("click", () => {
  const dataForReverse = window.data.sortData(pokemon);
  const dataReverse = dataForReverse.reverse();
  drawPokemon(dataReverse);
});

computeStats.addEventListener("click", () => {
  const newProm = window.data.computeStats(pokemon)
  const sectionRoot = dataShow
  sectionRoot.innerHTML = "";
  sectionRoot.innerHTML += `<h4>Promedio de dulces por pokemon</h4><p>${newProm}</p>`
  return sectionRoot

});



// sonidos



// setTimeout(function(){headerTransition.style.display='none';},10000);
