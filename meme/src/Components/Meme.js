import React from "react"

export default function Meme(){
    
    const [meme, setMeme]= React.useState({
        topText: "",
        bottomText: "" ,
        randomImage: "https://i.imgflip.com/26jxvz.jpg"})

    const [allMemeImages, setAllMemeImages] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res =>res.json())
        .then(data =>setAllMemeImages(data.data.memes))
    }, [])

       function getMemeImage(){
        const randomNumber= Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url     
        setMeme(prevMeme=>{
            return{
                ...prevMeme, randomImage: url
            }
        })
        
           }  
           function handleChange(event){
            const {name, value}= event.target
            setMeme(prevMeme=>{
                return{
                    ...prevMeme, 
                    [name]: value
                }
            }) 

           }
       
        return(
        <main>
            
            <div className="form">
                <input 
                type="text" 
                placeholder="Top Text" 
                className="form-input"
                name ="topText"
                value={meme.topText} 
                onChange={handleChange}/>

                <input 
                type="text" 
                placeholder="Buttom Text" 
                className="form-input"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}/>

                <button 
                className="form-button"
                onClick={getMemeImage}>
                Get a new meme image  🖼
                </button>
            </div>
            <div className= "display-meme">
            <img 
            className= "memeimage"
            src={meme.randomImage} 
            alt="meme-"/>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
                          </main>
    )   
}               