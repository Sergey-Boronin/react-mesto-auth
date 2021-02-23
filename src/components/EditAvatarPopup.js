import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(0);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="url"
        type="url"
        className="popup__input popup__input_type_url"
        required
        placeholder="Введите адрес картинки"
        ref={avatarRef}
      />
      <span className="popup__input-error" id="url-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
