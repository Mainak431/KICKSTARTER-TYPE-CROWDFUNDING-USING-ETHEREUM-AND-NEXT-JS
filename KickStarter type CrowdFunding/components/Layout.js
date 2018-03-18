import React from 'react';
import Header from './Header';
import Head from 'next/head'
import {Container} from 'semantic-ui-react'

export default props => {
  //as all the pages call layout so we place css link tag in layout file
  return (
    <Container>
      <Head>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      </Head>
      <Header />
        {props.children}
      <Header />

    </Container>
  );
};
