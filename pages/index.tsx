import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import fetch from 'unfetch'

import { NextLoader } from '../components/NextLoader';
import { SearchBox } from '../components/SearchBox';
// import { RadioList } from './RadioList.js';
// import { ImageBox } from './ImageBox.js';
// import { TagBox } from './TagBox.js';

function useDebounce(fn: () => any, ms: number = 0, args: any[] = []) {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      clearTimeout(handle);
    };
  }, args);
};

const RadioList = ({group, names, active, onclick}) => <div />
const ImageBox = ({src, link, tags}) => <div />
const TagBox = ({tags}) => <div />

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
    setState({
      tag: tag,
      images: [],
      ...state
    })
  const handleOrderRadio = ({ target: { value: order } }) =>
    setState({
      order: order,
      images: [],
      ...state
    })
  const handleAdultRadio = ({ target: { value: adult } }) =>
    setState({
      adult: adult,
      images: [],
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

  const imgs = state.images.map( (image) => <ImageBox src={`${thumbnails_endpoint}/${image.name}`} link={`${images_endpoint}/${image.name}`} tags={image.tags} /> );
  const suggest_tags = <TagBox tags={state.suggest_tags} />;

  const OrderList = () =>
    <RadioList
      group="order"
      names={['new', 'old', 'random']}
      active={state.order}
      onclick={handleOrderRadio}
    />

  const AdultList = () =>
    <RadioList
      group="adult"
      names={['nonadult', 'adult', 'nontags', 'all']}
      active={state.adult}
      onclick={handleAdultRadio}
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
