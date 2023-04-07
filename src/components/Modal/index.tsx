import React, { useState, FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import useFetch from '../../hooks/fetch';
import noImage from '../../assets/No_Image_Available.jpg';
import { IModal } from 'interfaces/modal';
import { IModalCard, IGenre } from 'interfaces/modalCard';

import './modal.scss';

const Modal: FC<IModal> = ({ onClose, showModal, activeCardId }) => {
  const [activeCard, setActiveCard] = useState<IModalCard>();

  const { request, error, isLoading } = useFetch();

  useEffect(() => {
    if (activeCardId) {
      getCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardId]);

  const getCard = async (): Promise<void> => {
    const card: IModalCard = await request(
      `https://api.themoviedb.org/3/movie/${activeCardId}?api_key=44a088ecb314cffa890360d57d5748b9`
    );
    setActiveCard(card);
  };

  return createPortal(
    <>
      {showModal && (
        <div className={`modal${showModal ? ' show' : ''}`} onClick={onClose}>
          <div className="modal__content" data-testid="modal" onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-x" onClick={onClose} data-testid="close"></i>
            {isLoading && <div className="home__loading"></div>}
            {activeCard && (
              <div className="modal__text">
                <div className="modal__image">
                  <img
                    src={
                      activeCard.poster_path
                        ? `https://image.tmdb.org/t/p/w300/${activeCard.poster_path}`
                        : noImage
                    }
                    alt=""
                    className="modal__img"
                  />
                </div>
                <div className="modal__desc">
                  <h3 className="modal__title">
                    <i className="bold">{activeCard.title}</i> (
                    {activeCard.release_date.slice(0, 4)})
                  </h3>
                  <div className="modal__genre">
                    {activeCard.genres.map((item: IGenre) => item.name).join(', ')}
                  </div>
                  <div className="modal__time">
                    Duration:{' '}
                    {activeCard.runtime
                      ? `${Math.floor(activeCard.runtime / 60)}h ${activeCard.runtime % 60}m`
                      : '-'}
                  </div>
                  <div className="modal__overview">
                    <p className="overview__title">Overview</p>
                    <p>{activeCard.overview}</p>
                  </div>
                </div>
              </div>
            )}
            {error && <div className="home__error">{error}</div>}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;
