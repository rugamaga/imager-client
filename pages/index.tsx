import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const tag = (router.query.tag || "") as String
  const order = router.query.order || "new"
  const adult = router.query.adult || "nonadult"

  const [images, setImages] = useState([])
  const [suggest, setSuggest] = useState([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  const replaceQuery = (query) => {
    router.replace({
      pathname: '/',
      query: {
        ...router.query,
        ...query,
      }
    })
  }
  const handleTagText =  ({ target: { value: value } }) => {
    setImages([])
    setOffset(0)
    replaceQuery({tag: value})
  }
  const handleOrderRadio = ({ target: { value: value } }) => {
    setImages([])
    setOffset(0)
    replaceQuery({order: value})
  }
  const handleAdultRadio = ({ target: { value: value } }) => {
    setImages([])
    setOffset(0)
    replaceQuery({adult: value})
  }
  const handleTagLink = (value) => {
    setImages([])
    setOffset(0)
    replaceQuery({
      tag: tag
        .split(/\s+/)
        .filter(item => item.trim())
        .concat([value])
        .join(' ')
    })
  }
  const handleNextLink = () => {
    setOffset(images.length)
  }

  const requestSuggest = async () => {
    const url = `${api}/tags?prefix=${tag.split(/\s+/).slice(-1)[0]}`
    const res = await fetch(url, {credentials: "same-origin"})
    const tags = await res.json()
    setSuggest(tags)
    setLoading(false)
  }

  const requestImages = async () => {
    setLoading(true)
    const url = `${api}/images?tag=${tag}&order=${order}&adult=${adult}&offset=${offset}`
    const res = await fetch(url, {credentials: "same-origin"})
    const results = await res.json()
    setImages(images.concat(results))
    setLoading(false)
  }

  useDebounce(
    requestSuggest,
    100,
    [tag, order, adult]
  )

  useDebounce(
    requestImages,
    400,
    [tag, order, adult, offset]
  )

  const imgs = images.map( image =>
    <ImageBox
      key={image.name}
      src={`${thumbnails_endpoint}/${image.name}`}
      link={`${images_endpoint}/${image.name}`}
      tags={image.tags}
      onSelectTag={handleTagLink}
    />
  )
  const tag_box =
    <TagBox
      tags={suggest}
      onSelectTag={handleTagLink}
    />;

  const OrderList = () =>
    <RadioList
      group="order"
      names={['new', 'old', 'random']}
      active={order}
      onChange={handleOrderRadio}
    />

  const AdultList = () =>
    <RadioList
      group="adult"
      names={['nonadult', 'adult', 'nontags', 'all']}
      active={adult}
      onChange={handleAdultRadio}
    />

  return (
    <div className="container">
      <h1>imager</h1>
      <div className="search">
        <SearchBox value={tag} onChange={handleTagText} />
        <OrderList />
        <AdultList />
        { tag_box }
      </div>
      <div className="result">
        { imgs }
        <NextLoader loading={loading} onClick={handleNextLink} />
      </div>
    </div>
  );
}

export default Index
