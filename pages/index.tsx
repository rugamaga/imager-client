import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import fetch from 'unfetch'

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

const api = "https://image.rugamaga.dev";
const images_endpoint = "https://image.rugamaga.dev/images";
const thumbnails_endpoint = "https://image.rugamaga.dev/thumbnails";

export default () => {
  const [state, setState] = useState({
    images: [],
    suggest_tags: [],
    order: "new",
    tag: "",
    adult: "nonadult",
    image_loading: false
  });

  const handleTagText =  ({ target: { value: tag } }) =>
    setState({tag: tag, ...state})
  const handleOrderRadio = ({ target: { value: order } }) =>
    setState({order: order, ...state})
  const handleAdultRadio = ({ target: { value: adult } }) =>
    setState({adult: adult, ...state})
  const handleTagLink = ({ target: { value: tag } }) =>
    setState({
      tag:
        state
          .tag
          .split(/\s+/)
          .filter(item => item.trim())
          .concat([tag])
          .join(' '),
      ...state
    })
  const handleNextLink = () => {}

  const requestSuggestTags = async () => {
    const url = `${api}/tags/?prefix=${state.tag.split(/\s+/).slice(-1)[0]}`
    const res = await fetch(url)
    const { images } = await res.json()
    setState({
      images: state.images.concat(images),
      image_loading: false,
      ...state
    })
  }
  const requestImages = async () => {
    setState({
      image_loading: true,
      ...state
    })
    const url = `${api}/images/?tag=${state.tag}&order=${state.order}&adult=${state.adult}&offset=${state.images.length}`
    const res = await fetch(url)
    const { images } = await res.json()
    setState({
      images: state.images.concat(images),
      image_loading: false,
      ...state
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
      onClick={handleOrderRadio}
    />

  const AdultList = () =>
    <RadioList
      group="adult"
      names={['nonadult', 'adult', 'nontags', 'all']}
      active={state.adult}
      onClick={handleAdultRadio}
    />

  return (
    <div className="container">
      <h1>imager</h1>
      <div className="search">
        <SearchBox value={state.tag} onInput={handleTagText} />
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
