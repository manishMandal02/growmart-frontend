import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import classes from './TopProductsSlider.module.scss';
import ProductCard from '../ProducsList/ProductCard/ProductCard';
import { getTopProducts } from '../../../Store/Actions/ProductsActions/ProductActions';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const TopProductsSlider = () => {
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.product.topProducts.products
  );

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return (
    <div className={classes.Container}>
      <p className={classes.Heading}>TOP PRODUCTS</p>
      <p className={classes.SubHeading}>Some of our top rated products</p>
      <div className={classes.SliderContainer}>
        {products && (
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={5}
            height={30}
            loop
            // navigation
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            // pagination={{ clickable: true, dynamicBullets: true }}
          >
            {products.map((prod) => (
              <SwiperSlide className={classes.Slides}>
                <ProductCard
                  id={prod._id}
                  img={prod.image}
                  title={prod.name}
                  price={prod.price}
                  category={prod.category}
                  description={prod.description}
                  rating={prod.rating}
                  brand={prod.brand}
                  numReviews={prod.numReviews}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TopProductsSlider;
