import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handlDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          name="name"
          placeholder="Введите текст"
          type="text"
          required
          className="form__input form__input_type_name"
          minLength={2}
          maxLength={40}
          onChange={handleNameChange}
          value={name}
        />
        <span className="form__input-error" id="name-input-error" />
        <input
          name="about"
          placeholder="Введите текст"
          type="text"
          required
          className="form__input form__input_type_job"
          minLength={2}
          maxLength={200}
          onChange={handlDescriptionChange}
          value={description}
        />
        <span className="form__input-error" id="job-input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
