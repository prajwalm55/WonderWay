import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [apiData, setApiData] = useState();
    const [error, setError] = useState()
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                
                if(!response.ok){
                    setError('failed to fetch')            
                }
        
                const result = await response.json()
                setApiData(result.data)
                
            } catch (error) {
                
            }
          }

          fetchData();
    }, [url])
  
    return {apiData, error}
}

export default useFetch
