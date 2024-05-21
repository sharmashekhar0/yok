/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';

import { createProductAPI } from 'src/api/api';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tagsValue = ['Casual', 'Cotton'];

const variationsValue = ['Small', 'Medium', 'Large', 'Extra Large'];

const colorsValue = ['Red', 'Green', 'Orange'];

const NewProduct = () => {
  const navigate = useNavigate();
  const [tags, setTags] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const [variations, setVariations] = React.useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [tag, setTag] = useState('');

  const [productData, setProductData] = useState({
    name: '',
    slug: '',
    sku: 'N/A',
    description: '',
    price: '',
    sale_price: '',
    quantity: '',
    category: { id: 1, name: 'kids', slug: 'kids' },
    tags: [],
    image: null,
    gallery: [],
    variations: [],
    meta: [],
    gender: [],
    type: 'Normal',
  });

  const [errors, setErrors] = useState({
    name: '',
    slug: '',
    sku: 'N/A',
    description: '',
    price: '',
    sale_price: '',
    quantity: '',
    category: { id: 1, name: 'kids', slug: 'kids' },
    tags: [],
    image: null,
    gallery: [],
    variations: [],
    meta: [],
    gender: [],
    type: 'Normal',
  });

  const handleTagChange = (name, event) => {
    const {
      target: { value },
    } = event;

    const updatedErrors = { ...errors };
    let newVariations = [];
    let existingVariations = [];

    if (name === 'tags') {
      setTags(typeof value === 'string' ? value.split(',') : value);
      updatedErrors[name] = '';
    }
    if (name === 'colors') {
      setColor(typeof value === 'string' ? value.split(',') : value);
      updatedErrors[name] = '';

      newVariations = value.map((color) => ({
        id: variationsValue.length + 1,
        value: color,
        attribute: {
          id: 1,
          name: 'Color',
          slug: 'color',
        },
      }));
      existingVariations = productData.variations.filter(
        (variation) => variation.attribute.slug !== 'color'
      );
    }
    if (name === 'variations') {
      setVariations(typeof value === 'string' ? value.split(',') : value);
      let shortForms = {
        Small: 'S',
        Medium: 'M',
        Large: 'L',
        'Extra Large': 'XL',
      };
      newVariations = value.map((size) => ({
        id: variationsValue.length + 1,
        value: shortForms[size],
        attribute: {
          id: 1,
          name: 'Size',
          slug: 'size',
        },
      }));
      updatedErrors[name] = '';
      // Filter out existing variations that are not sizes
      existingVariations = productData.variations.filter(
        (variation) => variation.attribute.slug !== 'size'
      );
    }

    // Combine existing variations with new variations
    const updatedVariations = [...existingVariations, ...newVariations];

    // Update productData with unique variations
    setProductData((prevData) => ({
      ...prevData,
      variations: updatedVariations,
    }));
    setErrors(updatedErrors);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === 'customizable' ? checked : value,
    }));
    const updatedErrors = { ...errors };
    updatedErrors[name] = '';
    setErrors(updatedErrors);
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const updatedErrors = { ...errors };
    updatedErrors[name] = '';
    setErrors(updatedErrors);
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    let updatedMetaData = [...productData.meta];
    const updatedErrors = { ...errors };
    updatedErrors[name] = '';

    if (files) {
      if (name === 'image') {
        setProductData((prevState) => ({
          ...prevState,
          image: files[0],
        }));
        updatedErrors[name] = '';
      } else if (name === 'gallery') {
        const selectedFiles = Array.from(files).slice(0, 10);
        setProductData((prevState) => ({
          ...prevState,
          gallery: selectedFiles,
        }));
        updatedErrors[name] = '';
      }
    } else if (
      name === 'Product Details' ||
      name === 'Additional Information' ||
      name === 'Customer Reviews'
    ) {
      // Find the index of the corresponding metaData object based on its title
      const index = updatedMetaData.findIndex((meta) => meta.title === name);

      // Update the metaData object if found, or create a new one otherwise
      if (index !== -1) {
        updatedMetaData[index] = {
          ...updatedMetaData[index],
          content: value,
        };
      } else {
        updatedMetaData.push({
          id: productData.meta.length + 1, // Increment the ID
          title: name,
          content: value,
        });
      }

      // Update the meta state
      setProductData((prevState) => ({
        ...prevState,
        meta: updatedMetaData,
      }));
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      updatedErrors[name] = '';
    }
    setErrors(updatedErrors);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedErrors = { ...errors };
    if (checked) {
      setProductData({
        ...productData,
        gender: [...productData.gender, name],
      });
      updatedErrors[name] = '';
    } else {
      setProductData({
        ...productData,
        gender: productData.gender.filter((gender) => gender !== name),
      });
      updatedErrors[name] = '';
    }
    setErrors(updatedErrors);
  };

  const handleCreateProduct = async () => {
    try {
      const updatedErrors = {};

      if (!productData.name) {
        updatedErrors.name = 'Name is required';
      }
      // if (!productData.slug) {
      //   updatedErrors.slug = 'Slug is required';
      // }
      if (!productData.image) {
        updatedErrors.image = 'Image is required';
      }
      // if (!productData.sku) {
      //   updatedErrors.sku = 'Sku is required';
      // }
      if (!productData.description) {
        updatedErrors.description = 'Description is required';
      }
      if (!productData.price) {
        updatedErrors.price = 'Price is required';
      }
      if (!productData.sale_price) {
        updatedErrors.sale_price = 'Sale price is required';
      }
      if (!productData.quantity) {
        updatedErrors.quantity = 'Quantity is required';
      }
      // if (!productData.gender) {
      //   updatedErrors.gender = 'Gender is required';
      // }
      if (!productData.variations) {
        updatedErrors.variations = 'Variations is required';
      }
      // if (!productData.meta) {
      //   updatedErrors.meta = 'Meta is required';
      // }
      // if (!productData.category) {
      //   updatedErrors.category = 'Category is required';
      // }
      // if (!productData.tags) {
      //   updatedErrors.tags = 'Tag is required';
      // }
      // if (!productData.type) {
      //   updatedErrors.types = 'Types is required';
      // }

      if (Object.keys(updatedErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...updatedErrors,
        }));
        return;
      }

      const formData = new FormData();
      formData.append('image', productData.image);
      formData.append('name', productData.name);
      formData.append('slug', productData.slug);
      formData.append('sku', productData.sku);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('sale_price', productData.sale_price);
      formData.append('quantity', productData.quantity);
      formData.append('category', JSON.stringify(productData.category));
      formData.append('tags', JSON.stringify(tagsList));
      formData.append('gender', JSON.stringify(productData.gender));
      formData.append('variations', JSON.stringify(productData.variations));
      formData.append('meta', JSON.stringify(productData.meta));
      formData.append('type', productData.type);

      productData.gallery.forEach((image, index) => {
        formData.append(`gallery`, image);
      });

      const response = await createProductAPI(formData);
      console.log('Product created successfully:', response);
      // if (response) {
      //   navigate('/products');
      // }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product has been created',
        showConfirmButton: false,
        timer: 1500,
      });
      setProductData({
        name: '',
        slug: '',
        sku: 'N/A',
        description: '',
        price: '',
        sale_price: '',
        quantity: '',
        category: { id: 1, name: 'kids', slug: 'kids' },
        tags: [],
        image: null,
        gallery: [],
        variations: [],
        meta: [],
        gender: [],
        type: 'Normal',
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleTagsInputChange = (event) => {
    setTag(event.target.value);
  };

  const handleTagsEnter = (event) => {
    if (event.key === 'Enter') {
      addItemToList();
    }
  };

  const addItemToList = () => {
    if (tag.trim() !== '') {
      const newTag = {
        id: tagsList.length + 1, // Incrementing ID
        tag: tag.trim(), // Removing trailing spaces
        slug: tag.trim().toLowerCase().replace(/\s+/g, '-'), // Converting to slug format
      };
      setTagsList([...tagsList, newTag]);
      setTag('');
    }
  };

  return (
    <div>
      <Typography variant="h4">Create a new product</Typography>
      <div className="create-product-details-yok">
        <div className="create-product-details-and-title-para-yok">
          <Typography variant="h6">Details</Typography>
          <p>Title, short description, image...</p>
        </div>
        <div className="create-product-details-product-name-image-yok">
          <div>
            <TextField
              className="create-product-input-box-two-yok"
              id="outlined-basic"
              label="Product name"
              variant="outlined"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
            {errors.name && <div style={{ color: 'red', fontSize: '15px' }}>{errors.name}</div>}
          </div>

          <div className="mt-4">
            <FormControl fullWidth>
              <TextField
                className="create-product-input-box-two-yok"
                id="outlined-basic"
                label="Tags"
                variant="outlined"
                name="name"
                value={tag}
                onChange={handleTagsInputChange}
                onKeyDown={handleTagsEnter}
              />
              <div className="mt-1" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tagsList &&
                  tagsList.map((tag, index) => (
                    <span key={index} className="mx-1">
                      #{tag.tag}
                    </span>
                  ))}
              </div>
            </FormControl>
            {errors.tags && <div style={{ color: 'red', fontSize: '15px' }}>{errors.tags}</div>}
          </div>
          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Description"
              label="Description"
              name="description"
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <div style={{ color: 'red', fontSize: '15px' }}>{errors.description}</div>
            )}
          </div>

          <div className="mt-3">
            <div className="Neon Neon-theme-dragdropbox">
              <input
                style={{
                  opacity: 0,
                  width: '100%',
                  height: '99px',
                  position: 'absolute',
                  right: '0px',
                  left: '0px',
                }}
                accept="image/*"
                id="image-upload"
                multiple="false"
                name="image"
                type="file"
                onChange={handleInputChange}
              />
              <div className="Neon-input-dragDrop">
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    <i className="fa fa-file-image-o"></i>
                  </div>
                  <div className="Neon-input-text">
                    <h3>Upload an image</h3>{' '}
                  </div>
                  <a className="Neon-input-choose-btn blue">Click to upload image</a>
                </div>
                {productData.image && (
                  <div>
                    <Typography variant="subtitle1">Selected Image:</Typography>
                    <img
                      src={URL.createObjectURL(productData.image)}
                      alt="Selected"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                )}
                {errors.image && (
                  <div style={{ color: 'red', fontSize: '15px' }}>{errors.image}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="Neon Neon-theme-dragdropbox">
              <input
                style={{
                  opacity: 0,
                  width: '100%',
                  height: '99px',
                  position: 'absolute',
                  right: '0px',
                  left: '0px',
                }}
                accept="image/*"
                id="gallery-upload"
                multiple="multiple"
                name="gallery"
                type="file"
                onChange={handleInputChange}
              />
              <div className="Neon-input-dragDrop">
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    <i className="fa fa-file-image-o"></i>
                  </div>
                  <div className="Neon-input-text">
                    <h3>Gallery</h3>{' '}
                  </div>
                  <a className="Neon-input-choose-btn blue">Click to upload image</a>
                </div>
              </div>
            </div>
            {productData.gallery.length > 0 && (
              <div>
                <Typography variant="subtitle1">Selected Gallery Images:</Typography>
                {productData.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index + 1}`}
                    style={{
                      maxWidth: '100px',
                      maxHeight: '100px',
                      marginRight: '5px',
                    }}
                  />
                ))}
                {errors.gallery && (
                  <div style={{ color: 'red', fontSize: '15px' }}>{errors.gallery}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="create-product-details-yok">
        <div className="create-product-details-and-title-para-yok">
          <Typography variant="h6">Pricing</Typography>
          <p>Price related inputs</p>
        </div>
        <div className="create-product-details-product-name-image-yok">
          <div>
            <TextField
              className="create-product-input-box-two-yok"
              id="outlined-basic"
              label="Regular Price"
              variant="outlined"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
            {errors.price && <div style={{ color: 'red', fontSize: '15px' }}>{errors.price}</div>}
          </div>

          <div className="mt-4">
            <TextField
              className="create-product-input-box-two-yok"
              id="sale_price"
              label="Sale Price"
              variant="outlined"
              name="sale_price"
              value={productData.sale_price}
              onChange={handleChange}
            />
            {errors.sale_price && (
              <div style={{ color: 'red', fontSize: '15px' }}>{errors.sale_price}</div>
            )}
          </div>

          <div className="mt-4">
            <TextField
              className="create-product-input-box-two-yok"
              id="quantity"
              label="Quantity"
              variant="outlined"
              name="quantity"
              onChange={handleChange}
            />
            {errors.quantity && (
              <div style={{ color: 'red', fontSize: '15px' }}>{errors.quantity}</div>
            )}
          </div>
        </div>
      </div>

      <div className="create-product-details-yok">
        <div className="create-product-details-and-title-para-yok">
          <Typography variant="h6">Properties</Typography>
          <p>Additional functions and attributes...</p>
        </div>
        <div className="create-product-details-product-name-image-yok">
          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Colors</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="color-multiple-checkbox"
                multiple
                value={color}
                onChange={(event) => handleTagChange('colors', event)}
                input={<OutlinedInput label="Colors" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {colorsValue.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={color.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors?.color && <div style={{ color: 'red', fontSize: '15px' }}>{errors?.color}</div>}
          </div>

          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Variations</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={variations}
                onChange={(event) => handleTagChange('variations', event)}
                input={<OutlinedInput label="Variations" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {variationsValue.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={variations.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mt-4">
            <p>Category</p>
            <div className="flex">
              <FormControlLabel
                control={<Checkbox />}
                label="Male"
                name="Male"
                checked={productData.gender.includes('Male')}
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Women"
                name="Women"
                checked={productData.gender.includes('Women')}
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Kids"
                name="Kids"
                checked={productData.gender.includes('Kids')}
                onChange={handleCheckboxChange}
              />
            </div>
            {errors.gender && <div style={{ color: 'red', fontSize: '15px' }}>{errors.gender}</div>}
          </div>
          {/* <div className="mt-4">
            <FormControlLabel
              fullWidth
              control={
                <Checkbox
                  checked={productData.customizable}
                  name="customizable"
                  onChange={(event) => handleChange(event)}
                />
              }
              label="Customizable"
            />
          </div> */}

          <div className="mt-4">
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="Type"
                name="type"
                value={productData.type}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
                <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
                <FormControlLabel value="Combo" control={<Radio />} label="Combo" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Product Details"
              label="Product Details"
              name="Product Details"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Additional Information"
              label="Additional Information"
              name="Additional Information"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Customer Reviews"
              label="Customer Reviews"
              name="Customer Reviews"
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="create-product-button-yok">
        <Button onClick={handleCreateProduct} variant="contained" color="inherit">
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default NewProduct;
