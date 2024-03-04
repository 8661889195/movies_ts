import { Input } from 'antd';

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({handleChange}: Props) => {
return <Input onChange={handleChange} placeholder="Type to..." />
}
