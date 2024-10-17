import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/images/banner5.png";
import banner2 from "../../assets/images/banner4.png";
import styles from "./landingcarousal.module.css";

export const LandingCarousal = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 1000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1000,
        },
      },
    ],
  };

  const carousalImages = [
    {
      id: 0,
      imgUrl: banner1,
    },
    {
      id: 1,
      imgUrl: banner2,
    },
  ];

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {carousalImages.map((carousal) => (
          <div key={carousal.id}>
            <div className={styles.carousalImgSection}>
              <img src={carousal.imgUrl} alt="carousal banner" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
