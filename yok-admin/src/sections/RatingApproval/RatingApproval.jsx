/* eslint-disable */
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Iconify from "src/components/iconify";
import { Box, IconButton, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./RatingApprovalView.css";

export default function RatingApprovalView() {

    const dummyRatings = [
        { id: 1, product: 'Product A', rating: 4.5, customer: 'John Doe', comment: 'Great product!', approved: true },
        { id: 2, product: 'Product B', rating: 3.8, customer: 'Jane Doe', comment: 'Could be better.', approved: true },
        { id: 3, product: 'Product C', rating: 5.0, customer: 'Alice Smith', comment: 'Excellent!', approved: false },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleView = (reviewId) => {
        console.log(`View review with ID: ${reviewId}`);
    };

    const handleEdit = (reviewId) => {
        console.log(`Edit review with ID: ${reviewId}`);
    };

    const handleDelete = (reviewId) => {
        console.log(`Delete review with ID: ${reviewId}`);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortOption(event.target.value);
    };

    const filteredReviews = dummyRatings
        .filter((review) => {
            const searchTermLower = searchTerm.toLowerCase();
            return Object.values(review).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
            );
        })
        .sort((a, b) => {
            if (sortOption === 'RatingHighToLow') {
                return a.rating > b.rating ? -1 : 1;
            } else if (sortOption === 'RatingLowToHigh') {
                return a.rating < b.rating ? -1 : 1;
            } else if (sortOption === 'Published') {
                return a.published ? -1 : 1;
            }
            return 0;
        });

    return (
        <Container>
            <div>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4">Rating Approval</Typography>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    mb={5}
                >
                    {/* Search TextField */}
                    <Box
                        sx={{
                            width: '50%',
                            '& .MuiFormControl-root': {
                                width: '100%',
                            },
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Search"
                            id="fullWidth"
                            value={searchTerm}
                            onChange={handleSearch}
                            variant="outlined"
                            margin="dense"
                        />
                    </Box>

                    {/* Sort By Dropdown */}
                    <FormControl variant="outlined" sx={{ width: '50%', minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={handleSort}
                            label="Sort By"
                        >
                            {/* Dummy Options */}
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="RatingHighToLow">Rating (High &gt; Low)</MenuItem>
                            <MenuItem value="RatingLowToHigh">Rating (Low &gt; High)</MenuItem>
                            <MenuItem value="Published">Published</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <div className="table-container">
                    <table className="review-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Rating</th>
                                <th>Customer</th>
                                <th>Comment</th>
                                <th>Approved</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews && filteredReviews.length > 0 ? (
                                filteredReviews.map((review) => (
                                    <tr key={review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.product}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.customer}</td>
                                        <td>{review.comment}</td>
                                        <td>{review.approved ? 'Yes' : 'No'}</td>
                                        <td>
                                            <IconButton onClick={() => handleView(review.id)} title="View">
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(review.id)} title="Edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(review.id)} title="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No reviews found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
}
