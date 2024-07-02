import React, {useState, useEffect} from 'react'
import { setProductInfo } from '../slices/productSlice/productSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import { useDispatch,useSelector } from 'react-redux';

const DisplayTask: React.FC = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const dispatch = useDispatch();
  
    // @ts-ignore
    const { data: products, refetch } = useGetProductsQuery(); 
    
    useEffect(() => {
      if(products){
        dispatch(setProductInfo(products)) 
    }
    }, [products])
  
    
  
   
 
  return (
    <>
     <p className='text-red-700'>  cull right</p>
    </>
  )
}

export default DisplayTask