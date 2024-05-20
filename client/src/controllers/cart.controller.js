// cartController.js
export default {
  cart: [],

  addItem(newItem,reft) {
    const check = JSON.parse(localStorage.getItem("cart"));

    if (check) {
      this.cart = check;
    }

    const existingItemIndex = this.cart.findIndex(
      (item) => item.id_product == newItem.id_product
    );
    if (existingItemIndex !== -1) {
      // Kiểm tra số lượng
      const totalQuantity =
        this.cart[existingItemIndex].quantity + newItem.quantity;
      if (totalQuantity <= (newItem.real_quantity - newItem.out_quantity)) {
        // Nếu số lượng thêm vào không vượt quá số lượng thực tế
        this.cart[existingItemIndex].quantity = totalQuantity;
      } else {
        // Nếu số lượng vượt quá số lượng thực tế, hiển thị thông báo
        reft.toast.showToast("Số lượng sản phẩm vượt quá số lượng thực tế!");
      }
    } else {
      this.cart.push({ ...newItem });
      reft.toast.showToast("Thểm sản phẩm thành công");
    }
    this.saveCartToLocal();
  },

  increaseQuantity(index,reft) {
    if (this.cart[index].quantity < (this.cart[index].real_quantity-this.cart[index].out_quantity)) {
      this.cart[index].quantity += 1;
      this.saveCartToLocal();
    } else {
      reft.toast.showToast("Số lượng sản phẩm vượt quá số lượng thực tế!");
    }
  },

  decreaseQuantity(index) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else {
      this.removeItem(index);
    }
    this.saveCartToLocal();
  },

  changeQuantity(index, newQuantity,reft) {
    if (newQuantity > 0 && newQuantity <= this.cart[index].quantity) {
      this.cart[index].quantity = newQuantity;
      this.saveCartToLocal();
    } else {
      reft.toast.showToast("Số lượng sản phẩm vượt quá số lượng thực tế!");
    }
  },

  removeItem(index) {
    this.cart.splice(index, 1);
    this.saveCartToLocal();
  },

  saveCartToLocal() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },

  loadCartFromlocal() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    return this.cart;
  },
};
