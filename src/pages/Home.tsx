import React, { useEffect} from 'react'
import { setProductInfo } from '../slices/productSlice/productSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {

    const dispatch = useDispatch();
  
    // @ts-ignore
    const { data: products, refetch } = useGetProductsQuery(); 
    
    useEffect(() => {
      if(products){
        dispatch(setProductInfo(products)) 
    }
    }, [products])
  
    
  
   
 
  return (
    <></>
  )
}

export default Home