import React, { useState } from 'react';
import "../../assets/styles/product-detail.css";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('navy');
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImage, setCurrentImage] = useState(0);
  
  // Product data (would typically come from API)
  const product = {
    name: "Premium Comfort Hoodie",
    price: 79.99,
    rating: 4.8,
    reviews: 124,
    description: "Our premium comfort hoodie combines style and functionality. Made with high-quality organic cotton and featuring a modern fit, this hoodie is perfect for everyday wear or light outdoor activities.",
    colors: ['navy', 'black', 'gray', 'orange'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    features: [
      "100% organic cotton",
      "Adjustable drawstring hood",
      "Front kangaroo pocket",
      "Ribbed cuffs and hem",
      "Machine washable"
    ],
    inStock: true
  };

  // Create custom icon components using HTML/CSS instead of lucide-react
  const IconStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const IconShoppingCart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );

  const IconHeart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );

  const IconArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );

  const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  const IconTruck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );

  const IconShield = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );

  const IconRepeat = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  );

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Generate color swatches
  const colorToHex = {
    navy: '#0b284c',
    black: '#000000',
    gray: '#808080',
    orange: '#eea84d'
  };

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> / <span>Clothing</span> / <span>Hoodies</span> / <span className="current">{product.name}</span>
      </div>

      <div className="product-main">
        {/* Product Images */}
        <div className="product-gallery">
          <div className="main-image">
            <button className="gallery-btn prev-btn" onClick={prevImage}>
              <IconArrowLeft />
            </button>
            <img src={product.images[currentImage]} alt={`${product.name} view ${currentImage + 1}`} />
            <button className="gallery-btn next-btn" onClick={nextImage}>
              <IconArrowRight />
            </button>
          </div>
          <div className="thumbnails">
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                onClick={() => setCurrentImage(index)}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-meta">
            <div className="rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                    <IconStar />
                  </span>
                ))}
              </div>
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="price">${product.price}</div>
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          {/* Color selection */}
          <div className="product-selection">
            <div className="selection-group">
              <label>Color: <span className="selected-option">{selectedColor}</span></label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: colorToHex[color] }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="selection-group">
              <label>Size: <span className="selected-option">{selectedSize}</span></label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="selection-group">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={decreaseQuantity}>−</button>
                <input type="number" value={quantity} readOnly />
                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <button className="add-to-cart-btn">
              <IconShoppingCart />
              Add to Cart
            </button>
            <button className="wishlist-btn">
              <IconHeart />
            </button>
          </div>

          {/* Product status */}
          <div className="product-status">
            <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {/* Features */}
          <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Shopping benefits */}
          <div className="shopping-benefits">
            <div className="benefit">
              <IconTruck />
              <span>Free shipping on orders over $75</span>
            </div>
            <div className="benefit">
              <IconShield />
              <span>2-year warranty</span>
            </div>
            <div className="benefit">
              <IconRepeat />
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        {/* Tab implementation would go here (simplified for brevity) */}
        <div className="tab-content">
          <h3>Product Details</h3>
          <p>
            Our Premium Comfort Hoodie is designed with both style and comfort in mind. The perfect blend of organic 
            cotton provides exceptional softness against your skin while maintaining durability for long-lasting wear. 
            The modern fit makes it versatile for any casual occasion, from relaxing at home to meeting friends for 
            coffee.
          </p>
          <p>
            The adjustable drawstring hood provides extra warmth when needed, while the front kangaroo pocket offers 
            convenient storage for your essentials. The ribbed cuffs and hem ensure a snug fit that keeps the cold out.
          </p>
          <p>
            Available in a range of colors and sizes, this hoodie is a must-have addition to your casual wardrobe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;