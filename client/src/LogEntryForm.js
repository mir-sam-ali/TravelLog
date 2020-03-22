import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addEntry } from "./API";

const LogEntryForm = ({ coordinates, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      data.latitude = coordinates.latitude;
      data.longitude = coordinates.longitude;
      //console.log(data);
      const created = await addEntry(data);
      onClose();
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error ? (
        <h3
          style={{
            color: "#fc4903"
          }}
        >
          {error.message}
        </h3>
      ) : null}
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Title"
          name="title"
          ref={register}
          required
        ></input>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          name="description"
          rows="3"
          ref={register}
          placeholder="Description"
        ></textarea>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Comments"
          name="comments"
          ref={register}
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Image"
          ref={register}
          name="image"
        ></input>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="visitDate">
          Visit Date:
        </label>
        <div className="col-sm-8">
          <input
            name="visitDate"
            className="form-control"
            type="date"
            ref={register}
            required
          ></input>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-8 col-form-label" htmlFor="rating">
          Rating (1 to 5):
        </label>
        <div className="col-sm-4">
          <input
            className="form-control"
            type="number"
            ref={register}
            name="rating"
            min="1"
            max="5"
          ></input>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

export default LogEntryForm;
