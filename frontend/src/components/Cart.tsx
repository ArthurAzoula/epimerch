import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Header from './Header/Header';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import AddressService, { Address } from '../service/address.service';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import CartService from '../service/cart.service';
import { formatAddress } from '../utils/AddressUtils';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { cart, updateCart, cartItems, refreshCartItems } = useContext(CartContext);
  console.log('cart:', cart);
  const [adresses, setAdresses] = useState<MultiValue<{value: string, label: string}>>([]);
  const [selectedAddress, setSelectedAddress] = useState<{value: string, label: string} | null>(null);
  const navigate = useNavigate();
  
  const getTotal = () => {
    return cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  
  useEffect(() => {
    AddressService.getAddresses().then(response => {
      if('error' in response) {
        return;
      }
      
      setAdresses(response.map((address: Address) => ({value: address.id, label: formatAddress(address)})) as []);
    });
    
    if(cart?.address && typeof cart.address === 'object'){
      const address = cart.address as Address;
      setSelectedAddress({value: address.id, label: formatAddress(address)});
    }
  }, []);
  
  const handleSubmit = () => {
    if(!user?.id){
      toast.error('Vous devez être connecté pour valider votre panier');
      return;
    }
    
    if(!selectedAddress){
      toast.error('Vous devez choisir une adresse de livraison');
      return;
    }
    
    toast.promise(CartService.validateCart().then(response => {
      if('error' in response) {
        throw new Error();
      }
      
      refreshCartItems();
      navigate('/orders');
      
      return response;
    }), {
      pending: 'Validation du panier...',
      success: 'Panier validé avec succès',
      error: 'Erreur lors de la validation du panier',
    });
  }
  
  const handleAddressSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    
    if(!user?.id){
      toast.error('Vous devez être connecté pour ajouter une adresse');
      return;
    }
    
    const formData = new FormData(e.target as HTMLFormElement);
    const address = Object.fromEntries(formData.entries());
    address.client = user.id;
    
    toast.promise(AddressService.createAddress(address as unknown as Address).then(response => {
      (e.target as HTMLFormElement).reset();
      if ('error' in response) {
        throw new Error();
      }
      
      setAdresses((adrs: unknown) => {
        if (!adrs) {
          if('error' in response) {
            setSelectedAddress(null);
            return [];
          }
          
          updateCart(response.id);
          setSelectedAddress({value: response.id, label: formatAddress(response)});
          return [{ value: response.id, label: formatAddress(response)}];
        }
        
        if('error' in response) {
          setSelectedAddress(null);
          return [adrs];
        }
        
        updateCart(response.id);
        setSelectedAddress({value: response.id, label: formatAddress(response)});
        
        if(Array.isArray(adrs) && adrs.length === 0) {
          return [{value: response.id, label: formatAddress(response)}];
        } else if(Array.isArray(adrs) && adrs.length > 0) {
          return [...adrs, {value: response.id, label: formatAddress(response)}];
        } else {
          return [adrs, {value: response.id, label: formatAddress(response)}];
        }
      });
    }
    ), {
      pending: 'Création de l\'adresse...',
      success: 'Adresse créée avec succès',
      error: 'Erreur lors de la création de l\'adresse',
    });
  }
  
  const handleAddressChange = (newValue: SingleValue<{value: string, label: string}>) => {
    if(!newValue){
      updateCart('');
    } else {
      if(typeof newValue === 'object' && newValue !== null && 'value' in newValue){
        updateCart((newValue as {value: string}).value);
      } else if(typeof newValue === 'string'){
        updateCart(newValue);
      }
    }
    
    setSelectedAddress(newValue as {value: string, label: string} | null);
  };
  
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex gap-8 justify-center flex-grow p-8'>
        <div className='flex flex-col gap-4 w-2/5 bg-gray-100 rounded-md p-4 h-min'>
          <h1 className='text-2xl font-semibold'>Votre panier</h1>
          {
            cartItems?.length ? (
              cartItems.map(item => (
                <div key={item.product.id} className='flex gap-4'>
                  <img src={item.product.photo} alt={item.product.name} className='w-24 h-24 object-cover' />
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>{item.product.name}</h2>
                    <p className='text-gray-500'>Quantité: {item.quantity}</p>
                    <p className='text-gray-500'>Prix: {item.product.price}€</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Votre panier est vide</p>
            )
          }
        </div>
        {cartItems && cartItems?.length > 0 && (
          <div className='flex flex-col gap-8 w-2/5 self-start h-min'>
          <div className='flex flex-col gap-8 bg-gray-100 rounded-md p-4'>
            <ReactSelect className='z-0' onChange={handleAddressChange} required={false} isClearable={true} value={selectedAddress} options={adresses} noOptionsMessage={() => 'Vous devez créer une adresse !'} placeholder='Choisissez une adresse'/>
            <h1 className='text-2xl font-semibold'>Total: {getTotal()}€</h1>
            <button onClick={handleSubmit} className='bg-green-600 hover:bg-green-700 transition-all text-white p-2 cursor-pointer rounded-md flex gap-2 justify-center items-center'>
              <span>Valider le panier</span>
              <CheckIcon size={20} />
            </button>
          </div>
          <details className='flex flex-col gap-8 bg-gray-100 rounded-md p-4'>
            <summary className='text-2xl font-semibold cursor-pointer select-none mb-8'>Créer une nouvelle adresse de livraison</summary>
            <form onSubmit={handleAddressSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="name">Numéro et rue</label>
                <input type="text" id='name' name='name' className='p-2 col-span-2 rounded-md' placeholder='15 rue exemple' required/>
              </div>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="code">Code Postal</label>
                <input type="text" id='code' name='code' className='p-2 col-span-2 rounded-md' placeholder='59000' required/>
              </div>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="city">Ville</label>
                <input type="text" id='city' name='city' className='p-2 col-span-2 rounded-md' placeholder='Lille' required/>
              </div>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="country">Pays</label>
                <input type="text" id='country' name='country' className='p-2 col-span-2 rounded-md' placeholder='France' required/>
              </div>
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white p-2 cursor-pointer rounded-md flex gap-2 justify-center items-center'>
                <span>Créer</span>
                <PlusIcon size={20} />
              </button>
            </form>
          </details>
        </div>
      )}
      </div>
    </div>
  )
};

export default Cart;
