import React, { useState } from "react";
import "./AddHotelSection.css";

const COUNTRY_OPTIONS = [
  { value: "", label: "Выберите страну" },
  { value: "Japan", label: "Japan" },
  { value: "Italy", label: "Italy" },
  { value: "France", label: "France" },
];

const initialState = {
  name: "",
  rating: "",
  description: "",
  fullDescription: "",
  location: "",
  price: "",
  mapUrl: "",
  country: "",
  images: "",
};

interface AddHotelSectionProps {
  onSuccess?: () => void;
}

export default function AddHotelSection({ onSuccess }: AddHotelSectionProps) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError("");
  }

  function validate(data: typeof initialState) {
    const errs: Record<string, string> = {};
    if (!data.name) errs.name = "Название обязательно";
    if (!data.rating || isNaN(+data.rating)) errs.rating = "Рейтинг обязателен";
    if (!data.price || +data.price <= 0) errs.price = "Цена обязательна";
    if (!data.country) errs.country = "Страна обязательна";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(false);
    setServerError("");
    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const dto = {
      name: formData.name,
      rating: +formData.rating,
      description: formData.description,
      fullDescription: formData.fullDescription,
      location: formData.location,
      price: `$${formData.price}`,
      mapUrl: formData.mapUrl,
      country: formData.country,
      images: formData.images
        ? formData.images.split(",").map((x) => x.trim()).filter(Boolean)
        : [],
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setServerError("Вы не авторизованы.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5172/api/HotelData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        let msg = "Ошибка сервера";
        try {
          const json = await res.json();
          msg = json?.message || msg;
        } catch {}
        setServerError(msg);
        return;
      }
      setSuccess(true);
      setFormData(initialState);
      if (onSuccess) onSuccess();
    } catch {
      setServerError("Сетевая или серверная ошибка");
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="add-hotel-title">Добавить отель</h2>
        <form className="add-hotel-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="profile-info-grid">
            <div className="info-item">
              <label className="info-label" htmlFor="name">
                Название
              </label>
              <input
                className="info-value"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInput}
                required
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="rating">
                Рейтинг
              </label>
              <input
                className="info-value"
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInput}
                required
              />
              {errors.rating && <div className="form-error">{errors.rating}</div>}
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="price">
                Цена ($)
              </label>
              <input
                className="info-value"
                id="price"
                name="price"
                type="number"
                min="1"
                step="0.01"
                value={formData.price}
                onChange={handleInput}
                required
                placeholder="Стоимость в долларах"
              />
              {errors.price && <div className="form-error">{errors.price}</div>}
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="country">
                Страна
              </label>
              <select
                className="info-value"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInput}
                required
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.country && <div className="form-error">{errors.country}</div>}
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="location">
                Локация
              </label>
              <input
                className="info-value"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInput}
              />
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="mapUrl">
                Ссылка на карту
              </label>
              <input
                className="info-value"
                id="mapUrl"
                name="mapUrl"
                value={formData.mapUrl}
                onChange={handleInput}
              />
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="description">
                Короткое описание
              </label>
              <textarea
                className="info-value"
                id="description"
                name="description"
                value={formData.description}
                maxLength={120}
                rows={2}
                onChange={handleInput}
              />
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="fullDescription">
                Полное описание
              </label>
              <textarea
                className="info-value"
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                rows={4}
                onChange={handleInput}
              />
            </div>
            <div className="info-item" style={{ gridColumn: "1/3" }}>
              <label className="info-label" htmlFor="images">
                Ссылки на фото <span style={{ opacity: 0.7, fontSize: 12 }}>(через запятую)</span>
              </label>
              <input
                className="info-value"
                id="images"
                name="images"
                value={formData.images}
                onChange={handleInput}
                placeholder="https://img1.jpg, https://img2.jpg"
              />
            </div>
          </div>
          <button className="add-hotel-btn" type="submit">
            Добавить
          </button>
          {success && <div className="form-success">Отель добавлен!</div>}
          {serverError && <div className="form-error">{serverError}</div>}
        </form>
      </div>
    </div>
  );
}