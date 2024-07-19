import React, { useEffect, useState } from 'react';
import { useGetCartQuery } from '../slices/cartSlice/cartApiSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import { useBuyerCreateOrderMutation } from '../slices/orderSlice/buyerOrderApiSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinners'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip';


const Checkout = () => {
    const navigate = useNavigate();
    const { data: cart, isLoading: cartLoading, error: cartError } = useGetCartQuery();
    const { data: products, isLoading: productsLoading } = useGetProductsQuery();
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [createOrder, { isLoading: orderLoading }] = useBuyerCreateOrderMutation();
    const [country, setCountry] = useState('');
    const [payment, setPayment] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (cart && cart.items && products?.products && Array.isArray(products.products)) {
            const cartItemsWithDetails = cart.items.map(item => {
                const productDetails = products.products.find(p => p.productId === item.productId);
                return { ...item, ...productDetails, quantity: item.quantity };
            });
            setCartProducts(cartItemsWithDetails);
            calculateTotal(cartItemsWithDetails);
        }
    }, [cart, products]);

    const calculateTotal = (items) => {
        const newTotal = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        setTotal(newTotal);
    };

    if (cartLoading || productsLoading) {
        return <Spinner />;
    }

    if (cartError) {
        return <div>Error loading cart</div>;
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (payment && country && city && street) {
            try {
                const orderData = {
                    payment,
                    address: [{ country, city, street }],
                }

                const result = await createOrder(orderData).unwrap();
                toast.success("Order placed successfully");
                navigate('/order-confirmation', { state: { order: result.order } });

            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            toast.error('Please fill in all required fields');
        }
    }

    const isFormValid = payment && country && city && street;

    return (
        <form onSubmit={handleSubmit} className="container mx-auto px-4 pt-20 md:pt-40 pb-10">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-40'>
                <div className='shadow-2xl p-4 md:p-8 w-full mt-10 rounded-xl transition-all duration-300 transform hover:scale-105'>
                    <div className='flex justify-center mb-6 md:mb-10 font-bold text-xl'>
                        <h2>ORDER SUMMARY</h2>
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <span className='text-lg md:text-xl font-semibold'>Products</span>
                            <span className='text-lg md:text-xl font-semibold'>Subtotals</span>
                        </div>
                        <div className='border-b-2 mt-5'></div>
                        {cartProducts.map((item) => (
                            <React.Fragment key={item.productId}>
                                <div className='flex justify-between py-2 mt-5'>
                                    <p>{item.productName}</p>
                                    <p>Rwf {item.price}(x{item.quantity})</p>
                                </div>
                                <div className='border-b-2'></div>
                            </React.Fragment>
                        ))}
                        <div className='flex justify-between py-2 mt-5'>
                            <p>Subtotals</p>
                            <p>Rwf {total}</p>
                        </div>
                        <div className='border-b-2'></div>
                        <div className='flex justify-between py-2 mt-5'>
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                        <div className='border-b-2'></div>
                        <div className='flex justify-between py-2'>
                            <span className='text-xl font-semibold'>Total</span>
                            <p className='font-semibold text-green-500'>Rwf {total}</p>
                        </div>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 gap-8 content-start'>
                    <div className='shadow-2xl p-4 md:p-8 w-full mt-10 rounded-xl transition-all duration-300 transform hover:scale-105'>
                        <h2 className='font-bold text-xl text-center mb-10'>Please fill the form to proceed to payment</h2>
                        <div className='flex justify-center mb-6 md:mb-10 font-bold text-xl'>
                            <h2>Billing details</h2>
                        </div>
                        <div>
                            <div className='flex flex-col mb-6 md:mb-10'>
                                <label htmlFor="Payment">Payment options..*</label>
                                <select
                                    value={payment}
                                    onChange={(e) => setPayment(e.target.value)}
                                    name="payment" id="payment" className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'>
                                    <option value="">Select payment method</option>
                                    <option value="Stripe">Stripe</option>
                                </select>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <label htmlFor="country">Country..*</label>
                                <input
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    type="text"
                                    placeholder="Country"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                />
                            </div>
                            <div className='flex flex-col mb-4'>
                                <label htmlFor="city">City..*</label>
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    type="text"
                                    placeholder="City"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="street">Street..*</label>
                                <input
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    type="text"
                                    placeholder="Street"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                    <button 
                        type='submit'
                        disabled={orderLoading || !isFormValid}
                        className='bg-black text-white p-3 w-full rounded transition duration-300 hover:bg-gray-800'
                        data-tooltip-id="button-tooltip"
                        data-tooltip-content={orderLoading || !isFormValid ? 'Please fill in all required fields' : ''}
                    >
                        {orderLoading ? 'PLACING ORDER...' : 'CONFIRM ORDER'}
                    </button>
                    <Tooltip id="button-tooltip" place="top" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Checkout;
