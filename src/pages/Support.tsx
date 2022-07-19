import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import FaqQuestion from '../components/FaqQuestion';
import Navbar from '../components/Navbar';
import ReturnButton from '../components/ReturnButton';
import IFaq from '../interfaces/IFaq';

const Support = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [faqList, setFaqList] = useState<IFaq[]>([]);

  const notifySuccess = () =>
    toast.info(
      "Votre message a été envoyé avec succès ! L'équipe *Net vous recontactera au plus vite !",
      {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      },
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    notifySuccess();
  };

  useEffect(() => {
    const getFaqList = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}api/faq`);
      setFaqList(data);
    };
    getFaqList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="support">
        <div className="support__return">
          <ReturnButton />
        </div>
        <h1 className="support__title">Contactez l&apos;équipe *Net</h1>
        <div className="support__content">
          <form
            className="support__content__contactForm"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleSubmit(e);
            }}
          >
            <h2 className="support__content__contactForm__title">
              Pour toute demande après de l&apos;équipe *Net, merci de remplir ce
              formulaire :
            </h2>
            <div className="support__content__contactForm__name">
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Entrez votre nom"
                required
              />
            </div>
            <div className="support__content__contactForm__email">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Entrez votre adresse email"
                required
              />
            </div>
            <div className="support__content__contactForm__subject">
              <label htmlFor="subject">Sujet du message :</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                placeholder="Entrez le sujet de votre message"
                required
              />
            </div>
            <div className="support__content__contactForm__message">
              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Entrez votre message"
                required
                rows={6}
              />
            </div>
            <input
              className="support__content__contactForm__submit"
              type="submit"
              value="Envoyer le message"
            />
          </form>
          <div className="support__content__faq">
            <h2 className="support__content__faq__title">Questions fréquentes :</h2>
            <ul className="support__content__faq__list">
              {faqList &&
                faqList.map((faqQuestion) => (
                  <FaqQuestion key={faqQuestion.id} {...faqQuestion} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
