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

import classes from './SidebarProductCard.module.scss';
import ProductCard from '../../ProducsList/ProductCard/ProductCard';
import { getTopProducts } from '../../../../Store/Actions/ProductsActions/ProductActions';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const TopProductsSlider = () => {
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.product.topProducts.products
  );

  useEffect(() => {
    dispatch(getTopProducts(12));
  }, [dispatch]);
  return (
    <div className={classes.SliderContainer}>
      {products && (
        <Swiper
          freeMode={true}
          spaceBetween={10}
          slidesPerView={1}
          height={30}
          loop
          // navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          // pagination={{ clickable: true, dynamicBullets: true }}
        >
          {products.map((prod) => (
            <SwiperSlide className={classes.Slides}>
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
      )}
    </div>
  );
};

export default TopProductsSlider;
