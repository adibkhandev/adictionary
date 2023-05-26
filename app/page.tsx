"use client"
import {useState,useEffect,useRef} from 'react'
import Image from 'next/image'
import main from '../styles/main.module.scss'
import axios from 'axios'
export default function Home() {
  let [response,setResponse]=useState(null)
  let [animate,setAnimate]= useState(0)
  let [array,setArray]=useState([])
  let [notfound,setNotfound]= useState(false)
  let buttonRef = useRef(null)
  console.log(array,'arr')
  console.log(animate,'an')
  let keyHandler = e => {
    console.log(e.key)
    if(event.key=='Enter'){
        buttonRef.current.click()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown',keyHandler)
    return () => {
       document.removeEventListener('keydown',keyHandler)
    };
  }, [])

  useEffect(() => {
    console.log(response,'res')
    if(response && response.length<1){
      setNotfound(true)
    }
    else{
      setNotfound(false)
    }
  }, [response])


  let [loaded,setLoaded]=useState(false)
  let [wordData,setWordData] = useState({
      word:null,
      phonetic:null,
      audio:null
  })
  console.log(wordData,'word')
  useEffect(() => {
  let loading = setTimeout(()=>{
       
       setLoaded(true)
       console.log('done')
  },200);

  return () => {
      clearTimeout(loading)  
  };
}, [])

 
   return (
       <>
       {loaded?(
           <div className="dictionary-cont relative w-screen h-screen overflow-scroll lg:overflow-hidden ">
                     <div className="absolute z-5 top-0 w-screen h-screen">
                     <div 
                       onTransitionEnd={()=> {
                         if(animate==1){
                          setAnimate(2)
                         }
                       }}

                       className={`transition-[margin] duration-600 search-cont w-screen flex justify-center ${animate==0?"md:mt-96 mt-almost":'mt-6'}`}
                      >
                       
                       <div 
                        onClick={()=>{
                          if(animate==0){
                           setAnimate(1)
                          }

                         }
                        }
                        onAnimationEnd={()=>setAnimate(2)}
                        className="search-cta drop-shadow-md  flex justify-center items-center h-16 w-16 lg:w-20 lg:h-20 bg-white mr-4 rounded"
                        ref={buttonRef}
                        >
                         <img className="w-1/4 opacity-40" src="search.svg" alt=""/>
                       </div>
                       
                       <input 
                       onClick={()=>{
                         if(animate==2){
                         setAnimate(1)
                         }
                        }
                       }
                       className=" pl-12 w:4/5 h-16  xs:pl-6 xs:w-2/3 lg:h-20 md:w-2/5 lg:text-md lg:pl-8 bg-white rounded drop-shadow-md text-xs"
                       onChange={(e)=>{
                                let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.value}` 
                                console.log(e.target.value,'ee')
                                if(animate==2){
                                    console.log('nai')
                                    setAnimate(1)
                                }
                               
                                axios.get(url)
                                .then((response)=>{
                                  if(response.status==200){
                                     console.log(response.data,'response recieved')
                                     setResponse(response.data[0].meanings)
                                 
                                     setWordData({
                                      ...wordData,
                                      word:response.data[0].word?response.data[0].word:null,
                                      phonetic:response.data[0].phonetic || response.data[0].phonetics[0].text || null,
                                      audio:response.data[0].phonetics[0].audio?response.data[0].phonetics[0].audio:null 
                                      
                                     })
                                  }
                                
                          

                                })
                                .catch((err)=>{
                                      console.log(err)
                                      console.log('caught')
                                      setResponse([])
                                        setWordData({word:null,phonetic:null,audio:null})
                                })
                                                             
                       }} 
                       placeholder="Search for words"
                       type="text"
                       />
                     
                     </div>
               
             </div>











            
             
              <div
              onAnimationEnd={()=> { 
                
                if(animate==1){
                 setAnimate(0)
                }
              }

              }
              className= {` pb-8 px-4 mt-40 w-screen ${animate!=2?"result-gone":"result-there"} `}
              >    
                   <div className="header ml-14 my-6 ">
                     <h1 className=" mb-2 font-bitterBlack text-7xl" >{wordData.word}</h1>
                     <div className="phonetics flex items-center">
                        <h1 className="font-bitterMedium" >{wordData.phonetic}</h1>
                        {wordData.audio?(
                        <button
                            
                          onClick={()=>{
                          if(wordData && wordData.audio){
                            let audio = new Audio(wordData.audio)
                            audio.play()
                          }
                        }}>
                           <img className="ml-2 h-3" src="play.png" alt=""/>
                        </button>
                        ):''}
                     </div>
                   </div>
                     
                   <div className="meanings-cont results-cont">
                       {response && (response.length!=0)?(
                          response.map((res)=>{
                           return(
                            
                            <div className="h-min max-w-3xl drop-shadow-2xl bg-gray-200 mx-12 p-4 rounded-lg">
                              <div className="font-bitterBold text-xs">
                                
                                <h1 className="w-min mb-2  px-2 py-1 bg-slate-50 rounded drop-shadow-md">
                                 {res.partOfSpeech}
                                </h1>
                                  
                              </div>  
                              {res.definitions.map((def)=>{
                                return (
                                  <div className="mb-2 ml-1" > 
                                   <h1 className="font-bitterBold text-sm my-1">
                                    {def.definition}
                                   </h1>  
                                   <h1 className="font-bitterLight text-sm">
                                    {def.example}
                                   </h1>   
                                  </div> 
                                )
                              }

                              )}   
                            
                            </div>
                                      
                           )
                             
                       })):(
                       <div className={`notfound-cont drop-shadow-lg cont w-screen flex justify-center mt-52 font-bitterMedium text-lg ${animate>=1?"opacity-700":"opacity-0"}`}>
                        <h1>No words found</h1>
                       </div>
                      )}
                     
                   </div>
                    
                     

                </div>

            
            
                   
            

            


           </div>


        ):<Loading/>}
       </>  
  )
}
const Loading = () => {
  
  return (
      <>
      <div className="loader-cont flex justify-center items-center w-screen h-screen ">
        {/* <div class="loadingio-spinner-gear-egou1xzblmq">
          <div class="ldio-vwjzpsv2m8n">
            <div><div>
              
            </div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          </div>*/}
           <img className="w-8 opacity-90" src="Gear.gif" alt=""/>
            
          </div>

      </>

  )
}
