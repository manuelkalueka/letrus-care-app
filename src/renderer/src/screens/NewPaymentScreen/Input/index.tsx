interface InputProps {
  labelInput: string
  idInput: string
  rest: object
}
export const Input: React.FC<InputProps> = ({ labelInput, idInput, ...rest }) => (
  <div>
    <label htmlFor={idInput} className="text-zinc-300">
      {labelInput}
    </label>
    <input
      id={idInput}
      {...rest}
      className="w-full h-12 p-3 bg-zinc-950 rounded-md border-gray-700 text-gray-100"
    />
  </div>
)
