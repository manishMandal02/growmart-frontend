import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Rating, AlertTitle } from '@material-ui/lab';
import {
  LocalMallOutlined,
  FavoriteBorder,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Add,
  Remove,
  Edit,
} from '@material-ui/icons';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Snackbar,
  Tooltip,
} from '@material-ui/core';

import classes from './ProdcutPage.module.scss';
import {
  createProductReview,
  getProduct,
} from '../../../Store/Actions/ProductsActions/ProductActions';
import { addItemToCart } from '../../../Store/Actions/CartActions/CartActions';
import RelatedProductsSlider from './RelatedProductsSlider/RelatedProductsSlider';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../Store/Actions/ActionTypes';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//######
const ProdcutPage = ({ match }) => {
  //state
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen2, setSnackbarOpen2] = useState(false);
  const [snackbarOpenReview, setSnackbarOpenReview] = useState(false);

  console.log(rating);

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarClose2 = () => {
    setSnackbarOpen2(false);
  };
  const handleSnackbar3Close = () => {
    setSnackbarOpenReview(false);
  };

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.product.productDetails
  );

  const { userInfo } = useSelector((state) => state.user.login);
  const {
    loading: loadindProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.product.createProductReview);

  let id = match.params.id;

  //scroll to top
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox
  };

  useEffect(() => {
    if (successProductReview) {
      setComment('');
      setRating('');
      setSnackbarOpenReview(true);

      setTimeout(() => {
        dispatch({
          type: PRODUCT_CREATE_REVIEW_RESET,
        });
      }, 2000);
    }
    if (errorProductReview) {
      setSnackbarOpenReview(true);
      setTimeout(() => {
        dispatch({
          type: PRODUCT_CREATE_REVIEW_RESET,
        });
      }, 2000);
    }
    if (!product || id !== product._id) {
      dispatch(getProduct(id));
      scrollToTop();
    }
  }, [
    id,
    dispatch,
    successProductReview,
    errorProductReview,
    product,
    userInfo,
  ]);

  //addItme to cart on click
  const handleAddItemToCart = () => {
    dispatch(addItemToCart(id, qty));
    setSnackbarOpen(true);
  };

  //addItme to cart on click
  const handleAddToWishlish = () => {
    setSnackbarOpen2(true);
  };

  //handel review submit
  const reviewSubmitHanler = (e) => {
    e.preventDefault();
    if (rating) {
      dispatch(createProductReview(id, { comment, rating }));
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };
  return (
    <div className={classes.ProdcutPage}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      ) : (
        <div className={classes.Container}>
          <Helmet>
            <title>{`${product.name} | GrowMart`}</title>
          </Helmet>
          <div className={classes.ImageWrapper}>
            <img src={product.image} alt={`${product.name}`} />
            <span>
              <Tooltip title={product.name} enterDelay={500} placement='top'>
                <img src={product.image} alt={`${product.name} overview`} />
              </Tooltip>
            </span>
          </div>

          <div className={classes.ProdcutInfo}>
            <p>{product.name}</p>
            <p>
              Brand:<Link to={`/brand/${product.brand}`}>{product.brand}</Link>
            </p>
            <Tooltip
              placement='right'
              enterDelay={500}
              title={`${product.numReviews} ${
                product.numReviews <= 1 ? `Review` : 'Reviews'
              }`}
            >
              <div
                onClick={() => {
                  document.getElementById('reviews').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                  });
                }}
                className={classes.Rating}
              >
                <Rating
                  name='read-only'
                  size='medium'
                  value={product.rating}
                  readOnly
                />
                <span>{`${product.numReviews} ${
                  product.numReviews <= 1 ? `Review` : 'Reviews'
                }`}</span>
              </div>
            </Tooltip>
            <div className={classes.Price}>
              <p>$</p>
              <div>{product.price}</div>
            </div>
            <p>{product.description}</p>
            <p>
              Category:
              <span>
                <Link
                  to={`/category/${product.category}`}
                >{`#${product.category}`}</Link>
              </span>
            </p>
            <div className={classes.ButtonWrapper}>
              <div className={classes.Quantity}>
                <span
                  onClick={() => {
                    if (qty !== 0) {
                      setQty(qty - 1);
                    }
                  }}
                >
                  <Remove />
                </span>
                <input type='text' value={qty} />
                <span
                  onClick={() => {
                    setQty(qty + 1);
                  }}
                >
                  <Add />
                </span>
              </div>
              <Tooltip title={'Add to cart'} enterDelay={500} placement='top'>
                <button onClick={handleAddItemToCart}>
                  <LocalMallOutlined /> Add To Cart
                </button>
              </Tooltip>
              <Tooltip title={'Wishlist'} enterDelay={500} placement='top'>
                <button onClick={handleAddToWishlish}>
                  <FavoriteBorder /> Add To Wishlist
                </button>
              </Tooltip>
            </div>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
            >
              <Alert severity='success' variant='filled'>
                <strong>Item Added to Cart</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              open={snackbarOpen2}
              autoHideDuration={1500}
              onClose={handleSnackbarClose2}
            >
              <Alert severity='success' variant='filled'>
                <strong>Item Added to WishList</strong>
              </Alert>
            </Snackbar>
            <div className={classes.SocialIconContainer}>
              <span>
                Share:
                {/* <Share /> */}
              </span>
              <a href='/#'>
                <Twitter />
              </a>
              <a href='/#'>
                <Facebook />
              </a>
              <a href='/#'>
                <Instagram />
              </a>
              <a href='/#'>
                <LinkedIn />
              </a>
            </div>
          </div>
        </div>
      )}
      <div className={classes.Reviews} id='reviews'>
        <Accordion
          defaultExpanded
          style={{
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            margin: '0',
            padding: '0',
          }}
        >
          <AccordionSummary
            className={classes.AccordionSummary}
            style={{
              padding: '0 2em 0 .6em',
              width: '100%',
              backgroundColor: '#f1f3f6',
              borderBottom: '2px solid #d4d4d4',
            }}
            // expandIcon={<ArrowDownward />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <p className={classes.Heading}>
              REVIEWS ({product.reviews.length})
            </p>
          </AccordionSummary>
          <AccordionDetails
            style={{
              // width: '100%',
              padding: '0em',
            }}
          >
            {loading ? (
              <CircularProgress size={30} />
            ) : product.reviews.length === 0 ? (
              <p
                style={{
                  margin: '0',
                  fontSize: '1.2em',
                  padding: '1.4em',
                }}
              >
                There are no reviews yet.
              </p>
            ) : (
              <div className={classes.ReviewsContainer}>
                {product.reviews.map((r) => (
                  <div className={classes.Review}>
                    <p className={classes.Name}>
                      {r.name}
                      <p
                        style={{
                          marginLeft: '.6em',
                          fontWeight: '500',
                          fontSize: '.8em',
                        }}
                      >
                        ({r.createdAt.substring(0, 10)})
                      </p>
                    </p>
                    <p
                      style={{
                        margin: '0',
                        paddingLeft: '.2em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '15%',
                        fontWeight: '600',
                        color: '#35373de5',
                      }}
                    >
                      <Rating
                        name='read-only'
                        size='medium'
                        value={r.rating}
                        readOnly
                      />
                      {r.rating === 1
                        ? `(Poor)`
                        : r.rating === 2
                        ? `(Fair)`
                        : r.rating === 3
                        ? `(Good)`
                        : r.rating === 4
                        ? `(Very Good)`
                        : r.rating === 5
                        ? `(Excelent)`
                        : null}
                    </p>
                    <p
                      style={{
                        padding: '-.2em 0 0 .1em',
                        fontSize: '1.1em',
                      }}
                    >
                      {r.comment ? `-${r.comment}` : null}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
        <>
          <Accordion
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              margin: '0',
            }}
          >
            <AccordionSummary
              className={classes.AccordionSummary}
              style={{
                padding: '0 2em 0 .6em',
                width: '100%',
                backgroundColor: '#f1f3f6',
                borderBottom: '1px solid #d4d4d4',
              }}
              // expandIcon={<ArrowDownward />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <p className={classes.Heading}>
                Write a Review <Edit />
              </p>
            </AccordionSummary>
            <AccordionDetails>
              {!userInfo ? (
                <p
                  style={{
                    padding: '.8em',
                    fontSize: '1.2em',
                    fontWeight: '600',
                    color: '#35373de5',
                  }}
                >
                  Please{' '}
                  <Link
                    className={classes.LoginLink}
                    to={`/login?redirect=product/${id}`}
                  >
                    Login
                  </Link>{' '}
                  to review{' '}
                </p>
              ) : (
                <form>
                  <p>
                    Your Rating:
                    <span>
                      <p
                        style={{
                          margin: '0',
                          paddingLeft: '0em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '60%',
                          fontWeight: '600',
                          color: '#35373de5',
                          textAlign: 'left',
                        }}
                      >
                        <Rating
                          name='read-only'
                          size='medium'
                          value={rating}
                          onChange={(e, value) => setRating(value)}
                        />
                        {rating === 1
                          ? `(Poor)`
                          : rating === 2
                          ? `(Fair)`
                          : rating === 3
                          ? `(Good)`
                          : rating === 4
                          ? `(Very Good)`
                          : rating === 5
                          ? `(Excelent)`
                          : null}
                      </p>
                    </span>
                  </p>
                  <p className={classes.Comment}>
                    Your Review:
                    <textarea
                      maxLength={120}
                      rows='4'
                      cols='40'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </p>
                  <div>
                    <button onClick={reviewSubmitHanler}>
                      {loadindProductReview ? (
                        <CircularProgress color='white' size={18} />
                      ) : (
                        `Submit`
                      )}
                    </button>
                    {showMessage ? (
                      <Alert
                        severity='warning'
                        style={{
                          height: '1.6em',
                          marginTop: '.3em',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <strong>Select Rating </strong>
                      </Alert>
                    ) : null}
                  </div>
                </form>
              )}
            </AccordionDetails>
          </Accordion>
        </>
      </div>
      <div>
        <RelatedProductsSlider
          category={product.category}
          name={product.name}
        />
      </div>
      <Snackbar
        open={snackbarOpenReview}
        autoHideDuration={1500}
        onClose={handleSnackbar3Close}
      >
        {errorProductReview ? (
          <Alert severity='error' variant='filled'>
            <strong>{errorProductReview}</strong>
          </Alert>
        ) : successProductReview ? (
          <Alert severity='success' variant='filled'>
            <strong>`Review Added`</strong>
          </Alert>
        ) : (
          <CircularProgress size={30} />
        )}
      </Snackbar>
    </div>
  );
};

export default ProdcutPage;
