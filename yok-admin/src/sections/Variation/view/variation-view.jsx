/* eslint-disable */
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import Pagination from '@mui/material/Pagination';
import NewVariation from '../NewVariation';

import './variationView.css';

import { Box, IconButton, TextField } from '@mui/material';
import { deleteVariation, getAllVariation } from 'src/api/api';

export default function VariationPage() {
  const [activeButton, setActiveButton] = useState('variation');
  const [variation, setVariation] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadVariations = async () => {
      try {
        const response = await getAllVariation();
        setVariation(response?.data?.variations);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadVariations();
  }, []);

  const handleNewBannerButtonClick = () => {
    setActiveButton('newVariation');
  };

  const dummyData = variation;

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    console.log(`Delete testimonial with ID: ${id}`);
    try {
      const response = await deleteVariation(id);
      console.log('response delete', response);
      setVariation(variation.filter((pro) => pro._id !== id));
    } catch (error) {
      console.log('error on delete testimonial ', error);
    }
  };

  const totalPages = Math.ceil(dummyData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredProducts = dummyData
    ?.filter((product) => {
      const searchTermLower = searchTerm.toLowerCase();
      return Object.values(product).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'RatingHighToLow') {
        return a.price > b.price ? -1 : 1;
      } else if (sortOption === 'RatingLowToHigh') {
        return a.price < b.price ? -1 : 1;
      } else if (sortOption === 'NumOfSaleHighToLow') {
        return b.quantity - a.quantity;
      } else if (sortOption === 'NumOfSaleLowToHigh') {
        return a.quantity - b.quantity;
      } else if (sortOption === 'BasePriceHighToLow') {
        return a.price > b.price ? -1 : 1;
      } else if (sortOption === 'BasePriceLowToHigh') {
        return a.price < b.price ? -1 : 1;
      }
      return 0;
    })
    .slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      {activeButton === 'variation' && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Size</Typography>
            <Button
              onClick={handleNewBannerButtonClick}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Size
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mb={5}
          >
            <Box
              sx={{
                width: '50%',
              }}
            >
              <TextField
                fullWidth
                label="Search (Name, city...)"
                id="fullWidth"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
          </Stack>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts?.map((product, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{product.size}</td>
                      <td>
                        <IconButton onClick={() => handleDelete(product._id)} title="Delete">
                          <DeleteIcon className="red" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No variations found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4">
                <Stack alignItems={'end'}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      )}
      {activeButton === 'newVariation' && <NewVariation setActiveButton={setActiveButton} />}
    </Container>
  );
}
