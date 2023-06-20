type Props = {
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
};

function InputField(props: Props) {
  return (
    <div>
      <label htmlFor={props.label} className="block mb-2 ">
        {props.label}
      </label>
      <input
        onChange={(e) => {
          props.onValueChange!(e.target.value);
        }}
        type={props.type}
        id={props.label}
        value={props.value}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={props.placeholder}
        required={props.required ? true : false}
      />
    </div>
  );
}

export default InputField;
