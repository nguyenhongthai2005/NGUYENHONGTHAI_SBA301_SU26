import Carousel from 'react-bootstrap/Carousel'

import banners from '../data/listBanner'

function Banner() {

    return (

        <Carousel className="mb-5">

            {
                banners.map((banner) => (

                    <Carousel.Item
                        key={banner.id}
                        interval={2000}
                    >

                        <img
                            className="d-block w-100"
                            src={banner.image}
                            alt={banner.title}
                            style={{
                                height: "500px",
                                objectFit: "cover"
                            }}
                        />

                        <Carousel.Caption>

                            <h3>
                                {banner.title}
                            </h3>

                            <p>
                                {banner.description}
                            </p>

                        </Carousel.Caption>

                    </Carousel.Item>

                ))
            }

        </Carousel>

    )
}

export default Banner
