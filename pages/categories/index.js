import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@mui/material/Button'
import styles from '../../styles/Home.module.css'

import {useStyles } from './styles';

// import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from './schema'
// import { withApollo } from '../../lib/apollo/client'

// import { apolloClient } from "../../lib/apollo/config";
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: "https://b2cdemo.getswift.asia/graphql",
  cache: new InMemoryCache()
});

const Categories = () => {
  const classes = useStyles();
  // const { loading, error, data } = useQuery(GET_CATEGORIES);

  // if (error || loading) return <></>;

  const [items, setItems] = useState([])

  useEffect(() => {
    apolloClient
            .query({
              query: GET_CATEGORIES
            })
            .then(result => setItems(result.data.mainCategories.items))
            // .then(result => items = result.data.mainCategories.items)
  }, [])

  // const { mainCategories } = data;
  // const { items } = mainCategories;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
            {items.map((item, index) => {
                return (
                    <a href="https://nextjs.org/docs" className={styles.card} key={index}>
                        <h2>{item.name} &rarr;</h2>
                        <p>{item.description}</p>

                    <Link href={`categories/${item.id}`}>
                      <a>
                        <Button classes={{ root: classes.root }} variant="contained" fullWidth>Lihat Detail</Button>
                      </a>
                    </Link>
                    </a>
                );
            })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Categories;
// export default withApollo({ ssr: true })(Categories)