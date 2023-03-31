import SideNav from '@/cmps/SideNav'
import Head from 'next/head'

import styles from '../styles/pages/_home.module.scss'
import { useEffect, useState } from 'react'
import MySwiper from '@/cmps/MySwiper'
import Movie from '@/interfaces/movie'
import MovieDetails from '@/cmps/MovieDetails'

type Props = {
  popularMovies: Movie[]
  topRatedMovies: Movie[]
  comingMovies: Movie[]
  tvPopularMovies: Movie[]
}

export default function Home(props: Props) {
  const [movieDetailsToShow, setMovieDetailsToShow] = useState<Movie | null>(
    null
  )

  useEffect(() => {
    ;(async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&language=en-US`
      )

      const json = res.json()
      console.log(json)
    })()
  }, [])

  const { popularMovies, topRatedMovies, comingMovies, tvPopularMovies } = props

  if (!popularMovies) return

  return (
    <>
      <Head>
        <title>Videoplus - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.home}>
        <SideNav pageName="home" />

        <div className={styles.container}>
          <div
            className={styles.div}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularMovies[0]?.backdrop_path})`,
            }}
          ></div>
          <div className={styles['main-movie']}>
            <div>
              <h1>{popularMovies[0]?.title}</h1>
              <span>{popularMovies[0]?.vote_average}</span>
              <p>{popularMovies[0]?.overview}</p>
              <br />
              <button
                onClick={() => {
                  setMovieDetailsToShow(popularMovies[0])
                }}
              >
                Watch Trailer
              </button>
            </div>
          </div>

          <h2 className={styles.category}>Popular</h2>
          <MySwiper
            setMovieDetailsToShow={setMovieDetailsToShow}
            movies={popularMovies}
          />

          <h2 className={styles.category}>Top Rated</h2>
          <MySwiper
            setMovieDetailsToShow={setMovieDetailsToShow}
            movies={topRatedMovies || []}
          />

          <h2 className={styles.category}>Upcoming</h2>
          <MySwiper
            setMovieDetailsToShow={setMovieDetailsToShow}
            movies={comingMovies || []}
          />

          <h2 className={styles.category}>Popular TV Shows</h2>
          <MySwiper
            setMovieDetailsToShow={setMovieDetailsToShow}
            movies={tvPopularMovies}
          />
        </div>

        {movieDetailsToShow && (
          <MovieDetails
            movie={movieDetailsToShow}
            setMovieDetailsToShow={setMovieDetailsToShow}
          ></MovieDetails>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  try {
    // Popular
    const popularMoviesRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&language=en-US&page=1`
    )
    const popularMovies = await popularMoviesRes.json()

    // Top-Rated
    const topRatedMoviesRes = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&language=en-US`
    )
    const topRatedMovies = await topRatedMoviesRes.json()

    // Coming
    const comingMoviesRes = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&language=en-US&page=1`
    )
    const comingMovies = await comingMoviesRes.json()

    // Popular TV
    const tvPopularMoviesRes = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&language=en-US`
    )
    const tvPopularMovies = await tvPopularMoviesRes.json()

    return {
      props: {
        popularMovies: popularMovies.results || null,
        topRatedMovies: topRatedMovies.results || null,
        comingMovies: comingMovies.results || null,
        tvPopularMovies: tvPopularMovies.results || null,
      },
    }
  } catch (err) {
    console.log(err)

    const popularDummy = await import('../data/popular.json')
    const topRatedDummy = await import('../data/top-rated.json')
    const comingDummy = await import('../data/upcoming.json')
    const tvPopularDummy = await import('../data/TV/popular.json')
    return {
      props: {
        popularMovies: popularDummy.results || null,
        topRatedMovies: topRatedDummy.results || null,
        comingMovies: comingDummy.results || null,
        tvPopularMovies: tvPopularDummy.results || null,
      },
    }
  }
}
