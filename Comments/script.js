
let cardBox = document.querySelector('.cardBox')
let dataUser = []
let datafetch = []
window.addEventListener('load' , function(){
    fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
        dataUser = [...dataUser , {
            name : data.results[0].name.first , 
            picture : data.results[0].picture.large , 
            country : data.results[0].location.country , 
            id : `${parseInt((datafetch.length) + 1 )}`
        }]
        
        fetch('https://react-course-385d0-default-rtdb.asia-southeast1.firebasedatabase.app/users.json' , {
            method : "POST" , 
            body : JSON.stringify(dataUser)
        })
    })
})
function FetchApi(){
    fetch('https://react-course-385d0-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
    .then(res => {
        return res.json()
    })
    .then(data =>{ 
        datafetch = Object.entries(data) ;
        cardBox.innerHTML = ''
        datafetch.forEach(item => {
            
            cardBox.insertAdjacentHTML('beforeend',
                `
            <div class="card">
                <div class="card-header">
                    <img src=${item[1][0].picture} width="40px" alt="">
                    <ul>
                        <li><h5>Name : ${item[1][0].name} </h5></li>
                        <li><h6>Country : ${item[1][0].country} </h6></li>
                    </ul>
                </div>
                <p>hello my name is ${item[1][0].name} and I'm from ${item[1][0].country}. in my opinion  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptates magni quas aliquid vel possimus nihil repellat, ipsum pariatur veniam id quae qui nulla tempore expedita molestiae amet porro ullam?</p>
                <button onclick="DeleteItem('${item[0]}')">delete</button>
            </div>
            `
            )
        })
    })
    .catch(err => {
        console.error("Something went Wrong in your API")
    })
}
window.addEventListener('load' , function(){
    FetchApi()
})

async function DeleteItem(clientId){
    await fetch(`https://react-course-385d0-default-rtdb.asia-southeast1.firebasedatabase.app/users/${clientId}.json` , {
        method:"DELETE"
    }).then(data => {
        console.log(data) 
        FetchApi()
    })
}
