/* eslint-disable */
import React, { useEffect, useState } from 'react';

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

import { createCustomProductAPI, getAllBrands, getAllCategory } from 'src/api/api';

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

const variationsValue = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', '2XL', '3XL'];

const colorsValue = ['Red', 'Green', 'Orange'];

const ViewCustomProduct = ({ clickedProduct }) => {
  const navigate = useNavigate();
  const [tags, setTags] = React.useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [variations, setVariations] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [tag, setTag] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);

  const getBrandsHandler = async () => {
    try {
      const response = await getAllBrands();
      setBrands(response.brands);
    } catch (error) {
      console.log('Error while getting brands :: ', error);
    }
  };

  const getCategoriesHandler = async () => {
    try {
      const response = await getAllCategory();
      console.log('Categories Response :: ', response.data);
      setCategories(response.data);
    } catch (error) {
      console.log('Error while getting categories :: ', error);
    }
  };

  useEffect(() => {
    getBrandsHandler();
    getCategoriesHandler();
  }, []);

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

  const handleCategoryCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log('Name :: ', name);
    console.log('Checked :: ', checked);

    if (checked) {
      // If checkbox is checked, add category to selectedCategories
      setSelectedCategories([...selectedCategories, name]);
    } else {
      // If checkbox is unchecked, remove category from selectedCategories
      setSelectedCategories(selectedCategories.filter((cat) => cat !== name));
    }
  };

  const handleTagChange = (name, event) => {
    const {
      target: { value },
    } = event;

    let newVariations = [];
    let existingVariations = [];

    if (name === 'tags') {
      setTags(typeof value === 'string' ? value.split(',') : value);
    }
    if (name === 'colors') {
      setColor(typeof value === 'string' ? value.split(',') : value);

      newVariations = value.map((color) => ({
        id: variationsValue.length + 1,
        value: color,
        attribute: {
          id: 1,
          name: 'Color',
          slug: 'color',
        },
      }));
      // Filter out existing variations that are not colors
      existingVariations = productData.variations.filter(
        (variation) => variation.attribute.slug !== 'color'
      );
    }
    if (name === 'variations') {
      setVariations(typeof value === 'string' ? value.split(',') : value);
      let shortForms = {
        'Extra Small': 'XS',
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
  };

  const handleTagsInputChange = (event) => {
    setTag(event.target.value);
  };

  const handleTagsEnter = (event) => {
    if (event.key === 'Enter') {
      addItemToList();
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === 'customizable' ? checked : value,
    }));
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    let updatedMetaData = [...productData.meta];
    if (files) {
      if (name === 'image') {
        setProductData((prevState) => ({
          ...prevState,
          image: files[0],
        }));
      } else if (name === 'gallery') {
        const selectedFiles = Array.from(files).slice(0, 10);
        setProductData((prevState) => ({
          ...prevState,
          gallery: selectedFiles,
        }));
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
    }
  };

  console.log('This is working');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setProductData({
        ...productData,
        gender: [...productData.gender, name],
      });
    } else {
      setProductData({
        ...productData,
        gender: productData.gender.filter((gender) => gender !== name),
      });
    }
  };

  useEffect(() => {
    setSelectedColors(clickedProduct?.colors);
    setVariations(clickedProduct?.sizes);
    if (clickedProduct) {
      const updatedProductData = {
        ...productData,
        name: clickedProduct?.name,
        description: clickedProduct?.description,
        image: clickedProduct?.image?.original,
        gallery: clickedProduct?.gallery.map((image) => image?.original),
        price: clickedProduct?.price,
        sale_price: clickedProduct?.sale_price,
        quantity: clickedProduct?.quantity,
        type: clickedProduct?.type,
        meta: clickedProduct?.meta,
        tags: clickedProduct.tags,
        category: clickedProduct.category,
      };

      setTagsList(clickedProduct.tags);
      setBrand(clickedProduct.brand);
      setSelectedCategories(clickedProduct.category);

      setProductData(updatedProductData);
    }
  }, [clickedProduct]);

  const addItemToList = () => {
    if (tag.trim() !== '') {
      const newTag = {
        id: tagsList.length + 1, // Incrementing ID
        name: tag.trim(),
        slug: tag.trim().toLowerCase().replace(/\s+/g, '-'), // Converting to slug format
      };
      setTagsList([...tagsList, newTag]);
      setTag('');
    }
  };

  console.log('clickedProduct', clickedProduct);
  return (
    <div>
      <Typography variant="h4">View product</Typography>
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
              value={productData?.name}
              onChange={handleChange}
              disabled
            />
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
                disabled
                onChange={handleTagsInputChange}
                onKeyDown={handleTagsEnter}
              />
              <div className="mt-1" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tagsList &&
                  tagsList.map((tag, index) => (
                    <span key={index} className="mx-1">
                      #{tag.name}
                    </span>
                  ))}
              </div>
            </FormControl>
          </div>

          {/* <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="tag-multiple-checkbox"
                multiple
                value={tags}
                onChange={(event) => handleTagChange('tags', event)}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {tagsValue.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={tags.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div> */}
          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Brand</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="color-multiple-checkbox"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                input={<OutlinedInput label="Brands" />}
                renderValue={() => brand}
                disabled
                MenuProps={MenuProps}
              >
                {brands?.map((brandObj) => (
                  <MenuItem key={brandObj.name} value={brandObj.name}>
                    <Checkbox checked={brandObj.name === brand} />
                    <ListItemText primary={brandObj.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Customer Reviews"
              label="Customer Reviews"
              name="Customer Reviews"
              value={productData?.description}
              onChange={handleInputChange}
              disabled
            ></textarea>
          </div>

          <div className="mt-3">
            <div className="Neon Neon-theme-dragdropbox">
              <div className="Neon-input-dragDrop">
                {productData.image && (
                  <div>
                    <Typography variant="subtitle1">Selected Image:</Typography>
                    <img
                      src={
                        typeof productData.image === 'string'
                          ? productData.image
                          : URL.createObjectURL(productData.image)
                      }
                      alt="Selected"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="Neon Neon-theme-dragdropbox">
              <div className="Neon-input-dragDrop">
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    <i className="fa fa-file-image-o"></i>
                  </div>
                  <div className="Neon-input-text">
                    <h3>Gallery</h3>{' '}
                  </div>
                </div>
                {productData.gallery.length > 0 && (
                  <div>
                    {productData.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        style={{
                          maxWidth: '100px',
                          maxHeight: '100px',
                          marginRight: '5px',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
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
              disabled
            />
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
              disabled
            />
          </div>

          <div className="mt-4">
            <TextField
              className="create-product-input-box-two-yok"
              id="quantity"
              label="Quantity"
              variant="outlined"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              disabled
            />
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
                disabl
                value={selectedColors}
                onChange={(event) => handleTagChange('colors', event)}
                input={<OutlinedInput label="Colors" />}
                renderValue={(selected) => selected.map((item) => item.name).join(', ')}
                MenuProps={MenuProps}
              >
                {selectedColors.map((color) => (
                  <MenuItem key={color._id} value={color}>
                    <Checkbox checked={true} />
                    <ListItemText primary={color.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Sizes</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={variations}
                onChange={(event) => handleTagChange('variations', event)}
                input={<OutlinedInput label="Sizes" />}
                disabled
                renderValue={(selected) => selected.map((item) => item.size).join(', ')}
              >
                {variations.map((variation) => {
                  console.log(variation);
                  return (
                    <MenuItem key={variation._id} value={variation}>
                      <Checkbox checked={true} />
                      <ListItemText primary={variation.size} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="mt-4">
            <p>Category</p>
            <div className="flex">
              {categories.map((cat, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox />}
                  label={cat.name}
                  name={cat.slug}
                  disabled
                  checked={selectedCategories?.includes(cat.slug)} // Check if the category is selected
                  onChange={handleCategoryCheckboxChange}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="Type"
                name="type"
                value={productData.type}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Normal" control={<Radio disabled />} label="Normal" />
                <FormControlLabel value="Custom" control={<Radio disabled />} label="Custom" />
                <FormControlLabel value="Combo" control={<Radio disabled />} label="Combo" />
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
              value={
                productData?.meta.find((val) => val.title === 'Product Details')?.content || ''
              }
              onChange={handleInputChange}
              disabled
            ></textarea>
          </div>

          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Additional Information"
              label="Additional Information"
              name="Additional Information"
              value={
                productData?.meta.find((val) => val.title === 'Additional Information')?.content ||
                ''
              }
              onChange={handleInputChange}
              disabled
            ></textarea>
          </div>

          <div className="mt-4">
            <textarea
              style={{ height: '80px' }}
              className="create-product-input-box"
              placeholder="Customer Reviews"
              label="Customer Reviews"
              name="Customer Reviews"
              value={
                productData?.meta.find((val) => val.title === 'Customer Reviews')?.content || ''
              }
              onChange={handleInputChange}
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomProduct;
