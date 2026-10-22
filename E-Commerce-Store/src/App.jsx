import { useState, useEffect } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Everyday Backpack", category: "Accessories", price: 1499, rating: 4.8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80", description: "A versatile backpack designed for everyday adventures, with a clean look and plenty of room for your essentials." },
  { id: 2, name: "Classic Sneakers", category: "Footwear", price: 2299, rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80", description: "Comfortable everyday sneakers that bring a sporty touch to your casual wardrobe." },
  { id: 3, name: "Minimal Watch", category: "Accessories", price: 1899, rating: 4.6, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80", description: "A timeless, minimalist watch made to complement your everyday style." },
  { id: 4, name: "Wireless Headphones", category: "Electronics", price: 2799, rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80", description: "Enjoy your favourite music with stylish over-ear headphones made for everyday listening." },
  { id: 5, name: "Daily Carry Tote", category: "Accessories", price: 899, rating: 4.5, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&auto=format&fit=crop&q=80", description: "A practical tote bag for carrying your daily essentials in effortless style." },
  { id: 6, name: "Retro Sunglasses", category: "Accessories", price: 1199, rating: 4.7, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80", description: "Classic sunglasses that add a confident finishing touch to your everyday outfits." },
  { id: 7, name: "Modern Sneakers", category: "Footwear", price: 2499, rating: 4.8, image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&auto=format&fit=crop&q=80", description: "A clean, versatile sneaker for days when comfort and style matter equally." },
  { id: 8, name: "Studio Headphones", category: "Electronics", price: 3199, rating: 4.8, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=700&auto=format&fit=crop&q=80", description: "A comfortable pair of headphones for music, study sessions, and relaxed listening." },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function App() {
  const [cart, setCart] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("lumi-cart")) || [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("lumi-cart", JSON.stringify(cart));
}, [cart]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ["All", "Accessories", "Footwear", "Electronics"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    setSelectedProduct(null);
  };

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="store">
      <div className="announcement">
        A little something for your everyday life — explore LUMI.
      </div>

      <header className="navbar">
        <button className="brand" onClick={() => {
          setSelectedProduct(null);
          setCartOpen(false);
        }}>lumi<span>.</span></button>

        <nav className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#story">Our story</a>
        </nav>

        <button className="cart-button" onClick={() => {
          setSelectedProduct(null);
          setCartOpen(!cartOpen);
        }}>
          Bag <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        {!selectedProduct && !cartOpen && (
          <>
            <section className="hero" id="story">
              <div className="hero-copy">
                <p className="eyebrow">THE EVERYDAY COLLECTION</p>
                <h1>Good things.<br />Every single day.</h1>
                <p className="hero-description">
                  Thoughtful finds, timeless essentials, and little upgrades
                  that make everyday life feel better.
                </p>
                <a className="primary-button" href="#shop">Explore the collection ↗</a>
                <p className="hero-note">A considered collection for your everyday.</p>
              </div>
              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=85"
                  alt="Modern lifestyle retail store"
                />
                <span className="image-label">LESS, BUT BETTER.</span>
              </div>
            </section>

            <section className="shop-section" id="shop">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">THE LUMI EDIT</p>
                  <h2>Find your everyday favourite.</h2>
                </div>
                <span className="product-count">{filteredProducts.length} products</span>
              </div>

              <div className="shop-controls">
                <div className="category-list">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={activeCategory === category ? "category active" : "category"}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <input
                  className="search-input"
                  type="search"
                  placeholder="Find something..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search products"
                />
              </div>

              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <button
                      className="product-image"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={`View ${product.name}`}
                    >
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="quick-view">Quick view ↗</span>
                    </button>
                    <div className="product-info">
                      <div>
                        <p className="product-category">{product.category}</p>
                        <button className="product-name" onClick={() => setSelectedProduct(product)}>
                          {product.name}
                        </button>
                      </div>
                      <span className="product-price">{formatPrice(product.price)}</span>
                    </div>
                    <div className="product-bottom">
                      <span className="rating">★ {product.rating}</span>
                      <button className="add-button" onClick={() => addToCart(product)}>
                        + Add to bag
                      </button>
                    </div>
                  </article>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="no-results">No products found. Try another search.</p>
                )}
              </div>
            </section>
          </>
        )}

        {selectedProduct && (
          <section className="detail-page">
            <button className="back-button" onClick={() => setSelectedProduct(null)}>← Back to shop</button>
            <div className="detail-layout">
              <img className="detail-image" src={selectedProduct.image} alt={selectedProduct.name} />
              <div className="detail-copy">
                <p className="eyebrow">{selectedProduct.category}</p>
                <h1>{selectedProduct.name}</h1>
                <p className="rating">★ {selectedProduct.rating} / 5</p>
                <h2>{formatPrice(selectedProduct.price)}</h2>
                <p className="detail-description">{selectedProduct.description}</p>
                <button className="primary-button detail-add" onClick={() => addToCart(selectedProduct)}>
                  Add to bag — {formatPrice(selectedProduct.price)}
                </button>
                <p className="detail-note">Simple essentials. Thoughtfully selected.</p>
              </div>
            </div>
          </section>
        )}

        {cartOpen && (
          <section className="cart-page">
            <button className="back-button" onClick={() => setCartOpen(false)}>← Continue shopping</button>
            <p className="eyebrow">YOUR SELECTION</p>
            <h1>Your shopping bag</h1>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♡</span>
                <h2>Your bag is taking a little break.</h2>
                <p>Find something lovely to bring home.</p>
                <button className="primary-button" onClick={() => setCartOpen(false)}>Explore products</button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <p className="product-category">{item.category}</p>
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                        </div>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </article>
                  ))}
                </div>
                <aside className="order-summary">
                  <h2>Order summary</h2>
                  <div><span>Items ({cartCount})</span><span>{formatPrice(cartTotal)}</span></div>
                  <div><span>Delivery</span><span>Free</span></div>
                  <div className="summary-total"><strong>Total</strong><strong>{formatPrice(cartTotal)}</strong></div>
                  <p>Delivery and payment are demo-only for this project.</p>
                  <button className="primary-button checkout-button" onClick={() => window.alert("Thank you for trying the LUMI demo store!")}>Continue to checkout</button>
                </aside>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#">lumi.</a>
        <p>Thoughtful finds for the everyday.</p>
        <span>© 2026 LUMI. Demo storefront built with React.</span>
      </footer>
    </div>
  );
}

export default App;