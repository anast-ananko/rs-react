import React, { FC, createRef, RefObject, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { IFormProps, IFormState } from '../../../interfaces/form';
import InputText from './InputText';
import InputDate from './InputDate';
import Select from './Select';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';
import InputFile from './InputFile';
import { validateForm } from '../../../helpers/validationFunctions';
import { ICard } from 'interfaces/card';

const Form: FC<IFormProps> = ({ addCard }) => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data: ICard) => {
    // e.preventDefault();
    console.log(data);
    setFormIsValid(true);
    setTimeout(() => setFormIsValid(false), 5000);
    addCard(data);
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
        <input type="submit" className="form__button" />

        {formIsValid && (
          <>
            <div className="success">
              <i className="fa-solid fa-exclamation"></i>Сard has been added
            </div>
          </>
        )}
      </form>
    </div>
  );
};

// class Form extends Component<IFormProps, IFormState> {
//   formRef: RefObject<HTMLFormElement>;
//   inputRef: RefObject<HTMLInputElement>;
//   dateRef: RefObject<HTMLInputElement>;
//   selectRef: RefObject<HTMLSelectElement>;
//   radioRef_1: RefObject<HTMLInputElement>;
//   radioRef_2: RefObject<HTMLInputElement>;
//   radioRef_3: RefObject<HTMLInputElement>;
//   checkboxRef_1: RefObject<HTMLInputElement>;
//   checkboxRef_2: RefObject<HTMLInputElement>;
//   fileRef: RefObject<HTMLInputElement>;

//   constructor(props: IFormProps) {
//     super(props);

//     this.state = {
//       formIsValid: false,
//       inputError: '',
//       dateError: '',
//       selectError: '',
//       radioError: '',
//       checkboxError: '',
//       fileError: '',
//     };

//     this.formRef = createRef<HTMLFormElement>();
//     this.inputRef = createRef<HTMLInputElement>();
//     this.dateRef = createRef<HTMLInputElement>();
//     this.selectRef = createRef<HTMLSelectElement>();
//     this.radioRef_1 = createRef<HTMLInputElement>();
//     this.radioRef_2 = createRef<HTMLInputElement>();
//     this.radioRef_3 = createRef<HTMLInputElement>();
//     this.checkboxRef_1 = createRef<HTMLInputElement>();
//     this.checkboxRef_2 = createRef<HTMLInputElement>();
//     this.fileRef = createRef<HTMLInputElement>();
//   }

//   clearFields = (): void => {
//     this.formRef.current?.reset();
//   };

//   handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     if (
//       this.inputRef.current !== null &&
//       this.dateRef.current !== null &&
//       this.selectRef.current !== null &&
//       this.radioRef_1.current !== null &&
//       this.radioRef_2.current !== null &&
//       this.radioRef_3.current !== null &&
//       this.checkboxRef_1.current !== null &&
//       this.checkboxRef_2.current !== null &&
//       this.fileRef.current !== null
//     ) {
//       if (
//         validateForm(
//           this.inputRef.current.value,
//           this.dateRef.current.value,
//           this.selectRef.current.value,
//           this.radioRef_1.current.checked,
//           this.radioRef_2.current.checked,
//           this.radioRef_3.current.checked,
//           this.checkboxRef_1.current.checked,
//           this.checkboxRef_2.current.checked,
//           this.fileRef.current.value,
//           this
//         )
//       ) {
//         if (this.fileRef.current.files !== null) {
//           const newCard = {
//             title: this.inputRef.current.value,
//             date: this.dateRef.current.value,
//             color: this.selectRef.current.value,
//             size: this.radioRef_1.current.checked
//               ? this.radioRef_1.current.value
//               : this.radioRef_2.current.checked
//               ? this.radioRef_2.current.value
//               : this.radioRef_3.current.value,
//             checkbox:
//               (this.checkboxRef_1.current.checked ? this.checkboxRef_1.current.value : '') +
//               ' ' +
//               (this.checkboxRef_2.current.checked ? this.checkboxRef_2.current.value : ''),
//             image: URL.createObjectURL(this.fileRef.current.files[0]),
//           };

//           this.props.addCard(newCard);
//           setTimeout(
//             () =>
//               this.setState({
//                 formIsValid: false,
//               }),
//             5000
//           );
//           this.clearFields();
//         }
//       }
//     }
//   };

export default Form;
