import React, {useState} from "react";
import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'

function CreateCharacterForm({ onClose, showModal }) {
  const { showFeedback } = useContext()

  function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

      return JSON.parse(jsonPayload);
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      const form = event.target
      const name = form.name.value;
      const clase = form.sel1.value;
      const win_streak = "0";
      const max_win_streak = "0";
      const userId = parseJwt(sessionStorage.token).sub
      try{
        logic.createCharacter(name, clase, win_streak, max_win_streak, userId)
          .then(() => {
            form.reset();
        })
        .catch(error => showFeedback(error, 'error'))
      }catch(error){
        showFeedback(error);
      }
    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content2">
              <div className="modal-header">
                <h5 className="modal-title" id="forgotPasswordModalLabel">Character creation</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Character name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" required />
                  </div>
                  <div className="mb-3">
                    <div className="form-group">
                    <label htmlFor="class" className="form-label">Select a class</label>
                    <select className="form-control" id="sel1" name="sel1">
                      <option value={"warrior"}>Warrior</option>
                      <option value={"mague"}>Mague</option>
                      <option value={"assassin"}>Assassin</option>
                    </select>
                   </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CreateCharacterForm;