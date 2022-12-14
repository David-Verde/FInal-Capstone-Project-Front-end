import PropTypes from 'prop-types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './image-slider.styles.scss';

export function ImageSlider({ images, placeholder }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.length > 0 ? images.map(({ id, source }) => (
          <img key={id} className="image-slider__img" src={source} alt="" />
        )) : (
          <img className="image-slider__img" src={placeholder} alt="" />
        )}
      </Slider>
    </div>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    source: PropTypes.string.isRequired,
  })).isRequired,
  placeholder: PropTypes.string.isRequired,
};
