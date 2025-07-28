const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
form.addEventListener('click',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

 const getWordInfo = async(word)=>{
    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await response.json();
    console.log(data);
   

    let definitions =data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
    <h2><strong>Word :</strong>${data[0].word}</h2>
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning : </strong>${ definitions.definition ==undefined ? "not found" : definitions.definition }</p>
    <p><strong>Example : </strong>${definitions.example == undefined ? "not found" : definitions.example}</p>
    <p><strong>Antonyms : </strong></p>
    `;

    
    if(definitions.antonyms.length === 0 ){
    resultDiv.innerHTML +=`<span> Not found</span>`}
    else{
        for(let i=0;i<definitions.antonyms.length;i++)
        {
            resultDiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`
        }
    }
   
}
