import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../slice/productSlice'
import Modal from '../../components/UI/Modal'
import './style.css'
import { generatePublicUrl } from '../../urlConfig'

const Products = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState()
  const [quantity, setQuantity] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [categoryId, setCategoryId] = useState()
  const [productPictures, setProductPictures] = useState([])
  const [productDetailModal, setProductDetailModal] = useState(false)
  const [productDetails, setProductDetails] = useState()
  const category = useSelector(state => state.category)
  const product = useSelector(state => state.product)
  console.log(product)
  const dispatch = useDispatch()


  const handleClose = () => {
    const form = new FormData()
    form.append('name', name)
    form.append('quantity', quantity)
    form.append('price', price)
    form.append('description', description)
    form.append('category', categoryId)
    for (let pic of productPictures) {
      form.append('productPicture', pic)
    }
    dispatch(addProduct(form))
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }

  const createCategoryList = ((categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options
  })

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ])
  }


  const renderProducts = () => {
    return (
      <Table responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
          {
            product.products.length > 0 ?
              product.products.map((product, index) => 
                <tr key={product._id} onClick={() => showProductDetailsModal(product)}>
                <td>{index+1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
              </tr>
              ) : ""
          }
      </tbody>
    </Table>
    )
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false)
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product)
    setProductDetailModal(true)
    console.log(product)
  }

  const renderProductDetailsModal = () => {
    if(!productDetails) return;
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={'Product Details'}
        size='lg'
      >
        <Row>
          <Col md='6'>
            <label className='key'>Name</label>
             <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Price</label>
             <p className='value'>{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md='6'>
            <label className='key'>Quantity</label>
             <p className='value'>{productDetails.quantity}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Category</label>
             <p className='value'>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <label className='key'>Description</label>
             <p className='value'>{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col >
            <label htmlFor="">Product Picture</label>
            <div style={{display: 'flex'}}>
              {productDetails.productPictures.map((picture, index) => (
                <div key={index} className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
              {renderProducts()}
          </Col>
        </Row>

      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Product'}
      >

        <Input
          label='name'
          value={name}
          placeholder={'Product Name'}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label='quantity'
          value={quantity}
          placeholder={'Quantity'}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label='price'
          value={price}
          placeholder={'Price'}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label='description'
          value={description}
          placeholder={'Description'}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select className='form-control' onChange={e => setCategoryId(e.target.value)} value={categoryId}>
          {
            createCategoryList(category.categories).map(option => (
              <option key={option.value} value={option.value}>{option.name}</option>
            ))
          }
        </select>

        {
          productPictures.length > 0 ?
            productPictures.map((pic, index) =>
              <div key={index}>
                {pic.name}
              </div>

            ) : ""
        }
        <input type='file' name='productPicture' onChange={handleProductPictures} />
      </Modal>
      {renderProductDetailsModal()}
    </Layout>
  )
}

export default Products
