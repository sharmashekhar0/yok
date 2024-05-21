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

import { createCategoryAPI } from 'src/api/api';
import Swal from 'sweetalert2';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import './CategoriesView.css';

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

const variationsValue = ['Small', 'Medium', 'Extra Large'];

const colorsValue = ['Red', 'Green', 'Orange'];

const NewCategory = ({ categoryDataToEdit }) => {
  console.log(categoryDataToEdit);
  const [tags, setTags] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const [isEdit, setisEdit] = React.useState(false);
  const [variations, setVariations] = React.useState([]);

  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    productCount: 0,
    icon: '',
    tags: [],
    image: null,
  });

  const [error, setError] = useState({
    name: '',
    slug: '',
    productCount: 0,
    icon: '',
    tags: [],
    image: null,
  });

  useEffect(() => {
    if (categoryDataToEdit) {
      setisEdit(true);
      setCategoryData({
        name: categoryDataToEdit.name,
        slug: categoryDataToEdit.slug,
        productCount: 0,
        icon: categoryDataToEdit.icon,
        tags: categoryDataToEdit.tags,
        image: categoryDataToEdit.image,
      });
    }
  }, [categoryDataToEdit]);

  console.log('tags', tags);
  console.log('color', color);
  console.log('variations', variations);

  const handleTagChange = (name, event) => {
    const {
      target: { value },
    } = event;

    if (name === 'tags') {
      setTags(typeof value === 'string' ? value.split(',') : value);
      setCategoryData((prevState) => ({
        ...prevState,
        tags: typeof value === 'string' ? value.split(',') : value,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: name === 'customizable' ? checked : value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      if (name === 'image') {
        setCategoryData((prevState) => ({
          ...prevState,
          image: files[0],
        }));
      } else if (name === 'icon') {
        setCategoryData((prevState) => ({
          ...prevState,
          icon: files[0],
        }));
      }
    } else {
      if (name === 'name') {
        // Convert name to slug
        const slug = value.toLowerCase().replace(/\s+/g, '-');
        setCategoryData((prevState) => ({
          ...prevState,
          [name]: value,
          slug: slug,
        }));
      } else {
        setCategoryData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleCreateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('image', categoryData.image);
      formData.append('icon', categoryData.icon);
      formData.append('name', categoryData.name);
      formData.append('slug', categoryData.slug);
      formData.append('productCount', categoryData.productCount);
      formData.append('tags', JSON.stringify(categoryData.tags));

      //Print form data
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await createCategoryAPI(formData);
      console.log('Executed till here');
      if (response.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'category has been created',
          showConfirmButton: false,
          timer: 1500,
        });
        setCategoryData({
          name: '',
          slug: '',
          productCount: 0,
          icon: '',
          tags: [],
          image: null,
        });
      }
      console.log('Category created successfully:', response);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  console.log('categoryData', categoryData);
  return (
    <div>
      <Typography variant="h4">Create a new category</Typography>
      <div className="create-category-details-yok">
        <div className="create-category-details-and-title-para-yok">
          <Typography variant="h6">Details</Typography>
          <p>Title, short description, image...</p>
        </div>
        <div className="create-category-details-category-name-image-yok">
          <div>
            <TextField
              className="create-category-input-box-two-yok"
              id="outlined-basic"
              label="Category name"
              variant="outlined"
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="tag-multiple-checkbox"
                multiple
                value={tags}
                name="tags"
                onChange={(event) => handleTagChange('tags', event)}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
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
                {isEdit && categoryData.image && (
                  <div>
                    <Typography variant="subtitle1">Selected Image:</Typography>
                    <img
                      src={categoryData.image.original}
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
              <input
                style={{
                  opacity: 0,
                  width: '100%',
                  height: '99px',
                  position: 'absolute',
                  right: '0px',
                  left: '0px',
                }}
                accept="image/svg+xml"
                id="icon-upload"
                name="icon"
                type="file"
                onChange={handleInputChange}
              />
              <div className="Neon-input-dragDrop">
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    <i className="fa fa-file-image-o"></i>
                  </div>
                  <div className="Neon-input-text">
                    <h3>Icon</h3>{' '}
                  </div>
                  <a className="Neon-input-choose-btn blue">Click to upload icon</a>
                </div>
                {isEdit && categoryData.icon && (
                  <div>
                    <Typography variant="subtitle1">Selected Icon:</Typography>
                    <img
                      src={categoryData.icon}
                      alt="Selected Icon"
                      style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        marginRight: '5px',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="create-category-button-yok">
        <Button onClick={handleCreateCategory} variant="contained" color="inherit">
          Create Category
        </Button>
      </div>
    </div>
  );
};

export default NewCategory;
