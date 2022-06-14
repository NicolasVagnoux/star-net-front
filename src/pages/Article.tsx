import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IArticle from '../interfaces/IArticle';

const Article = () => {
  // const [article, setArticle] = useState({});
  // const getArticle = () => {
  // axios
  // .get(`https://localhost:3000/api/articles/${id}`)
  // .then((res) => res.data)
  // .then((data) => setArticle(data))
  // .catch((err) => console.log(err));
  // };
  //
  // useEffect(() => {
  // getArticle();
  // }, []);

  return (
    <article className="article">
      <div className="article__button">
        <button className="article__button__btn" type="submit"></button>
      </div>
      <div className="article__title">
        <h1 className="article__title__h1">Introduction à la Blockchain</h1>
      </div>
      <div className="article__desc">
        <h2 className="article__desc__h2">Par remi, le 22/05/2022</h2>
      </div>
      <div className="article__tag">
        <h3 className="article__tag__h3">Tags</h3>
      </div>
      <div className="article__image">
        <img
          className="article__image__img"
          src="https://images.bfmtv.com/LM1M4sRogoV_6p3Tql7AwskEQK8=/96x4:1504x796/1408x0/images/Le-marche-des-cryptomonnaies-atteint-2000-milliards-de-dollars-1006205.jpg"
          alt="articleimg"
        />
      </div>
      <div className="article__text">
        <p className="article__text__content">
          Une cryptomonnaie repose sur une blockchain, un registre distribué (ou grand
          livre de comptes), consultable par tous, qui répertorie l'ensemble des actions
          du réseau depuis l'origine. Les informations à ajouter sont appelées
          transactions, et sont groupées dans des blocs4. Une transaction peut par exemple
          être un transfert de cryptomonnaie d'une personne à une autre. Les acteurs du
          réseau, appelés nœuds, possèdent, stockent et vérifient leurs propres versions
          de la chaine, depuis le tout premier bloc (appelé bloc genèse). Une blockchain
          est considérée comme valide lorsqu’il est possible de la vérifier totalement en
          partant du bloc genèse. Comme il n'y a pas d'autorité centrale ou de tiers de
          confiance, le système est dit décentralisé. Pour garantir l'immuabilité de la
          chaine, c'est-à-dire qu'il n'y a pas eu de modification dans un ancien bloc,
          ceux-ci sont chainés entre eux par des fonctions cryptographiques de hachage.
          Chaque nœud étant en réalité un ordinateur connecté au réseau par internet, le
          système n'opère pas en temps réel car il peut y avoir des temps de latence
          importants lors de l'envoi ou la réception de transactions et blocs à travers le
          réseau. Dans le cas où différentes versions d'une même chaine existent, la règle
          est de choisir la chaine valide la plus longue.
        </p>
      </div>
    </article>
  );
};

export default Article;
