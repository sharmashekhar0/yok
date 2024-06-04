import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const moveToShiprocket = async (orderData) => {
  try {
    console.log(orderData);
    const response = await axios.post(`${BASE_URL}/shiprocket/create`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Unable to Move to Shiprocket');
  }
};

export const updatePaymentGatewayKeys = async (active) => {
  try {
    console.log(active);
    const response = await axios.post(`${BASE_URL}/payment-gateway/update-active`, active, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error updating keys:', error);
    throw new Error('Unable to Update Payment Gateway');
  }
};

export const createProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/create`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createColor = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/color/create`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getAllColor = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/color/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteColor = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/color/delete`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createVariation = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/variation/create`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getAllVariation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/variation/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteVariation = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/variation/delete`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createCustomProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/custom-product/create`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createTestimonialAPI = async (testimonialData) => {
  try {
    const response = await axios.post(`${BASE_URL}/testimonial/create`, testimonialData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createBannerAPI = async (bannerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/banner/create`, bannerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createCategoryAPI = async (categoryData) => {
  try {
    const formDataObject = {};
    categoryData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    const response = await axios.post(`${BASE_URL}/category/create`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response :: ', response);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const getAllBanners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/banner/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getAllTestimonials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/testimonial/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brand/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/banner/delete`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/order/delete`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteTestimonial = async (testimonialId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/testimonial/delete`,
      { testimonialId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};

export const deleteBrand = async (brandId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/brand/delete`,
      { brandId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};

export const createBrand = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/brand/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/category/delete`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getFindUsHere = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/find-us-here/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const UpdateFindUsHere = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/find-us-here/put`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getFAQ = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/faq/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const addFAQ = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/faq/post`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteFAQ = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/faq/delete?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const fetchPrivacyPolicy = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/policy/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const fetchTermsCondition = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/terms/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const fetchRefundPolicy = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/refund-policy/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const fetchShippingPolicy = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shipping-policy/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const fetchAboutUs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/about-us/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response About Us :: ', response.data.aboutUs);
    return response.data.aboutUs;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const creteSubmenu = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/sub-category/create`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating submeny:', error);
    throw error;
  }
};

export const updateSubmenu = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/sub-category/update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating submeny:', error);
    throw error;
  }
};

export const getSubmenus = async (id = null) => {
  try {
    let url = `${BASE_URL}/sub-category/get`;

    if (id) {
      url += `?id=${id}`;
    }

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sub-category/delete`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const signIn = async (data) => {
  try {
    console.log(BASE_URL);

    const response = await axios.post(`${BASE_URL}/users/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const url = `${BASE_URL}/product/get`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const getCustomProductRequests = async () => {
  try {
    const url = `${BASE_URL}/custom-product-request/get`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching custom product requests :', error);
    throw error;
  }
};

export const getCustomProducts = async () => {
  try {
    const url = `${BASE_URL}/custom-product/get`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const editProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/edit`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const editCustomProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/custom-product/edit`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/delete`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteCustomProductRequestAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/custom-product-request/delete`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting custom product request :', error);
    throw error;
  }
};

export const deleteCustomProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/custom-product/delete`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/get`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/delete`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getB2B = async () => {
  try {
    const url = `${BASE_URL}/b2b/get`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const createCoupons = async (data) => {
  try {
    const url = `${BASE_URL}/coupons/create`;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const getCoupons = async () => {
  try {
    const url = `${BASE_URL}/coupons/get`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const editCoupons = async (data) => {
  try {
    const url = `${BASE_URL}/coupons/edit`;

    const response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const deleteCoupons = async (data) => {
  try {
    const url = `${BASE_URL}/coupons/delete`;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const getRating = async (data) => {
  try {
    const url = `${BASE_URL}/rating/get`;

    const response = await axios.get(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

// get all orders

export const getAllOrders = async (data) => {
  try {
    const url = `${BASE_URL}/order/get`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const getPaymentGatewayKeys = async () => {
  try {
    const url = `${BASE_URL}/razorpay/get`;
    // const url = `${BASE_URL}/razorpay/getKeys`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching submenus:', error);
    throw error;
  }
};

export const getAllRating = async () => {
  try {
    const url = `${BASE_URL}/rating/get`;
    const response = await axios.get(url);
    console.log('All Rating Response :: ', response);
  } catch (error) {
    console.error('Error fetching ratings :: ', error);
  }
};

export const createUpdateKeys = async (data) => {
  try {
    const url = `${BASE_URL}/razorpay/create`;
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.error('Error in creating keys:', error);
    throw error;
  }
};
