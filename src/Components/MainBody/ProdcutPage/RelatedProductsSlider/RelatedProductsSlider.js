import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { useWindowSize } from '../../../../Hooks/useWindowSize/useWindowSize';
import classes from './RelatedProductsSlider.module.scss';
import ProductCard from '../../ProducsList/ProductCard/ProductCard';
import { getRelatedProducts } from '../../../../Store/Actions/ProductsActions/ProductActions';
import { CircularProgress } from '@material-ui/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const RelatedProductsSlider = ({ category, name }) => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.product.relatedProducts.products
  );

  const [width] = useWindowSize();

  useEffect(() => {
    dispatch(getRelatedProducts(category));
  }, [dispatch, category]);
  return (
    <div className={classes.Container}>
      <p className={classes.Heading}>RELATED PRODUCTS</p>
      <p className={classes.SubHeading}>
        More products like -{' '}
        {name && name.length > 20 ? `${name.substring(0, 20)}...` : name}
        {/* <Link to={`/category/${category}`}>#{category}</Link> */}
      </p>
      <div className={classes.SliderContainer}>
        {loading ? (
          <CircularProgress size={30} />
        ) : products ? (
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={width > 770 ? 5 : 1}
            height={30}
            loop
            // navigation
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            // pagination={{ clickable: true, dynamicBullets: true }}
          >
            {products.map((prod) => (
              <SwiperSlide key={uuidv4()} className={classes.Slides}>
                <ProductCard
                  id={prod._id}
                  img={prod.image}
                  title={prod.name}
                  price={prod.price}
                  description={prod.description}
                  category={prod.category}
                  rating={prod.rating}
                  brand={prod.brand}
                  numReviews={prod.numReviews}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
};

export default RelatedProductsSlider;
