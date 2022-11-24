export const getSettings = (isLargeRow) => {
  return {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargeRow ? 6 : 4,
    slidesToScroll: isLargeRow ? 5 : 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: isLargeRow ? 6 : 3,
          slidesToScroll: isLargeRow ? 4 : 2,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: isLargeRow ? 5 : 3,
          slidesToScroll: isLargeRow ? 3 : 2,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: isLargeRow ? 5 : 2,
          slidesToScroll: isLargeRow ? 3 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: isLargeRow ? 4 : 2,
          slidesToScroll: isLargeRow ? 2 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: isLargeRow ? 3 : 1,
          slidesToScroll: isLargeRow ? 1 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: isLargeRow ? 2 : 1,
          slidesToScroll: isLargeRow ? 1 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: isLargeRow ? 1 : 1,
          slidesToScroll: isLargeRow ? 1 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
    ],
  };
};
