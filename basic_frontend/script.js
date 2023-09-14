
let data=fetchData()
async function fetchData()
{
let response=await fetch(`http://localhost:3000/drivers`);
let data=await response.json()
return data;
}
data.then((value)=>{
    value.forEach(element => {
        h1(element.driver)
    });
})



function h1(text)
{
    const h1=document.createElement('h1');
    h1.innerHTML=text;
    h1.style.backgroundColor="orange"
    h1.style.color="white"
    h1.style.fontFamily='sans-serif'
    h1.style.padding='10px'
    document.body.appendChild(h1);   
}