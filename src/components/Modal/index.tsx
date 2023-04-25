import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import noImage from '../../assets/No_Image_Available.jpg';
import { IGenre } from '../../interfaces/modalCard';
import { IModal } from '../../interfaces/modal';
import { fetchCardById } from '../Home/homeSlice';

import './modal.scss';

const Modal: FC<IModal> = ({ onClose, showModal, activeCardId }) => {
  const { cardLoadingStatus, card } = useAppSelector((state) => state.home);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeCardId) {
      dispatch(fetchCardById(activeCardId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardId]);

  return (
    <>
      {showModal && (
        <div className={`modal${showModal ? ' show' : ''}`} onClick={onClose}>
          <div className="modal__content" data-testid="modal" onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-x" onClick={onClose} data-testid="close"></i>
            {cardLoadingStatus === 'loading' && <div className="home__loading"></div>}
            {card && (
              <div className="modal__text">
                <div className="modal__image">
                  <img
                    src={
                      card.poster_path
                        ? `https://image.tmdb.org/t/p/w300/${card.poster_path}`
                        : noImage
                    }
                    alt={card.poster_path ? card.title : 'noImage'}
                    className="modal__img"
                  />
                </div>
                <div className="modal__desc">
                  <h3 className="modal__title">
                    <i className="bold">{card.title}</i> ({card.release_date.slice(0, 4)})
                  </h3>
                  <div className="modal__genre">
                    {card.genres.map((item: IGenre) => item.name).join(', ')}
                  </div>
                  <div className="modal__time">
                    Duration:{' '}
                    {card.runtime ? `${Math.floor(card.runtime / 60)}h ${card.runtime % 60}m` : '-'}
                  </div>
                  <div className="modal__overview">
                    <p className="overview__title">Overview</p>
                    <p>{card.overview}</p>
                  </div>
                </div>
              </div>
            )}
            {cardLoadingStatus === 'error' && <div className="home__error">Failed to fetch</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
