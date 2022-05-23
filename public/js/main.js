document.querySelector('button').addEventListener('click', getMichigan)

async function getMichigan () {
    try{
        const res = await fetch('http://localhost:8000/api/michigan')
        const data = await res.json()

        console.log(data)
        document.querySelector('#sport').textContent = data.sport
    }

    catch(err){
        console.log(err)
    }
}