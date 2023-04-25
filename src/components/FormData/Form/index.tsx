import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hook';
import { IFormData } from '../../../interfaces/formData';
import InputText from './InputText';
import InputDate from './InputDate';
import Select from './Select';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';
import InputFile from './InputFile';
import { addCard, clearAllFields } from '../formSlice';

const Form: FC = () => {
  const { title, date, color, size, gift } = useAppSelector((state) => state.form);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const defaultFormValues: IFormData = {
    title: title,
    date: date,
    color: color,
    size: size,
    gift: gift,
    image: undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<IFormData>({ reValidateMode: 'onSubmit', defaultValues: defaultFormValues });

  const onSubmit = (data: IFormData): void => {
    setFormIsValid(true);
    setTimeout(() => setFormIsValid(false), 5000);
    if (data.image) {
      const newCard = {
        title: data.title,
        date: data.date,
        color: data.color,
        size: data.size,
        gift: data.gift.join(' '),
        image: URL.createObjectURL(data.image[0]),
      };
      dispatch(addCard(newCard));
    }
    setValue('image', undefined);
    reset({ title: '', date: '', color: '', size: '', gift: [] });
    dispatch(clearAllFields());
  };

  return (
    <div className="form">
      <form className="form__content" data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <InputText register={register} errors={errors} />
        <InputDate register={register} errors={errors} />
        <Select register={register} errors={errors} />
        <InputRadio register={register} errors={errors} getValues={getValues} />
        <InputCheckbox register={register} errors={errors} getValues={getValues} />
        <InputFile register={register} errors={errors} />
        <button type="submit" className="form__button">
          Submit
        </button>
        {formIsValid && (
          <div className="success">
            <i className="fa-solid fa-exclamation"></i>Сard has been added
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
