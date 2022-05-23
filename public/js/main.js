const trashButton = document.querySelectorAll('.fa-trash')

Array.from(trashButton).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

async function deleteItem () {
    const playerName = this.parentNode.childNodes[1].innerText
    const sportName = this.parentNode.childNodes[3].innerText
    const schoolName = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'playerName': playerName,
                'sportName': sportName,
                'schoolName': schoolName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){console.log(err)}
}