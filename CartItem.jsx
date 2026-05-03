import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Nhập các hàm từ CartSlice

const CartItem = ({ onContinueShopping }) => {
  // Lấy dữ liệu giỏ hàng từ Redux store
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Hàm tính tổng số tiền của toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  };

  // Hàm tính tổng tiền cho từng loại sản phẩm (Giá x Số lượng)
  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  // Hàm tăng số lượng
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Hàm giảm số lượng
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Nếu số lượng là 1 mà bấm giảm thì xóa luôn sản phẩm khỏi giỏ
      dispatch(removeItem(item.name));
    }
  };

  // Hàm xóa sản phẩm
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Hàm xử lý nút Checkout (Thanh toán)
  const handleCheckoutShopping = (e) => {
    alert('Tính năng thanh toán sẽ được cập nhật trong tương lai!');
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2 style={{ color: 'black' }}>Tổng tiền giỏ hàng: ${calculateTotalAmount()}</h2>
      
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
            
            <div className="cart-item-details" style={{ flex: 1 }}>
              <div className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost">Đơn giá: ${item.price}</div>
              
              {/* Nút tăng giảm số lượng */}
              <div className="cart-item-quantity" style={{ margin: '10px 0' }}>
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <div className="cart-item-total" style={{ fontWeight: 'bold' }}>
                Tổng: ${calculateTotalCost(item)}
              </div>
              
              {/* Nút xóa */}
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: 'red', color: 'white', marginTop: '10px' }}>
                Xóa (Delete)
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="continue_shopping_btn" style={{ marginTop: '20px' }}>
        <button className="get-started-btn" onClick={(e) => onContinueShopping(e)} style={{ marginRight: '10px', padding: '10px', backgroundColor: 'green', color: 'white' }}>
          Tiếp tục mua sắm (Continue Shopping)
        </button>
        <button className="get-started-btn1" onClick={(e) => handleCheckoutShopping(e)} style={{ padding: '10px', backgroundColor: 'orange', color: 'white' }}>
          Thanh toán (Checkout)
        </button>
      </div>
    </div>
  );
};

export default CartItem;
