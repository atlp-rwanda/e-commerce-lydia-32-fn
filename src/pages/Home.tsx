import React, {useState, useEffect} from 'react'
import { setProductInfo } from '../slices/productSlice/productSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import { useDispatch,useSelector } from 'react-redux';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

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
  

    </>
  )
}

export default DisplayTask