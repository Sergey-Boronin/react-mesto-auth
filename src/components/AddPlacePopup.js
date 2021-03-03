import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          name="place"
          placeholder="Название"
          type="text"
          className="form__input form__input_type_place"
          minLength={2}
          maxLength={30}
          autoComplete="off"
          required
          onChange={handleNameChange}
          value={name}
        />
        <span className="form__input-error" id="place-input-error" />
        <input
          name="url"
          placeholder="Ссылка на картинку"
          type="url"
          className="form__input form__input_type_url"
          autoComplete="off"
          required
          onChange={handleLinkChange}
          value={link}

        />
        <span className="form__input-error" id="url-input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
