import React, { useState, useEffect } from 'react';
import { User, MapPin, Heart, ShoppingBag, Star, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction, updateProfileAction, addAddressAction, updateAddressAction, deleteAddressAction } from '../redux/profile/action';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const updateProfileState = useSelector((state) => state.updateProfile);
  console.log(profileState,'profileState')
  const addressState = useSelector((state) => state.address);
  
  const [orders, setOrders] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    dispatch(getProfileAction());
    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    if (profileState.data) {
      setPhoneNumber(profileState.data.phone || '');
    }
  }, [profileState.data]);

  useEffect(() => {
    if (updateProfileState.success) {
      toast.success('Profile updated successfully!');
      dispatch(getProfileAction()); // Refresh profile data
    }
    if (updateProfileState.error) {
      toast.error('Failed to update profile');
    }
  }, [updateProfileState.success, updateProfileState.error, dispatch]);

  useEffect(() => {
    if (addressState.success) {
      toast.success(editingAddress ? 'Address updated!' : 'Address added!');
      setShowAddressForm(false);
      setEditingAddress(null);
      setAddressForm({ type: 'home', street: '', city: '', state: '', zipCode: '', isDefault: false });
      dispatch(getProfileAction()); // Refresh profile data
    }
    if (addressState.error) {
      toast.error('Failed to save address');
    }
  }, [addressState.success, addressState.error, editingAddress, dispatch]);

  const updateProfile = () => {
    dispatch(updateProfileAction({ data: { phone: phoneNumber } }));
  };

  const handleAddAddress = () => {
    if (editingAddress) {
      dispatch(updateAddressAction({ addressId: editingAddress._id, data: addressForm }));
    } else {
      dispatch(addAddressAction({ data: addressForm }));
    }
  };

  const handleDeleteAddress = (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    dispatch(deleteAddressAction({ addressId }));
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault
    });
    setShowAddressForm(true);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <User className="w-8 h-8 mr-3" />
            <h1 className="text-4xl font-bold">My Dashboard</h1>
          </div>
          <p className="text-xl opacity-90">Manage your account and track your orders</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <h3 className="text-2xl font-bold">{profileState.data?.totalOrders || 0}</h3>
              <p className="text-gray-600">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="text-2xl font-bold">{profileState.data?.loyaltyPoints || 0}</h3>
              <p className="text-gray-600">Loyalty Points</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <h3 className="text-2xl font-bold">${profileState.data?.totalSpent || 0}</h3>
              <p className="text-gray-600">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="text-2xl font-bold">{profileState.data?.addresses?.length || 0}</h3>
              <p className="text-gray-600">Saved Addresses</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                {orders?.length === 0 ? (
                  <p className="text-gray-500">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders?.map((order) => (
                      <div key={order._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                            <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm">{order.items?.length} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.total}</p>
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <Button 
                    onClick={updateProfile}
                    disabled={updateProfileState.loading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {updateProfileState.loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Saved Addresses</h3>
                  <Button 
                    onClick={() => setShowAddressForm(true)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </div>

                {/* Address Form */}
                {showAddressForm && (
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-4">{editingAddress ? 'Edit Address' : 'Add New Address'}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Type</label>
                          <select 
                            value={addressForm.type}
                            onChange={(e) => setAddressForm({...addressForm, type: e.target.value})}
                            className="w-full p-2 border rounded"
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Street Address</label>
                          <Input 
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                            placeholder="Enter street address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">City</label>
                          <Input 
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">State</label>
                          <Input 
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                            placeholder="Enter state"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">ZIP Code</label>
                          <Input 
                            value={addressForm.zipCode}
                            onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
                            placeholder="Enter ZIP code"
                          />
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox"
                            checked={addressForm.isDefault}
                            onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})}
                            className="mr-2"
                          />
                          <label className="text-sm">Set as default address</label>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          onClick={handleAddAddress}
                          disabled={addressState.loading}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          {addressState.loading ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setShowAddressForm(false);
                            setEditingAddress(null);
                            setAddressForm({ type: 'home', street: '', city: '', state: '', zipCode: '', isDefault: false });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Address List */}
                {profileState.data?.addresses?.length === 0 ? (
                  <p className="text-gray-500">No addresses saved</p>
                ) : (
                  <div className="space-y-4">
                    {profileState.data?.addresses?.map((address) => (
                      <div key={address._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold capitalize">{address.type}</p>
                            <p className="text-sm text-gray-600">
                              {address.street}, {address.city}, {address.state} {address.zipCode}
                            </p>
                            {address.isDefault && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-1 inline-block">Default</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditAddress(address)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;