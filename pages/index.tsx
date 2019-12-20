import React, { useState } from 'react'
import Head from 'next/head'

// import { NextLoader } from './NextLoader.js';
// import { SearchBox } from './SearchBox.js';
// import { RadioList } from './RadioList.js';
// import { ImageBox } from './ImageBox.js';
// import { TagBox } from './TagBox.js';

const NextLoader = ({image_loading}) => <div />
const SearchBox = ({value, oninput}) => <div />
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

  // TODO: use some hook to handling events.
  const event = (type) => {} ;

  const imgs = state.images.map( (image) => <ImageBox src={`${thumbnails_endpoint}/${image.name}`} link={`${images_endpoint}/${image.name}`} tags={image.tags} /> );
  const suggest_tags = <TagBox tags={state.suggest_tags} />;

  return (
    <div className="container">
      <h1>imager</h1>
      <div className="search">
        <SearchBox value={state.tag} oninput={event("handleTagText")} />
        <RadioList group="order" names={['new', 'old', 'random']} active={state.order} onclick={event("handleOrderRadio")} />
        <RadioList group="adult" names={['nonadult', 'adult', 'nontags', 'all']} active={state.adult} onclick={event("handleAdultRadio")} />
        { suggest_tags }
      </div>
      <div className="result">
        { imgs }
        <NextLoader image_loading={state.image_loading} />
      </div>
    </div>
  );
}
