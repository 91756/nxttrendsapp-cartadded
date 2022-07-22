import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import CartListView from '../CartListView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeCartItems} = value
      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="btn1"
                  onClick={removeCartItems}
                >
                  Remove all
                </button>
                <CartListView />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
