import * as React from 'react';
import Swiper from 'react-id-swiper';
import { Typography, Button, Icon } from 'antd';

import MovieCard from '../movie_card';
import 'react-id-swiper/src/styles/css/swiper.css';
import './index.less';

const { Title } = Typography;
const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};
const swiper: any = null;


export interface MovieSwiperProps {
    movies: any[],
    genres: any[],
    title:string
};

class MovieSwiper extends React.Component<MovieSwiperProps> {

    swiper=swiper;

    parseMovie = (movies: any, n:number=3): any => {
        const mv = movies.slice(0, Math.floor(movies.length / n) * n);
        return mv.reduce((total: any[], currentValue: any, currentIndex: number, arr: any[]) => {
            if (!total[Math.floor(currentIndex / n)]) { total.push([]); }
            total[Math.floor(currentIndex / n)].push(currentValue);
            return total;
        }, []);
    }

    getSwiperInstance = (instance: any) => {
        this.swiper = instance;
    }

    onNextSlide = () => {
        if (this.swiper) {
            this.swiper.slideNext();
        }
    }

    onPrevSlide = () => {
        if (this.swiper) {
            this.swiper.slidePrev();
        }
    }

    componentDidUpdate(){
        this.onFirstSlide();
    }

    onFirstSlide=()=>{
        if (this.swiper) {
            this.swiper.slideTo(0);
        }
    }

    render() {
        return (
            
            <div className="movie-swiper">
                <Title className="movie-swiper-title" level={3}>
                    {this.props.title}
                    {
                        this.props.movies.length!==0 &&
                        <Button.Group>
                            <Button onClick={this.onPrevSlide} type="default">
                                <Icon type="left" />Backward
                            </Button>
                            <Button onClick={this.onNextSlide} type="default">
                                Forward<Icon type="right" />
                            </Button>
                        </Button.Group>
                    }
                </Title>
                {this.props.movies.length===0 && <p>No data found</p>}
                <Swiper getSwiper={this.getSwiperInstance} {...params}>
                    {this.parseMovie(this.props.movies, 4).map((movieArray: any, key: number) =>
                        <div key={key}>
                            {movieArray.map((movie: any) => (
                                <MovieCard loading={false} key={movie.id} type={"vertical"} movie={movie} genres={this.props.genres} />
                            ))}
                        </div>
                    )}
                </Swiper>
            </div>
        );
    }

}
export default MovieSwiper;