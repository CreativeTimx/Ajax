const content = document.getElementById('cont');
const cont2 = document.getElementById('cont2');
const img = document.getElementById('img');
const img2 = document.getElementById('img2');
const load = document.getElementById('load');

window.addEventListener('load', function(e){
    const reqAll = new XMLHttpRequest;
    reqAll.open("GET", "https://restcountries.com/v3.1/all");
    reqAll.send();

    reqAll.onload = function () {
        let data = reqAll.responseText;
        data = JSON.parse(data);
        console.log(data);

        let opt = "";
        for(c of data){
            opt =  `${opt} <option>${c.name.common}</option>`;
        }
        
        const selAll = document.createElement('select');
        selAll.innerHTML = opt;
        selAll.className = "select";
        content.appendChild(selAll);
        
        selAll.addEventListener('change', function(e){
            load.style.display = "inline-block";

            let i = e.target.selectedIndex;
            let country = e.target.options[i].innerHTML;

            const reqFlag = new XMLHttpRequest;
            reqFlag.open("GET", "https://restcountries.com/v3.1/name/" + country);
            reqFlag.send();

            reqFlag.onload = function () {
                let data = reqFlag.responseText;
                data = JSON.parse(data);
                console.log(data);

                img.src = data[0].flags.svg;
                img2.src = data[0].coatOfArms.svg;

                const conPor = document.createElement ('div');
                conPor.innerText = "Population:  " +  data[0].population;
                cont2.innerText = "";
                cont2.appendChild(conPor);
                
            }
            reqFlag.onreadystatechange = function () {
                if(reqFlag.readyState == 4){
                    load.style.display = "none";
                }
            }
        })
    }
        
    
})