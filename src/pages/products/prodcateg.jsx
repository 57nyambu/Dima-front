import React, { useState } from 'react';
import '../../assets/styles/prodcateg.css';

const ProductCategoryForm = () => {
    const [activeTab, setActiveTab] = useState('product');
    
    // Product Form State
    const [productForm, setProductForm] = useState({
        name: '',
        slug: '',
        description: '',
        category: '',
        price: '',
        compare_price: '',
        stock_qty: '',
        is_active: true,
        image: null // Change to null for file input
    });

    // Category Form State
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        slug: '',
        description: '',
        parent: '',
        is_active: true
    });

    // Categories (would typically come from backend)
    const categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Books' }
    ];

    const handleProductChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setProductForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value),
            // Auto-generate slug if name changes
            slug: type === 'text' && name === 'name' 
                ? value.toLowerCase().replace(/\s+/g, '-')
                : prev.slug
        }));
    };

    const handleCategoryChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategoryForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            // Auto-generate slug if name changes
            slug: type === 'text' && name === 'name' 
                ? value.toLowerCase().replace(/\s+/g, '-')
                : prev.slug
        }));
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        // TODO: Add product submission logic
        console.log('Product submitted:', productForm);
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        // TODO: Add category submission logic
        console.log('Category submitted:', categoryForm);
    };

    return (
        <div className="form-container">
            <div className="tabs">
                <button 
                    className={`tab-button ${activeTab === 'product' ? 'active' : ''}`}
                    onClick={() => setActiveTab('product')}
                >
                    Add Product
                </button>
                <button 
                    className={`tab-button ${activeTab === 'category' ? 'active' : ''}`}
                    onClick={() => setActiveTab('category')}
                >
                    Add Category
                </button>
            </div>

            {activeTab === 'product' && (
                <form onSubmit={handleProductSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={productForm.name}
                            onChange={handleProductChange}
                            placeholder="Enter product name"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Slug</label>
                        <input 
                            type="text"
                            name="slug"
                            value={productForm.slug}
                            onChange={handleProductChange}
                            placeholder="Auto-generated or custom slug"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            name="description"
                            value={productForm.description}
                            onChange={handleProductChange}
                            placeholder="Enter product description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            name="category"
                            value={productForm.category}
                            onChange={handleProductChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input 
                            type="number"
                            name="price"
                            value={productForm.price}
                            onChange={handleProductChange}
                            placeholder="Enter price"
                            step="0.01"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock Quantity</label>
                        <input 
                            type="number"
                            name="stock_qty"
                            value={productForm.stock_qty}
                            onChange={handleProductChange}
                            placeholder="Enter stock quantity"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Product Image</label>
                        <input 
                            type="file"
                            name="image"
                            onChange={handleProductChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <input 
                                type="checkbox"
                                name="is_active"
                                checked={productForm.is_active}
                                onChange={handleProductChange}
                            />
                            Active Product
                        </label>
                    </div>

                    <button type="submit" className="submit-button">
                        Create Product
                    </button>
                </form>
            )}

            {activeTab === 'category' && (
                <form onSubmit={handleCategorySubmit}>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={categoryForm.name}
                            onChange={handleCategoryChange}
                            placeholder="Enter category name"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Slug</label>
                        <input 
                            type="text"
                            name="slug"
                            value={categoryForm.slug}
                            onChange={handleCategoryChange}
                            placeholder="Auto-generated or custom slug"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            name="description"
                            value={categoryForm.description}
                            onChange={handleCategoryChange}
                            placeholder="Enter category description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select 
                            name="parent"
                            value={categoryForm.parent}
                            onChange={handleCategoryChange}
                        >
                            <option value="">No Parent Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            <input 
                                type="checkbox"
                                name="is_active"
                                checked={categoryForm.is_active}
                                onChange={handleCategoryChange}
                            />
                            Active Category
                        </label>
                    </div>

                    <button type="submit" className="submit-button">
                        Create Category
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductCategoryForm;