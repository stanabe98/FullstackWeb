function fetchData(){
    const url= "https://reactnative.dev/movies.json"
    fetch(url, {method : 'GET'})
        .then((res) =>res.json())
        .then((data)=> console.log(data.movies[0]))
        .catch((error)=> console.log(error))
}

async function populate(){
    var selectBox = document.getElementById("foodSaved");
    var selected= document.querySelector('#foodSaved')
    var output = selected.options[selected.selectedIndex].label
    var selectedValue = selectBox.options[selectBox.selectedIndex].label;
    console.log(foodSaved)
}

function dateformatted(){
    var selected = document.getElementById("createdAt").value;
    console.log(selected) 
}