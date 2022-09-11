function ImagePopup(props) {
  return (
    <div className={`popup popup-preview ${props.card && " popup_opened"}`}>
      <div className="popup-preview__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        />
        <figure className="popup-preview__photo-figure">
          <img className="popup-preview__image" src={props.card?.link} alt={props.card?.name}/>
          <figcaption className="popup-preview__photo-caption">
            {props.card?.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
