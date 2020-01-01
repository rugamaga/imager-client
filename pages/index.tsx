import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import '../styles/main.scss'

import fetch from 'isomorphic-unfetch'

import { NextLoader } from '../components/NextLoader';
import { SearchBox } from '../components/SearchBox';
import { RadioList } from '../components/RadioList';
import { ImageBox } from '../components/ImageBox';
import { TagBox } from '../components/TagBox';

function useDebounce(fn: () => any, ms: number = 0, args: any[] = []) {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      clearTimeout(handle);
    };
  }, args);
};

const api = "/api";
const images_endpoint = "/api/images";
const thumbnails_endpoint = "/api/thumbnails";

const Index = () => {
  const [state, setState] = useState({
    images: [],
    suggest_tags: [],
    order: "new",
    tag: "",
    adult: "nonadult",
    image_loading: false
  });

  const handleTagText =  ({ target: { value: tag } }) =>
    setState({...state, tag: tag})
  const handleOrderRadio = ({ target: { value: order } }) =>
    setState({...state, order: order})
  const handleAdultRadio = ({ target: { value: adult } }) =>
    setState({...state, adult: adult})
  const handleTagLink = ({ target: { value: tag } }) =>
    setState({
      ...state,
      tag:
        state
          .tag
          .split(/\s+/)
          .filter(item => item.trim())
          .concat([tag])
          .join(' ')
    })
  const handleNextLink = () => {}

  const requestSuggestTags = async () => {
    const url = `${api}/tags?prefix=${state.tag.split(/\s+/).slice(-1)[0]}`
    const res = await fetch(url, {credentials: "same-origin"})
    const tags = await res.json()
    setState({
      ...state,
      suggest_tags: state.images.concat(tags),
      image_loading: false,
    })
  }
  const requestImages = async () => {
    setState({
      ...state,
      image_loading: true,
    })
    const url = `${api}/images?tag=${state.tag}&order=${state.order}&adult=${state.adult}&offset=${state.images.length}`
    const res = await fetch(url, {credentials: "same-origin"})
    const images = await res.json()
    setState({
      ...state,
      images: state.images.concat(images),
      image_loading: false,
    })
  }

  useDebounce(
    requestSuggestTags,
    100,
    [state.tag, state.order, state.adult]
  )

  useDebounce(
    requestImages,
    400,
    [state.tag, state.order, state.adult]
  )

  const imgs = state.images.map( image =>
    <ImageBox
      src={`${thumbnails_endpoint}/${image.name}`}
      link={`${images_endpoint}/${image.name}`}
      tags={image.tags}
      onSelectTag={handleTagLink}
    />
  )
  const suggest_tags =
    <TagBox
      tags={state.suggest_tags}
      onSelectTag={handleTagLink}
    />;

  const OrderList = () =>
    <RadioList
      group="order"
      names={['new', 'old', 'random']}
      active={state.order}
      onChange={handleOrderRadio}
    />

  const AdultList = () =>
    <RadioList
      group="adult"
      names={['nonadult', 'adult', 'nontags', 'all']}
      active={state.adult}
      onChange={handleAdultRadio}
    />

  return (
    <div className="container">
      <h1>imager</h1>
      <div className="search">
        <SearchBox value={state.tag} onChange={handleTagText} />
        <OrderList />
        <AdultList />
        { suggest_tags }
      </div>
      <div className="result">
        { imgs }
        <NextLoader image_loading={state.image_loading} onClick={handleNextLink} />
      </div>
    </div>
  );
}

export default Index
