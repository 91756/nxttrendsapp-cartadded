import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  aaddCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  addCartItem = product => {
    const {cartList} = this.state
    if (cartList.length > 0) {
      const newCart = cartList.map(eachProduct => {
        if (eachProduct.id === product.id) {
          const updatedQuantity = eachProduct.quantity + 1
          return {...eachProduct, quantity: updatedQuantity}
        }
        return eachProduct
      })
      this.setState({cartList: newCart})
    } else {
      return this.aaddCartItem(product)
    }
    return null
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  removeCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          if (eachCartItem.quantity > 1) {
            const updateQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updateQuantity}
          }
          this.removeCartItems(id)
        }
        return eachCartItem
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeCartItems: this.removeCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
