import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Carousel } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/tienda'>Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
          <Meta title={product.name} />
          <Col md={6}>
          <Carousel pause='hover' className='bg-light'>
            <Carousel.Item key={product._id}>
              <Image className="details-carousel-img" src={product.image} alt={product.name} fluid />
            </Carousel.Item>
            <Carousel.Item key={product._id}>
                <Image className="details-carousel-img" src={product.featureImage} alt={product.name} fluid />
            </Carousel.Item>
          </Carousel>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category: </strong>{product.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: </strong>${product.price}
              </ListGroup.Item>
              {product.description && (<ListGroup.Item>
                <strong>Description: </strong><br/>{product.description}
              </ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0} >Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default ProductScreen