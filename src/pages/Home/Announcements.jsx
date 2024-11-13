import React, { useEffect, useState } from "react";
const newsData = [
    {
        title: "IIT Ropar CEOA recieves best Outreach Activity Award 2024",
        news: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, minima sit? Sunt ad accusamus iste vitae quisquam! Ratione soluta debitis sequi facilis illum voluptate voluptatum, eligendi earum beatae ex ad perspiciatis quasi! Corrupti a hic dolorem veritatis asperiores iure sed.",
        link: "www.google.com"
    },
    {
        title: "IIT Ropar CEOA recieves best Outreach Activity Award 2024",
        news: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, minima sit? Sunt ad accusamus iste vitae quisquam! Ratione soluta debitis sequi facilis illum voluptate voluptatum, eligendi earum beatae ex ad perspiciatis quasi! Corrupti a hic dolorem veritatis asperiores iure sed.",
        link: "www.google.com"
    }

]
async function getNewsData(){
try {
    const data = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=2dji2UHasbQnhK8k3H3V5mnJXypS-40_4R9TYlZywA3LeFNnabBGLTMF-0JfyZr-H0beDoYzVHyGpocmYcBmhV9mNNrkMELBm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLzoCv0sfZVOw87x-kEEjviGDy9jdYoFIbxpZJ8PdML4l_nuSSD2d0UJq1QsVxlw2VRhK5_pE1DmGP2u7Apaoavq41W-T5X6RA&lib=MSYLcSSsoBRq56Ezg7I6e5-uB6aQWfZai')
    const dataJSON = await data.json()

    return dataJSON.data
} catch (error) {
    console.log(error.message)
}
}

function Announcements() {
    const [news, setNews] = useState(newsData)
    
    // useEffect(()=>{
    //     getNewsData()
    //     .then(res => {  
    //         setNews(res)
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })
    //     ;     
    // }, [])
  return (
    <div className="bg-white border-y ">
    <div className="mx-auto max-w-7xl py-12 px-8 sm:py-16 ">
      <div className="mx-auto flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Announcements 📢</h2>
        <div className="flex flex-col gap-6">
        {
                news.map((data,i )=>{
                    return(
                        <div key={i} className={`pb-3 ${i === news.length - 1 ? "": "border-b"}`}>
                        <h1 className="text-base font-semibold leading-6 text-gray-900">
                            {data.title}
                        </h1>
                        <p className="my-2 text-sm text-gray-500">
                            {data.news}
                        </p>
                        <a href={`${data.linkedinLink}`} target="_blank" className="text-sm text-blue-600 underline">Read more</a> 
                        </div>

                    )
                })
            }
        </div>
            
        
      </div>
    </div>
    </div>
  );
}

export default Announcements;
