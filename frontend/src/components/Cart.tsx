import { FormEvent, useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Header from './Header/Header';
import ReactSelect, { MultiValue, OptionsOrGroups, SingleValue } from 'react-select';
import AddressService, { Address } from '../service/address.service';
import BorderButton from './Buttons/BorderButton';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [adresses, setAdresses] = useState<OptionsOrGroups<string, never> | undefined>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  
  const getTotal = () => {
    return cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  
  useEffect(() => {
    AddressService.getAddresses().then(response => {
      console.log('response:', response);
      if('error' in response) {
        return;
      }
      
      setAdresses(response.map((address: Address) => ({value: address.id, label: address.name})) as []);
    });
  }, []);
  
  const handleAddressSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    
    if(!user?.id){
      toast.error('Vous devez être connecté pour ajouter une adresse');
      return;
    }
    
    const formData = new FormData(e.target as HTMLFormElement);
    const address = Object.fromEntries(formData.entries());
    address.client = user.id;
    
    toast.promise(AddressService.createAddress(address as Address), {
      pending: 'Création de l\'adresse...',
      success: 'Adresse créée avec succès',
      error: 'Erreur lors de la création de l\'adresse',
    });
  }
  
  const handleAddressChange = (newValue: MultiValue<string> | SingleValue<string>) => {
    setSelectedAddress(newValue as string);
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
        <div className='flex flex-col gap-8 w-2/5 self-start h-min'>
          <div className='flex flex-col gap-8 bg-gray-100 rounded-md p-4'>
            <ReactSelect className='z-0' onChange={handleAddressChange} value={selectedAddress} options={adresses} noOptionsMessage={() => 'Vous devez créer une adresse !'} placeholder='Choisissez une adresse'/>
            <h1 className='text-2xl font-semibold'>Total: {getTotal()}€</h1>
            <button className='bg-green-600 hover:bg-green-700 transition-all text-white p-2 cursor-pointer rounded-md flex gap-2 justify-center items-center' disabled={adresses?.length === 0}>
              <span>Valider le panier</span>
              <CheckIcon size={20} />
            </button>
          </div>
          <details className='flex flex-col gap-8 bg-gray-100 rounded-md p-4'>
            <summary className='text-2xl font-semibold cursor-pointer select-none mb-8'>Créer une nouvelle adresse de livraison</summary>
            <form onSubmit={handleAddressSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="name">Numéro et rue</label>
                <input type="text" id='name' name='name' className='p-2 col-span-2 rounded-md' placeholder='15 rue exemple'/>
              </div>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="city">Ville</label>
                <input type="text" id='city' name='city' className='p-2 col-span-2 rounded-md' placeholder='Lille'/>
              </div>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="code">Code Postal</label>
                <input type="text" id='code' name='code' className='p-2 col-span-2 rounded-md' placeholder='59000'/>
              </div>
              <div className='grid grid-cols-3 gap-2 items-center'>
                <label htmlFor="country">Pays</label>
                <input type="text" id='country' name='country' className='p-2 col-span-2 rounded-md' placeholder='France'/>
              </div>
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white p-2 cursor-pointer rounded-md flex gap-2 justify-center items-center'>
                <span>Créer</span>
                <PlusIcon size={20} />
              </button>
            </form>
          </details>
        </div>
      </div>
    </div>
  )
};

export default Cart;
