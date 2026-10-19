const url = 'http://localhost:8089/api/ToDo';
const url1 = 'http://localhost:8089/api/user';
const userlogintodo = 'http://localhost:8089/api/ToDo/users'

const todos = document.querySelector("#todos");
const btn = document.querySelector("#btn");
const printtodo= document.querySelector("#pusertodo")
const todo = document.querySelector("#todo")
const user = document.querySelector("#user")
const post = document.querySelector("#post")
const login= document.querySelector("#login")
const usertodo = document.querySelector("#usertodo")

const getTodo = async () =>{
    let response = await fetch (url1);
    console.log(response);
    let data = await response.json();
    console.log(data)
    todos.innerHTML="";
    for(let a of data){
    todos.innerHTML += `
        <p><strong>id:</strong> ${a.id}</p>
        <p><strong>name:</strong> ${a.name}</p>
         <p><strong>email:</strong> ${a.email}</p>
        <p><strong>password:</strong> ${a.password}</p><hr>
`;}
} 
btn.addEventListener("click", getTodo);


   
    const fetchTodoById = async(id) => {
        
    console.log(id);
        const response = await fetch(`${url}/${id}`);
        const tod = await response.json();
        todo.innerHTML=`
        <p>id:${tod.id}</p>
        <p>Title:${tod.title}</p>
        <p>description:${tod.description}</p>`;

        
    } 
    function getid() {
            const id=document.querySelector("#inputid").value
            console.log(id);
            fetchTodoById(id);
    };
    btnid.addEventListener("click", getid);

    const puserid = async(userid) =>{
        console.log(userid);
        let response = await fetch(`${url}/users/${userid}`);
        console.log(response);
        let data=await response.json()
        console.log(data);
        printtodo.innerHTML="";
        for(b of data){
        printtodo.innerHTML += `
        <p> id:${b.id}</p>
        <p> Title:${b.title}</p>
        <p> description: ${b.description}</p><hr>`;}
    }

function getuserid() {
    const userid=document.querySelector("#usertodo").value
    console.log(userid);
    puserid(userid);
}

    user.addEventListener("click",getuserid);


    async function postd(name, email, password){
        try{
            const response = await fetch("http://localhost:8089/api/user", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                     name:name,
                     email:email,
                     password:password
                })
            });

            const json = await response.json();
            console.log(json);
        }
        catch(error){
            console.error("Error:", error);
        }
        
    }

    function data(){
      const  name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();
        console.log(name);
        postd(name, email, password)
    }
 post.addEventListener("click", data)


 

 // find by email and password
async function checkdatabase(e,p){
    try{
        const response = await fetch("http://localhost:8089/api/user/login",{
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                email : e,
                password : p
            })
        });

        const data1 = await response.json();
        console.log(data1);

        const response1 = await fetch(`${userlogintodo}/${data1}`);
          console.log(response1);
        let data2=await response1.json()
        console.log(data2);
        usertodo.innerHTML="";
        for(b of data2){
        usertodo.innerHTML += `
        <p> id:${b.id}</p>
        <p> Title:${b.title}</p>
        <p> description: ${b.description}</p><hr>`;}
    }
     catch(error){
            console.error("Error:", error);
        }
}



function check(){
    const e = document.querySelector("#emaiilin").value.trim();
    const p = document.querySelector("#passwordin").value.trim();
    checkdatabase(e,p);
}
 login.addEventListener("click", check)

/*
function postd(){
    fetch(url1,{ method :"POST",
        body: JSON.stringify({
            name:"vivek",
            email:"password",
            password:"abc"
        }),
    })
    .then((response)=>response.json())
    .then((json) => console.log(json));
}*/
   
     


/*
    btn.addEventListener("click", () => { 

    fetch(url)
    .then(data =>{
        todos.innerHTML = `
        <p><strong>id:</strong> ${data.id}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>description:</strong> ${data.description}</p>
        `;
        
    })
    .catch(error=>{
        todos.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        console.error(`Fetch error: `, error);
    });
    
});*/
