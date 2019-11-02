import {h, app} from "hyperapp";
import {withFx, http, action, event, debounce} from "hyperapp-fx";

import { NextLoader } from './NextLoader.js';
import { SearchBox } from './SearchBox.js';
import { RadioList } from './RadioList.js';
import { ImageBox } from './ImageBox.js';
import { TagBox } from './TagBox.js';

const api = "https://server.image.rugamaga.dev/";
const images_endpoint = "https://server.image.rugamaga.dev/images";
const thumbnails_endpoint = "https://server.image.rugamaga.dev/thumbnails";

const state = {
  images: [],
  suggest_tags: [],
  order: "new",
  tag: "",
  adult: "nonadult",
  image_loading: false
};

const actions = {
  init: () => [
    action("requestImages"),
    action("requestSuggestTags"),
  ],
  setImageLoading: (image_loading) => ({ image_loading }),
  requestImages: () => (state) => [
    action("setImageLoading", true),
    http(
      `${api}images/?tag=${state.tag}&order=${state.order}&adult=${state.adult}&offset=${state.images.length}`,
      'imagesFetched'
    )
  ],
  requestSuggestTags: () => (state) => [
    action("setSuggestTags", []),
    http(
      `${api}tags/?prefix=${state.tag.split(/\s+/).slice(-1)[0]}`,
      'suggestTagsFetched'
    )
  ],
  setImages: images => ({ images }),
  appendImages: images => (state) => ({ images: state.images.concat(images) }),
  setSuggestTags: suggest_tags => ({ suggest_tags }),
  imagesFetched: (images) => [
    action("setImageLoading", false),
    action("appendImages", images),
  ],
  suggestTagsFetched: (suggest_tags) => action("setSuggestTags", suggest_tags),
  setOrder: (order) => ({ order }),
  setAdult: (adult) => ({ adult }),
  setTag: (tag) => ({ tag }),
  appendTag: (tag) => (state) => ({ tag: state.tag.split(/\s+/).filter(item => item.trim()).concat([tag]).join(' ') }),
  handleOrderRadio: ({ target: { value: order } }) => [
    action("setOrder", order),
    action("setImages", []),
    action("requestImages"),
  ],
  handleAdultRadio: ({ target: { value: adult } }) => [
    action("setAdult", adult),
    action("setImages", []),
    action("requestImages"),
  ],
  handleTagText: ({ target: { value: tag } }) => [
    action("setTag", tag),
    action("setImages", []),
    debounce(100, "requestSuggestTags"),
    debounce(500, "requestImages"),
  ],
  handleTagLink: ({ target: { name: tag } }) => [
    action("appendTag", tag),
    action("setImages", []),
    debounce(500, "requestImages"),
  ],
  handleNextLink: () => [
    debounce(500, "requestImages"),
  ],
};

const view = (state, actions) => {
  const imgs = state.images.map( (image) => <ImageBox src={`${thumbnails_endpoint}/${image.name}`} link={`${images_endpoint}/${image.name}`} tags={image.tags} /> );
  const suggest_tags = <TagBox tags={state.suggest_tags} />;
  return (
    <div class="container">
      <h1>imager</h1>
      <div class="search">
        <SearchBox value={state.tag} oninput={event("handleTagText")} />
        <RadioList group="order" names={['new', 'old', 'random']} active={state.order} onclick={event("handleOrderRadio")} />
        <RadioList group="adult" names={['nonadult', 'adult', 'nontags', 'all']} active={state.adult} onclick={event("handleAdultRadio")} />
        { suggest_tags }
      </div>
      <div class="result">
        { imgs }
        <NextLoader image_loading={state.image_loading} />
      </div>
    </div>
  );
}

export const main = withFx(app)(state, actions, view, document.body).init()
