import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalPrice = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const total = totalPrice.reduce((acc, price) => acc + price)
      const itemsCount = cartList.length

      return (
        <div className="cart-summary-cont">
          <div className="cart-summary">
            <h1 className="name">
              Order Total: <span className="span-item">Rs {total}/-</span>
            </h1>
            <p className="items">{itemsCount} Items in cart</p>
            <button type="button" className="btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
