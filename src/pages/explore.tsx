import SideNav from '@/cmps/SideNav'
import Head from 'next/head'

import styles from '../styles/pages/_explore.module.scss'

import { CiSearch } from 'react-icons/ci'
import MovieList from '@/cmps/MovieList'
import { useState } from 'react'

export default function Explore() {
  const [movies, setMovies] = useState<any>()

  const loadMovies = async () => {
    const movies = await import('../data/top-rated.json')
    console.log(movies)
    setMovies(movies.results)
  }

  loadMovies()

  return (
    <>
      <Head>
        <title>explore</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.explore}>
        <SideNav />

        <div className={styles.container}>
          {/* INPUT */}
          <div className={styles['search-container']}>
            <div>
              <span>
                <CiSearch />
              </span>
              <input type="text" placeholder="Movies, shows and more" />
            </div>
          </div>

          {/* LIST */}
          <p className={styles.title}>Popular Searches</p>
          <MovieList movies={movies} />
        </div>
      </main>
    </>
  )
}
