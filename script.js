/* =========================================
   ABC Fitness Studio - Task 3.1 (JS)
   Requirements covered:
   - Footer Subscribe alert: “Thank you for subscribing.”
   - Gallery:
       • Add to Cart: “Item added to the cart”
       • Clear Cart:  “Cart cleared” or “No items to clear.”
       • Process Order: “Thank you for your order” or “Cart is empty.”
   - About/Contact form: “Thank you for your message”
   - All handled via JS event listeners (no inline JS required)
========================================= */

(function () {
  // --- Simple localStorage cart helpers (gallery) ---
  const CART_KEY = "cart";

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }
  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
  function addCartItem(item) {
    const cart = getCart();
    cart.push(item);
    setCart(cart);
  }
  function hasItems() {
    return getCart().length > 0;
  }
  function clearCart() {
    setCart([]);
  }

  // --- Subscribe form on every page ---
  // Works if your form has id="newsletter-form" or id="subscribeForm"
  function wireSubscribeForms() {
    const subs = document.querySelectorAll("#newsletter-form, #subscribeForm, form[data-subscribe]");
    subs.forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing.");
        // Optional: reset form
        try { form.reset(); } catch {}
      });
    });
  }

  // --- About page form (feedback/contact) ---
  // Works if your form has id="feedback-form" or id="contactForm"
  function wireContactForm() {
    const form = document.querySelector("#feedback-form, #contactForm, form[data-contact]");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message");
      try { form.reset(); } catch {}
    });
  }

  // --- Gallery page buttons (Add / Clear / Process) ---
  function wireGallery() {
    // Add to cart buttons: add class="add-to-cart" and data attributes on each button
    //  e.g. <button class="add-to-cart" data-sku="p1" data-name="Protein Powder" data-price="39.99">Add to Cart</button>
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-to-cart");
      if (!btn) return;

      const sku = btn.getAttribute("data-sku") || "item";
      const name = btn.getAttribute("data-name") || "Item";
      const price = parseFloat(btn.getAttribute("data-price") || "0") || 0;

      addCartItem({ sku, name, price, qty: 1 });
      alert("Item added to the cart");
    });

    // Clear cart button: id="clear-cart-btn"
    const clearBtn = document.getElementById("clear-cart-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (hasItems()) {
          clearCart();
          alert("Cart cleared");
        } else {
          alert("No items to clear.");
        }
      });
    }

    // Process order button: id="process-order-btn"
    const processBtn = document.getElementById("process-order-btn");
    if (processBtn) {
      processBtn.addEventListener("click", () => {
        if (hasItems()) {
          clearCart();
          alert("Thank you for your order");
        } else {
          alert("Cart is empty.");
        }
      });
    }
  }

  // Wire everything after DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    wireSubscribeForms();
    wireContactForm();
    wireGallery();
  });
})();

